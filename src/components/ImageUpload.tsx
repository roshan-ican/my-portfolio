"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  onImageError?: (error: string) => void;
}

const ImageUpload = ({
  currentImageUrl,
  onImageChange,
  onImageError,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onImageError?.("Please select an image file");
      return;
    }

    // Validate file size (max 20MB) - Updated from 5MB
    if (file.size > 20 * 1024 * 1024) {
      onImageError?.("File size must be less than 20MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onImageChange(result.url);
        onImageError?.("");
      } else {
        onImageError?.(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      onImageError?.("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const removeImage = () => {
    // Ask for confirmation before removing an uploaded image
    if (
      currentImageUrl &&
      currentImageUrl !== "/project-images/default-project.png"
    ) {
      if (
        confirm(
          "Are you sure you want to remove this image? This action cannot be undone."
        )
      ) {
        onImageChange("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } else {
      // For placeholder or empty images, just clear
      onImageChange("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {currentImageUrl && (
        <div className="relative">
          <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={currentImageUrl}
              alt="Project preview"
              className="w-full h-full object-cover"
              onError={() => onImageError?.("Failed to load image")}
            />
            <button
              onClick={removeImage}
              title="Remove image"
              className="absolute top-2 right-2 p-1.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110 shadow-lg">
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Current image: {currentImageUrl}
          </p>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="space-y-3">
          {isUploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Uploading...
              </span>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentImageUrl ? "Replace Image" : "Upload Image"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  PNG, JPG, GIF up to 20MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Manual URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Or enter image URL
        </label>
        <input
          type="url"
          value={currentImageUrl}
          onChange={(e) => onImageChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
