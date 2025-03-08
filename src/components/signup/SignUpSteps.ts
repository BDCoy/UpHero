import { Mail, Phone, Target, CreditCard } from 'lucide-react';

export const STEPS = [
  { id: 'account', icon: Mail, label: 'Account' },
  { id: 'contact', icon: Phone, label: 'Contact' },
  { id: 'goals', icon: Target, label: 'Goals' },
  { id: 'plan', icon: CreditCard, label: 'Plan' }
] as const;