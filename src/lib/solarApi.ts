export interface SolarMeta {
  kW?: number;
  bill?: number;
  notes?: string;
  [key: string]: any;
}

export interface SolarJobResponse {
  jobId: string;
  status: 'queued' | 'processing' | 'done' | 'error';
}

export interface SolarJobStatus {
  jobId: string;
  status: 'queued' | 'processing' | 'done' | 'error';
  resultImage?: string; // base64 encoded image
}

// Base URL for solar API
const SOLAR_API_BASE = process.env.NEXT_PUBLIC_SOLAR_API_URL || '/python/solar';

/**
 * Test function to verify Vercel Python functions are working
 * @returns Promise with test response
 */
export async function testPythonFunction(): Promise<any> {
  try {
    console.log('[Test] Calling test Python function at /python/test...');
    const response = await fetch('/python/test', {
      method: 'GET',
    });

    console.log('[Test] Response status:', response.status);
    console.log('[Test] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Test] Error response:', errorText);
      throw new Error(`Test failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('[Test] Success! Response:', data);
    return data;
  } catch (error) {
    console.error('[Test] Exception:', error);
    throw error;
  }
}

/**
 * Compress and resize image before upload
 * @param file - Original image file
 * @param maxWidth - Maximum width in pixels (default: 3000)
 * @param maxHeight - Maximum height in pixels (default: 3000)
 * @param quality - JPEG quality 0-1 (default: 0.85)
 * @returns Promise with compressed File
 */
export async function compressImage(
  file: File,
  maxWidth: number = 3000,
  maxHeight: number = 3000,
  quality: number = 0.85
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        // Create canvas and resize
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Draw resized image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            
            // Create new File with original name
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

const MAX_VERCEL_UPLOAD_BYTES = 4_000_000; // keep well below typical serverless body limits

async function compressImageForVercel(file: File): Promise<File> {
  // Already small enough - keep original to avoid quality loss.
  if (file.size <= MAX_VERCEL_UPLOAD_BYTES) return file;

  // Try progressively smaller dimensions/quality until we're under limit.
  const attempts: Array<{ max: number; quality: number }> = [
    { max: 2000, quality: 0.82 },
    { max: 1600, quality: 0.78 },
    { max: 1400, quality: 0.72 },
    { max: 1280, quality: 0.68 },
    { max: 1024, quality: 0.62 },
  ];

  let current = file;
  for (const a of attempts) {
    current = await compressImage(current, a.max, a.max, a.quality);
    if (current.size <= MAX_VERCEL_UPLOAD_BYTES) return current;
  }

  // If we still couldn't get under the limit, fail with a helpful message.
  throw new Error(
    `Image is too large to upload (${Math.round(current.size / 1024 / 1024)}MB). ` +
      `Please choose a smaller photo or crop it and try again.`
  );
}

/**
 * Create a new solar simulation job by uploading an image and metadata
 * @param file - The image file to upload (will be compressed automatically)
 * @param meta - Metadata about the solar installation (kW, bill, notes, etc.)
 * @param compress - Whether to compress the image before upload (default: true)
 * @returns Promise with jobId and initial status
 */
export async function createSolarJob(
  file: File,
  meta: SolarMeta,
  compress: boolean = true
): Promise<SolarJobResponse> {
  try {
    console.log('[Solar API] Starting job creation...', { 
      fileName: file.name, 
      fileSize: file.size,
      meta 
    });

    // Compress image before upload
    let imageFile = file;
    if (compress) {
      console.log('[Solar API] Compressing image...');
      imageFile = await compressImageForVercel(file);
      console.log('[Solar API] Image compressed:', { 
        originalSize: file.size, 
        compressedSize: imageFile.size 
      });
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('meta', JSON.stringify(meta));

    const apiUrl = `${SOLAR_API_BASE}/jobs`;
    console.log('[Solar API] Sending request to:', apiUrl);
    console.log('[Solar API] Request method: POST');
    console.log('[Solar API] FormData keys:', Array.from(formData.keys()));

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('[Solar API] Response status:', response.status);
    console.log('[Solar API] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Solar API] Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      let errorMessage = `Solar job creation error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.detail || errorData.error || errorMessage;
        console.error('[Solar API] Parsed error data:', errorData);
      } catch {
        errorMessage = errorText || errorMessage;
        console.error('[Solar API] Could not parse error as JSON');
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('[Solar API] Success! Job created:', data);
    return {
      jobId: data.jobId,
      status: data.status || 'queued',
    };
  } catch (error) {
    console.error('[Solar API] Exception caught:', error);
    if (error instanceof Error) {
      console.error('[Solar API] Error message:', error.message);
      console.error('[Solar API] Error stack:', error.stack);
      throw error;
    }
    throw new Error('Failed to create solar job');
  }
}

/**
 * Check the status of a solar simulation job
 * @param jobId - The job ID returned from createSolarJob
 * @returns Promise with current job status and result image if available
 */
export async function checkSolarStatus(jobId: string): Promise<SolarJobStatus> {
  try {
    const response = await fetch(`${SOLAR_API_BASE}/jobs/${encodeURIComponent(jobId)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Solar job status error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      jobId: data.jobId,
      status: data.status || 'queued',
      resultImage: data.resultImage,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to check solar job status');
  }
}

/**
 * Trigger the solar simulation processing for a job
 * @param jobId - The job ID returned from createSolarJob
 * @returns Promise with updated job status
 */
export async function runSolar(jobId: string): Promise<SolarJobResponse> {
  try {
    const response = await fetch(`${SOLAR_API_BASE}/jobs/${encodeURIComponent(jobId)}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Solar job processing error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.detail || errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      jobId: data.jobId,
      status: data.status || 'processing',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to run solar simulation');
  }
}

