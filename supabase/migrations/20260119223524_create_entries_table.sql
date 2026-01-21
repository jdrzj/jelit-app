/*
  # Create Digestive Health Entries Table

  ## Overview
  This migration creates the core table for tracking bowel movements and digestive health data.
  Users can log entries with Bristol scale, pain/urgency levels, mood, and notes.

  ## New Tables
  
  ### `entries`
  The main table for storing digestive health logs:
  - `id` (uuid, primary key) - Unique identifier for each entry
  - `user_id` (uuid) - References auth.users, links entry to the user who created it
  - `timestamp` (timestamptz) - When the bowel movement occurred (defaults to now)
  - `bristol_score` (int) - Bristol Stool Scale rating (1-7)
  - `urgency_level` (int) - Urgency/ease rating (1-5, where 1=very easy, 5=very urgent)
  - `pain_level` (int) - Pain/discomfort rating (1-5, where 1=no pain, 5=severe pain)
  - `mood_emoji` (text) - Optional mood indicator as emoji or text
  - `notes` (text) - Optional free-text notes about food, stress, medications, etc.
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security

  ### Row Level Security (RLS)
  - **Enabled** on `entries` table to ensure data privacy
  
  ### Policies
  1. **"Users can view own entries"** - SELECT policy
     - Allows authenticated users to read only their own entries
     - Uses `auth.uid()` to match user_id
  
  2. **"Users can create own entries"** - INSERT policy
     - Allows authenticated users to create entries
     - Enforces user_id matches authenticated user
  
  3. **"Users can update own entries"** - UPDATE policy
     - Allows authenticated users to edit only their own entries
     - Prevents modification of user_id
  
  4. **"Users can delete own entries"** - DELETE policy
     - Allows authenticated users to delete only their own entries

  ## Important Notes
  - All constraint checks ensure data integrity (Bristol 1-7, urgency/pain 1-5)
  - Default values make logging quick and easy
  - User_id cannot be null, ensuring all entries are owned
  - Timestamps use timestamptz for timezone awareness
*/

-- Create the entries table
CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp timestamptz NOT NULL DEFAULT now(),
  bristol_score int NOT NULL CHECK (bristol_score BETWEEN 1 AND 7),
  urgency_level int NOT NULL CHECK (urgency_level BETWEEN 1 AND 5),
  pain_level int NOT NULL CHECK (pain_level BETWEEN 1 AND 5),
  mood_emoji text DEFAULT '😐',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create index on user_id and timestamp for efficient queries
CREATE INDEX IF NOT EXISTS entries_user_id_timestamp_idx ON entries(user_id, timestamp DESC);

-- Enable Row Level Security
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own entries
CREATE POLICY "Users can view own entries"
  ON entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can create their own entries
CREATE POLICY "Users can create own entries"
  ON entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own entries
CREATE POLICY "Users can update own entries"
  ON entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own entries
CREATE POLICY "Users can delete own entries"
  ON entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);