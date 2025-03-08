/*
  # Update profiles table for signup flow

  1. Changes
    - Add current_signup_step as integer with default 1
    - Add constraint to ensure step is between 1 and 5
    - Add signup_completed boolean with default false

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns with proper constraints
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS current_signup_step integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS signup_completed boolean DEFAULT false;

-- Add constraint to ensure valid step values
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.constraint_column_usage 
    WHERE constraint_name = 'valid_signup_step'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT valid_signup_step 
    CHECK (current_signup_step >= 1 AND current_signup_step <= 5);
  END IF;
END $$;