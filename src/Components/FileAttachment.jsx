import React, { useState, useCallback } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FileAttachment = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = [...e.dataTransfer.files];
    validateAndAddFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFiles = [...e.target.files];
    validateAndAddFiles(selectedFiles);
    e.target.value = null; // Reset input
  }, []);

  const validateAndAddFiles = (newFiles) => {
    // Example validation - 5MB per file
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    
    const validFiles = newFiles.filter(file => {
      if (file.size > maxSize) {
        setError(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    if (validFiles.length > 0) {
      setError('');
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-colors h-28 flex-col content-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
        
        <Upload className="mx-auto w-5 h-5 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Maximum file size: 5MB
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* File List */}
      <div className="mt-6 space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileAttachment;