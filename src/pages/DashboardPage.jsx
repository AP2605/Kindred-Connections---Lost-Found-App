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
  const { items, loading, addItem, refetch } = useItems();

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      const statsData = await itemsService.getStats();
      setStats(statsData);
    };
    fetchStats();
  }, [items]);

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
      await itemsService.deleteItem(itemId);
      refetch();
      // Refresh stats
      const statsData = await itemsService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onReportClick={() => setShowReportForm(true)} />

      <StatsBar lostCount={stats.lost} foundCount={stats.found} />

      <div className="container mx-auto px-4 mt-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          {['lost', 'found'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-primary border-b-primary'
                  : 'text-muted-foreground border-b-transparent hover:text-foreground'
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