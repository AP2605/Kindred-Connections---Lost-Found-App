import { useState, useEffect } from 'react';
import { itemsService } from '../services/itemsService';

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await itemsService.getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (item) => {
    try {
      const newItem = await itemsService.addItem(item);
      setItems([newItem, ...items]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const updated = await itemsService.updateItem(id, updates);
      setItems(items.map(item => item.id === id ? updated : item));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log('[v0] Hook: deleteItem called for ID:', id);
      await itemsService.deleteItem(id);
      console.log('[v0] Hook: Item deleted from Supabase');
      setItems(items.filter(item => item.id !== id));
      console.log('[v0] Hook: Items state updated, item removed');
      return true;
    } catch (err) {
      console.error('[v0] Hook: Error in deleteItem:', err);
      setError(err.message);
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
}

export function useItemsByStatus(status) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await itemsService.getItemsByStatus(status);
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [status]);

  return { items, loading, error };
}