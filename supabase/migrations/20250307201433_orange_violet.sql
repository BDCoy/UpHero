/*
  # Remove job_role column from profiles table

  1. Changes
    - Remove the `job_role` column from the `profiles` table
    - This is a safe operation as it does not affect any foreign key constraints or policies

  Note: This migration is reversible if needed by adding the column back
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'job_role'
  ) THEN
    ALTER TABLE profiles DROP COLUMN job_role;
  END IF;
END $$;