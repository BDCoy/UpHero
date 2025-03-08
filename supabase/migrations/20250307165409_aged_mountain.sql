/*
  # Update current_signup_step to use numbers

  1. Changes
    - Modify current_signup_step column to use integer type
    - Add check constraint to ensure valid step numbers (1-5)
    - Update existing rows to use numeric steps
    - Set default value to 1 for new profiles

  2. Security
    - Maintain existing RLS policies
*/

-- First, create a temporary column to avoid data loss
ALTER TABLE profiles 
ADD COLUMN current_step_number integer;

-- Update the temporary column with numeric values based on existing text values
UPDATE profiles SET current_step_number = 
  CASE current_signup_step
    WHEN 'account' THEN 1
    WHEN 'career' THEN 2
    WHEN 'contact' THEN 3
    WHEN 'goals' THEN 4
    WHEN 'plan' THEN 5
    WHEN 'completed' THEN 5
    ELSE 1
  END;

-- Drop the old column
ALTER TABLE profiles 
DROP COLUMN current_signup_step;

-- Rename the temporary column to current_signup_step
ALTER TABLE profiles 
RENAME COLUMN current_step_number TO current_signup_step;

-- Add check constraint and set default value
ALTER TABLE profiles 
ALTER COLUMN current_signup_step SET DEFAULT 1,
ADD CONSTRAINT valid_signup_step CHECK (current_signup_step BETWEEN 1 AND 5);