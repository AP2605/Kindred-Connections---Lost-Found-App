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
    <div className="bg-white dark:bg-gray-900 border-b border-green-200 dark:border-green-900 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                     ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 border border-gray-200 dark:border-gray-700'
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
            className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-white hover:bg-green-600 dark:hover:bg-green-700 px-4 py-2 rounded-lg transition-all text-sm font-medium"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}