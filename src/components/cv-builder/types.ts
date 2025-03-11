export interface CVData {
  headline: string;
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

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ExperienceItemProps {
  item: CVData['workExperience'][0];
  onUpdate: (item: CVData['workExperience'][0]) => void;
  onDelete: () => void;
}

export interface EducationItemProps {
  item: CVData['education'][0];
  onUpdate: (item: CVData['education'][0]) => void;
  onDelete: () => void;
}

export interface AchievementItemProps {
  item: CVData['achievements'][0];
  onUpdate: (item: CVData['achievements'][0]) => void;
  onDelete: () => void;
}

export interface SkillsEditorProps {
  skills: CVData['skills'];
  onUpdate: (skills: CVData['skills']) => void;
}

export interface LanguagesEditorProps {
  languages: CVData['languages'];
  onUpdate: (languages: CVData['languages']) => void;
}