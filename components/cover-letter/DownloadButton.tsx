import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CoverLetterPDF } from './CoverLetterPDF';
import type { DownloadButtonProps } from './types';
import { Button } from '../ui/Button';

export function DownloadButton({ generatedLetter }: DownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<CoverLetterPDF coverLetter={generatedLetter} />}
      fileName={`cover-letter-${new Date().toISOString().split('T')[0]}.pdf`}
    >
      {({ loading }) => (
        <Button 
          variant="outline" 
          disabled={loading} 
          className="whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Preparing PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}