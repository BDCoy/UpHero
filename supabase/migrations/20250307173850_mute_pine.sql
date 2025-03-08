/*
  # Remove career-related fields from profiles table

  1. Changes
    - Remove employment_status column
    - Remove job_role column
    - Remove years_of_experience column
    - Remove current_salary column

  2. Notes
    - Using IF EXISTS to ensure idempotency
    - Preserving existing data in other columns
*/

DO $$ 
BEGIN
  -- Remove career-related columns if they exist
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'employment_status'
  ) THEN
    ALTER TABLE profiles DROP COLUMN employment_status;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'job_role'
  ) THEN
    ALTER TABLE profiles DROP COLUMN job_role;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'years_of_experience'
  ) THEN
    ALTER TABLE profiles DROP COLUMN years_of_experience;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'current_salary'
  ) THEN
    ALTER TABLE profiles DROP COLUMN current_salary;
  END IF;
END $$;