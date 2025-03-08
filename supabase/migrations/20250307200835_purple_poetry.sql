/*
  # Add job role and avatar fields to profiles table

  1. Changes
    - Add job_role column to store user's professional title
    - Add avatar_url column to store profile photo reference
*/

-- Add new columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS job_role text,
ADD COLUMN IF NOT EXISTS avatar_url text;

-- Enable storage for avatars
INSERT INTO storage.buckets (id, name)
VALUES ('avatars', 'avatars')
ON CONFLICT DO NOTHING;

-- Set up storage policy for authenticated users
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1]
)
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (regexp_match(name, '^([^/]+)'))[1]
);