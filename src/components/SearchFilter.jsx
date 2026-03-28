import React from 'react';
import { Search, X } from 'lucide-react';

const TAGS = [
  'Electronics',
  'Wallet',
  'Keys',
  'Phone',
  'Bag',
  'Clothing',
  'Jewelry',
  'Documents',
  'Pet',
  'Glasses',
  'Umbrella',
  'Books',
  'Sports',
  'Other',
];

export function SearchFilter({ searchQuery, onSearchChange, selectedTags, onTagToggle, onClearFilters }) {
  const hasFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-lg transition-all text-sm font-medium"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}