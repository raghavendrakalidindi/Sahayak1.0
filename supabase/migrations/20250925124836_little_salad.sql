/*
  # Create complaints management system

  1. New Tables
    - `complaints`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `priority` (text)
      - `status` (text)
      - `assigned_to` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `resolved_at` (timestamp, nullable)

  2. Security
    - Enable RLS on `complaints` table
    - Add policies for authenticated users to manage complaints
*/

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  priority text NOT NULL DEFAULT 'Medium',
  status text NOT NULL DEFAULT 'Open',
  assigned_to text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Policy for users to read all complaints (for dashboard visibility)
CREATE POLICY "Users can read all complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for users to insert their own complaints
CREATE POLICY "Users can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update complaints
CREATE POLICY "Users can update complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for users to delete their own complaints
CREATE POLICY "Users can delete own complaints"
  ON complaints
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS complaints_user_id_idx ON complaints(user_id);
CREATE INDEX IF NOT EXISTS complaints_status_idx ON complaints(status);
CREATE INDEX IF NOT EXISTS complaints_priority_idx ON complaints(priority);
CREATE INDEX IF NOT EXISTS complaints_created_at_idx ON complaints(created_at DESC);