import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Entry } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';

export function useEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('entries')
        .select('*')
        .order('timestamp', { ascending: false });

      if (fetchError) throw fetchError;

      setEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const addEntry = async (
    entry: Omit<Entry, 'id' | 'user_id' | 'created_at'>
  ) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('entries')
      .insert({
        ...entry,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    setEntries((prev) => [data, ...prev]);
    return data;
  };

  const updateEntry = async (id: string, updates: Partial<Entry>) => {
    const { data, error } = await supabase
      .from('entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? data : entry))
    );
    return data;
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from('entries').delete().eq('id', id);

    if (error) throw error;

    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return {
    entries,
    loading,
    error,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  };
}
