import { supabase } from './supabaseClient';

export const itemsService = {
  // Fetch all items
  async getItems() {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  },

  // Fetch items by status (lost or found)
  async getItemsByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching items by status:', error);
      return [];
    }
  },

  // Add new item
  async addItem(item) {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert([item])
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  },

  // Update item
  async updateItem(id, updates) {
    try {
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  async deleteItem(id) {
    try {
       console.log('[v0] Service: Deleting item with ID:', id);
       const { data, error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)
        .select();

      console.log('[v0] Service: Delete response:', { data, error });

      if (error) {
        console.error('[v0] Service: Delete error:', error);
        throw error;
      }

      console.log('[v0] Service: Item successfully deleted from Supabase');
      return true;
    } catch (error) {
      console.error('[v0] Service: Error deleting item:', error);
      throw error;
    }
  },

  // Get stats
  async getStats() {
    try {
      const { count: lostCount, error: lostError } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'lost');

      if (lostError) throw lostError;

      const { count: foundCount, error: foundError } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'found');

      if (foundError) throw foundError;

      return {
        lost: lostCount || 0,
        found: foundCount || 0,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { lost: 0, found: 0 };
    }
  },
};