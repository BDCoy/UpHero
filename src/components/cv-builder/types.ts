export interface CVData {
  fullName: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
  summary: string;
  workExperience: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export interface CVStyles {
  fontFamily: string;
  fontSize: {
    headline: string;
    section: string;
    body: string;
  };
  colors: {
    primary: string;
    text: string;
    background: string;
  };
  spacing: {
    section: string;
    item: string;
  };
}

export interface EditorProps {
  cvData: CVData;
  onUpdate: (data: Partial<CVData>) => void;
}

export interface PreviewProps {
  cvData: CVData;
  styles: CVStyles;
}

export interface StylesEditorProps {
  styles: CVStyles;
  onUpdate: (styles: Partial<CVStyles>) => void;
}