"use client";

import React, { useCallback, useState } from 'react';

interface BillUploaderProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
}

export default function BillUploader({ onFileSelect, isLoading }: BillUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleFile = useCallback((file: File) => {
        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onFileSelect(file);
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }
    }, [handleFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFile(file);
        }
    };



    const clearPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
    };

    return (
        <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Electricity Bill (Optional)
            </label>
            <div
                className={`relative flex flex-col items-center justify-center w-full min-h-[160px] p-4 rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out
                    ${dragActive ? 'border-primary-blue bg-primary-blue-50 scale-[1.01]' : 'border-gray-300 bg-gray-50 hover:border-primary-blue-400 hover:bg-gray-100'}
                    ${isLoading ? 'opacity-75 pointer-events-none' : ''}
                    ${preview ? 'border-solid border-primary-blue-200' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleChange}
                    accept="image/*"
                    disabled={isLoading}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center text-primary-blue animate-pulse">
                        <svg className="w-10 h-10 mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <p className="text-sm font-medium">Extracting data with AI...</p>
                        <p className="text-xs text-primary-blue-400 mt-1">This may take a few seconds</p>
                    </div>
                ) : preview ? (
                    <div className="relative w-full flex flex-col items-center">
                        <div className="relative w-full max-w-[200px] h-32 mb-2 rounded-lg overflow-hidden shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Bill Preview" className="w-full h-full object-contain bg-white" />
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearPreview();
                            }}
                            className="flex items-center space-x-1 text-sm text-primary-blue hover:text-primary-blue-dark bg-white px-3 py-1 rounded-full shadow-sm z-20"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Change Image</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-500">
                        <div className="w-12 h-12 mb-2 rounded-full bg-primary-blue-50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Drop your bill here or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">We&apos;ll auto-fill the form for you</p>
                    </div>
                )}
            </div>
        </div>
    );
}
