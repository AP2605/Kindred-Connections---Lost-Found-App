import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { StatsBar } from '../components/StatsBar';
import { SearchFilter } from '../components/SearchFilter';
import { ItemGrid } from '../components/ItemGrid';
import { ReportForm } from '../components/ReportForm';
import { useItems } from '../hooks/useItems';
import { itemsService } from '../services/itemsService';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('lost');
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [stats, setStats] = useState({ lost: 0, found: 0 });
  const { items, loading, addItem, deleteItem: deleteItemFromHook, refetch } = useItems();

  // Fetch stats whenever items change
  useEffect(() => {
    const fetchStats = async () => {
      console.log('[v0] DashboardPage: Fetching stats, items count:', items.length);
      const statsData = await itemsService.getStats();
      console.log('[v0] DashboardPage: Stats fetched:', statsData);
      setStats(statsData);
    };
    if (items.length >= 0) {
      fetchStats();
    }
  }, [items.length]);

  // Filter items by active tab
  const filteredByTab = items.filter(item => item.status === activeTab);

  const handleReportSubmit = async (formData) => {
    try {
      await addItem(formData);
      setShowReportForm(false);
      refetch();
      // Refresh stats
      const statsData = await itemsService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      console.log('[v0] Dashboard: Starting delete for item ID:', itemId);
      
       // Step 1: Delete from Supabase and update local state
      await deleteItemFromHook(itemId);
      console.log('[v0] Dashboard: Item deleted successfully');
      
      // Step 2: Wait a moment for Supabase to sync
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 3: Fetch fresh stats from Supabase
      const statsData = await itemsService.getStats();
      console.log('[v0] Dashboard: Fresh stats from Supabase:', statsData);
      setStats(statsData);

       console.log('[v0] Dashboard: Delete and stats update complete');
    } catch (error) {
      console.error('[v0] Dashboard: Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onReportClick={() => setShowReportForm(true)} />

      <StatsBar lostCount={stats.lost} foundCount={stats.found} />

      <div className="container mx-auto px-4 mt-8">
        {/* Tabs */}
        <div className="flex gap-8 mb-6 border-b border-gray-200 dark:border-gray-800">
          {['lost', 'found'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-0 py-3 font-semibold text-sm capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-green-600 dark:text-green-400 border-b-green-600 dark:border-b-green-400'
                  : 'text-gray-600 dark:text-gray-400 border-b-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'lost' ? 'Lost Items' : 'Found Items'}
            </button>
          ))}
        </div>
      </div>

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      <ItemGrid
        items={filteredByTab}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        onDeleteItem={handleDeleteItem}
      />

      <ReportForm
        isOpen={showReportForm}
        onClose={() => setShowReportForm(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}