"use client";

import { useState, useRef } from "react";
import { createSolarJob, runSolar, checkSolarStatus, SolarMeta } from "@/lib/solarApi";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslations } from "@/lib/translations";

export default function SolarSimulation() {
  const { currentLanguage } = useLanguage();
  const t = getTranslations(currentLanguage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bill, setBill] = useState<string>("");
  const [kw, setKw] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done" | "error">("idle");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    if (!bill && !kw) {
      setError("Please enter either monthly bill or desired system size (kW)");
      return;
    }

    try {
      setStatus("uploading");
      setError(null);
      setResultImage(null);

      // Prepare metadata
      const meta: SolarMeta = {
        bill: bill ? parseFloat(bill) : undefined,
        kW: kw ? parseFloat(kw) : undefined,
        notes: notes || undefined,
      };

      // Create job
      const response = await createSolarJob(imageFile, meta);
      setJobId(response.jobId);

      // Start processing
      setStatus("processing");
      await runSolar(response.jobId);

      // Poll for status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await checkSolarStatus(response.jobId);
          
          if (statusResponse.status === "done") {
            clearInterval(pollInterval);
            setStatus("done");
            if (statusResponse.resultImage) {
              setResultImage(statusResponse.resultImage);
            }
          } else if (statusResponse.status === "error") {
            clearInterval(pollInterval);
            setStatus("error");
            setError("Processing failed. Please try again.");
          }
        } catch (err) {
          clearInterval(pollInterval);
          setStatus("error");
          setError(err instanceof Error ? err.message : "Failed to check status");
        }
      }, 2000); // Poll every 2 seconds

      // Timeout after 60 seconds
      setTimeout(() => {
        clearInterval(pollInterval);
        if (status === "processing") {
          setStatus("error");
          setError("Processing timed out. Please try again.");
        }
      }, 60000);

    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to create job");
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setBill("");
    setKw("");
    setNotes("");
    setJobId(null);
    setStatus("idle");
    setResultImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="solar-simulation" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-dark mb-3 sm:mb-4">
            Visualize Solar Panels on Your Terrace
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of your terrace and see how solar panels would look installed. Our AI will analyze your space and create a realistic visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-navy-dark mb-6">
              Upload Terrace Photo
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terrace Photo *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-blue transition-colors">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-48 w-auto rounded-lg object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-blue hover:text-primary-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-blue"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              ref={fileInputRef}
                              name="image-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageSelect}
                              disabled={status === "uploading" || status === "processing"}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bill Input */}
              <div>
                <label htmlFor="bill" className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  id="bill"
                  name="bill"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="e.g., 5000"
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none"
                  disabled={status === "uploading" || status === "processing"}
                />
                <p className="mt-1 text-sm text-gray-500">
                  We'll calculate the required system size automatically
                </p>
              </div>

              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* kW Input */}
              <div>
                <label htmlFor="kw" className="block text-sm font-medium text-gray-700 mb-2">
                  Desired System Size (kW)
                </label>
                <input
                  type="number"
                  id="kw"
                  name="kw"
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                  placeholder="e.g., 5"
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none"
                  disabled={status === "uploading" || status === "processing"}
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., South-facing terrace, water tank on north side"
                  rows={3}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none resize-none"
                  disabled={status === "uploading" || status === "processing"}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "uploading" || status === "processing" || !imageFile}
                className="w-full bg-solar-red text-white font-bold py-4 rounded-lg hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "uploading" && "Uploading..."}
                {status === "processing" && (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                )}
                {status === "idle" && "Generate Solar Visualization"}
                {status === "done" && "Generate Another"}
              </button>

              {status === "done" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Reset
                </button>
              )}
            </form>
          </div>

          {/* Result Display */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
            <h3 className="text-2xl font-bold text-navy-dark mb-6">
              {status === "idle" ? "Preview" : status === "done" ? "Solar Panel Visualization" : "Processing..."}
            </h3>

            <div className="space-y-4">
              {status === "idle" && (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">Your visualization will appear here</p>
                </div>
              )}

              {status === "uploading" && (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <svg className="animate-spin h-12 w-12 text-primary-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Uploading image...</p>
                </div>
              )}

              {status === "processing" && (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <svg className="animate-spin h-12 w-12 text-primary-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">AI is processing your image...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take 30-60 seconds</p>
                </div>
              )}

              {status === "done" && resultImage && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={`data:image/jpeg;base64,${resultImage}`}
                      alt="Solar panel visualization"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={`data:image/jpeg;base64,${resultImage}`}
                      download="solar-visualization.jpg"
                      className="flex-1 bg-primary-blue text-white text-center font-semibold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors"
                    >
                      Download Image
                    </a>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700">Processing failed</p>
                  <p className="text-sm text-red-600 mt-2">Please try again</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

