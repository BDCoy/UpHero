import React from 'react';
import { useFormik } from 'formik';
import { Button } from '../Button';
import { signupValidationSchemas } from '../../lib/validation';
import { 
  Users, 
  TrendingUp, 
  Search, 
  FileEdit, 
  Clock, 
  MessageSquare, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';

const AVAILABLE_GOALS = [
  {
    id: 'find-clients',
    value: 'findMoreClients',
    label: 'Find more clients',
    icon: Users,
    description: 'Connect with quality clients and expand your network'
  },
  {
    id: 'increase-earnings',
    value: 'increaseEarnings',
    label: 'Increase earnings',
    icon: TrendingUp,
    description: 'Optimize your rates and boost your income'
  },
  {
    id: 'improve-visibility',
    value: 'improveProfileVisibility',
    label: 'Improve profile visibility',
    icon: Search,
    description: 'Stand out in search results and attract more opportunities'
  },
  {
    id: 'proposal-writing',
    value: 'betterProposalWriting',
    label: 'Better proposal writing',
    icon: FileEdit,
    description: 'Craft compelling proposals that win projects'
  },
  {
    id: 'time-management',
    value: 'timeManagement',
    label: 'Time management',
    icon: Clock,
    description: 'Balance projects and increase productivity'
  },
  {
    id: 'client-communication',
    value: 'clientCommunication',
    label: 'Client communication',
    icon: MessageSquare,
    description: 'Build strong client relationships and improve retention'
  },
  {
    id: 'portfolio-development',
    value: 'portfolioDevelopment',
    label: 'Portfolio development',
    icon: Briefcase,
    description: 'Showcase your best work and attract better clients'
  },
  {
    id: 'skill-development',
    value: 'skillDevelopment',
    label: 'Skill development',
    icon: GraduationCap,
    description: 'Stay competitive with in-demand skills'
  }
];

interface GoalsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: {
    goals: string[];
  };
}

export function GoalsStep({ onNext, onBack, initialData }: GoalsStepProps) {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.goals,
    onSubmit: (values) => {
      onNext({
        ...values,
        goals: values.goals.map(goalId => 
          AVAILABLE_GOALS.find(g => g.id === goalId)?.value || goalId
        )
      });
    },
  });

  return (
    <div className="flex flex-col min-h-[600px]">
      <div className="flex-1">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-upwork-gray">
            What are your freelancing goals?
          </h3>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Select the areas you'd like to improve. Choose as many as you'd like.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-upwork-background pr-2">
          {AVAILABLE_GOALS.map((goal) => {
            const isSelected = formik.values.goals.includes(goal.id);
            const Icon = goal.icon;
            
            return (
              <label
                key={goal.id}
                className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all duration-200 group hover:shadow-md ${
                  isSelected
                    ? 'border-upwork-green bg-upwork-background ring-2 ring-upwork-green ring-opacity-50'
                    : 'border-gray-200 hover:border-upwork-green hover:bg-upwork-background'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <div className={`w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
                    isSelected 
                      ? 'border-upwork-green bg-upwork-green' 
                      : 'border-gray-300 group-hover:border-upwork-green'
                  }`}>
                    {isSelected && (
                      <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-upwork-green text-white' 
                      : 'bg-upwork-background text-upwork-green group-hover:bg-upwork-green-light group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-upwork-gray">
                        {goal.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-upwork-gray-light">
                      {goal.description}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={(e) => {
                    const newGoals = e.target.checked
                      ? [...formik.values.goals, goal.id]
                      : formik.values.goals.filter(g => g !== goal.id);
                    formik.setFieldValue('goals', newGoals);
                  }}
                />
              </label>
            );
          })}
        </div>

        {formik.touched.goals && formik.errors.goals && (
          <p className="mt-4 text-sm text-red-600 text-center">{formik.errors.goals}</p>
        )}
      </div>

      <div className="sticky bottom-0 pt-6 mt-6 border-t border-upwork-background bg-white">
        <form onSubmit={formik.handleSubmit} className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!formik.isValid || formik.isSubmitting}
            className="flex-1"
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}