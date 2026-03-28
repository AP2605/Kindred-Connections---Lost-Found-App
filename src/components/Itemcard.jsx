import React from 'react';
import { Calendar, MapPin, User, Phone } from 'lucide-react';

export function ItemCard({ item }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header with status badge */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex-1">{item.item_name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
            item.status === 'lost'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {item.status === 'lost' ? 'LOST' : 'FOUND'}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary text-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-muted-foreground border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="flex-shrink-0" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="flex-shrink-0" />
          <span>{formatDate(item.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="flex-shrink-0" />
          <span>{item.reporter_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="flex-shrink-0" />
          <span>{item.reporter_phone}</span>
        </div>
      </div>
    </div>
  );
}