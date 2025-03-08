import { PDFDownloadLinkProps } from '@react-pdf/renderer';

export interface ToneOption {
  value: string;
  label: string;
  description: string;
}

export interface FormData {
  jobDescription: string;
  companyName: string;
  hiringManager: string;
  tone: string;
}

export interface CoverLetterHeader {
  name: string;
  title: string;
  contact: {
    address?: string;
    cityStateZip?: string;
    phone?: string;
    email?: string;
  };
}

export interface CoverLetterContent {
  recipient: {
    name: string;
    company: string;
  };
  greeting: string;
  paragraphs: string[];
  closing: {
    salutation: string;
    name: string;
  };
}

export interface GeneratedLetter {
  header: CoverLetterHeader;
  content: CoverLetterContent;
}

export interface PDFProps {
  coverLetter: GeneratedLetter;
}

export interface DownloadButtonProps {
  generatedLetter: GeneratedLetter;
}

export interface CVUploaderProps {
  cvContent: string;
  onFileChange: (text: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export interface JobDetailsFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
}

export interface PreviewProps {
  generatedLetter: GeneratedLetter | null;
}

export interface ActionButtonsProps {
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
}