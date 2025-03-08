/*
  # Remove unused signup_steps_completed column

  1. Changes
    - Remove the `signup_steps_completed` column from the `profiles` table as it's not being used
    - The signup flow uses `current_signup_step` and `signup_completed` fields instead

  Note: This is a safe operation as the column is not referenced anywhere in the application
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'signup_steps_completed'
  ) THEN
    ALTER TABLE profiles DROP COLUMN signup_steps_completed;
  END IF;
END $$;