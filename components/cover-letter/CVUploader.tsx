import React from 'react';
import { Upload, X } from 'lucide-react';

// import { toast } from '@lib/store';
import type { CVUploaderProps } from './types';
import { extractTextFromPDF } from '@/lib/pdf';

export function CVUploader({ cvContent, onFileChange, fileInputRef }: CVUploaderProps) {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileType = selectedFile.name.toLowerCase();
    if (!fileType.endsWith(".pdf")) {
      toast.error("Please upload a PDF file");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      const text = await extractTextFromPDF(selectedFile);
      onFileChange(text);
    } catch (err) {
      console.error("Error processing PDF:", err);
      // toast.error("Failed to process PDF. Please try again.");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-upwork-gray mb-4">Upload Your CV</h2>
      
      {!cvContent ? (
        <div 
          className="border-2 border-dashed border-upwork-gray-lighter rounded-lg p-4 sm:p-6 text-center hover:border-upwork-green transition-colors cursor-pointer group" 
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
          <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-upwork-gray-light mb-3 sm:mb-4 group-hover:text-upwork-green transition-colors" />
          <p className="text-upwork-gray font-medium">Click to upload your CV</p>
          <p className="text-sm text-upwork-gray-light mt-1">
            Supported format: PDF
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleReset}
              className="p-1 hover:bg-upwork-background rounded-full transition-colors"
              title="Remove CV"
            >
              <X className="h-5 w-5 text-upwork-gray-light hover:text-upwork-gray" />
            </button>
          </div>
          <div className="border border-upwork-gray-lighter rounded-lg p-4 max-h-[300px] overflow-y-auto">
            <pre className="text-sm text-upwork-gray-light whitespace-pre-wrap font-sans">
              {cvContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}