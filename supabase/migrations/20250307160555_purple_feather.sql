/*
  # Add signup tracking fields to profiles table

  1. Changes
    - Add `current_signup_step` column to track the current step in the signup process
    - Add `signup_completed` column to track if the signup process is complete
    - Add `signup_steps_completed` array to track which steps have been completed

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS current_signup_step text DEFAULT 'account',
ADD COLUMN IF NOT EXISTS signup_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS signup_steps_completed text[] DEFAULT '{}';

-- Update RLS policies to allow users to update their own signup progress
CREATE POLICY "Users can update own signup progress"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);