export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      entries: {
        Row: {
          id: string;
          user_id: string;
          timestamp: string;
          bristol_score: number;
          urgency_level: number;
          pain_level: number;
          mood_emoji: string | null;
          notes: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          timestamp?: string;
          bristol_score: number;
          urgency_level: number;
          pain_level: number;
          mood_emoji?: string | null;
          notes?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          timestamp?: string;
          bristol_score?: number;
          urgency_level?: number;
          pain_level?: number;
          mood_emoji?: string | null;
          notes?: string | null;
          created_at?: string | null;
        };
      };
    };
  };
}

export type Entry = Database['public']['Tables']['entries']['Row'];
