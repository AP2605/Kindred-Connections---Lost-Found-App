import React from 'react';
import { ItemCard } from './Itemcard.jsx';

export function ItemGrid({ items, searchQuery, selectedTags }) {
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      (item.tags && item.tags.some(tag => selectedTags.includes(tag)));

    return matchesSearch && matchesTags;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">No items found</p>
          <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}