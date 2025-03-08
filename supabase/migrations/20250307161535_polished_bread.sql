/*
  # Update profile fields for enhanced career and contact information

  1. Changes
    - Remove old fields: career_title
    - Add new career fields:
      - employment_status
      - job_role
      - years_of_experience
      - current_salary
    - Add new contact fields:
      - country
      - city

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  -- Remove old fields if they exist
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'career_title'
  ) THEN
    ALTER TABLE profiles DROP COLUMN career_title;
  END IF;

  -- Add new career fields if they don't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'employment_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN employment_status text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'job_role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN job_role text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'years_of_experience'
  ) THEN
    ALTER TABLE profiles ADD COLUMN years_of_experience integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'current_salary'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_salary numeric;
  END IF;

  -- Add new contact fields if they don't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'country'
  ) THEN
    ALTER TABLE profiles ADD COLUMN country text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'city'
  ) THEN
    ALTER TABLE profiles ADD COLUMN city text;
  END IF;
END $$;