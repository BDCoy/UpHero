export type ATSAnalysis = {
  score: number;
  missingKeywords: string[];
  foundKeywords: string[];
  recommendations: string[];
  skillGaps: {
    skill: string;
    importance: 'high' | 'medium' | 'low';
    context: string;
  }[];
  industryTerms: string[];
  technicalSkills: string[];
  softSkills: string[];
  formatIssues: string[];
  improvementSuggestions: string[];
};

export interface JobDescriptionFormProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
}

export interface ActionButtonsProps {
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
}

export interface AnalysisResultProps {
  analysis: ATSAnalysis;
}

export interface ScoreCardProps {
  score: number;
}

export interface KeywordsSectionProps {
  foundKeywords: string[];
  missingKeywords: string[];
}

export interface RecommendationsProps {
  recommendations: string[];
  skillGaps: ATSAnalysis['skillGaps'];
}

export interface FormattingProps {
  formatIssues: string[];
  improvementSuggestions: string[];
}