import React, { useState } from 'react';
import { Calendar, MapPin, User, Phone, Trash2 } from 'lucide-react';

export function ItemCard({ item, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
       <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Delete this item"
      >
        <Trash2 size={18} />
      </button>

      {/* Header with status badge */}
      <div className="flex items-start justify-between mb-4 pr-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">{item.item_name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
            item.status === 'lost'
               ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}
        >
          {item.status === 'lost' ? 'LOST' : 'FOUND'}
        </span>
      </div>

      {/* Description */}
       <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
         <Calendar size={16} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <span>{formatDate(item.item_date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <span>{item.reporter_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <span>{item.reporter_phone}</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Item?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to remove this item? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}