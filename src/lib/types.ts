import { z } from 'zod';

export const signupSchema = {
  account: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  }),
  
  career: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    careerTitle: z.string().min(2, 'Career title is required')
  }),
  
  contact: z.object({
    phone: z.string().min(10, 'Valid phone number is required')
  }),
  
  goals: z.object({
    goals: z.array(z.string()).min(1, 'Select at least one goal')
  }),
  
  plan: z.object({
    planType: z.enum(['free', 'pro', 'enterprise'])
  })
};

export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  careerTitle: string;
  phone: string;
  goals: string[];
  planType: 'free' | 'pro' | 'enterprise';
};