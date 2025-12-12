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

/**
 * Create a new solar simulation job by uploading an image and metadata
 * @param file - The image file to upload
 * @param meta - Metadata about the solar installation (kW, bill, notes, etc.)
 * @returns Promise with jobId and initial status
 */
export async function createSolarJob(
  file: File,
  meta: SolarMeta
): Promise<SolarJobResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('meta', JSON.stringify(meta));

    const response = await fetch('/api/solar_create_job', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Solar job creation error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      jobId: data.jobId,
      status: data.status || 'queued',
    };
  } catch (error) {
    if (error instanceof Error) {
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
    const response = await fetch(`/api/solar_job_status?jobId=${encodeURIComponent(jobId)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Solar job status error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
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
    const response = await fetch('/api/solar_run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Solar job processing error: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
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

