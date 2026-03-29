import React, { useState } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = [
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

export function ReportForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    status: 'lost',
    item_name: '',
    description: '',
    location: '',
    item_date: new Date().toISOString().split('T')[0],
    tags: [],
    reporter_name: '',
    reporter_phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.item_name.trim()) {
      setError('Item name is required');
      setLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      setLoading(false);
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      setLoading(false);
      return;
    }
    if (formData.tags.length === 0) {
      setError('Please select at least one category');
      setLoading(false);
      return;
    }
    if (!formData.reporter_name.trim()) {
      setError('Your name is required');
      setLoading(false);
      return;
    }
    if (!formData.reporter_phone.trim()) {
      setError('Your phone number is required');
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({
        status: 'lost',
        item_name: '',
        description: '',
        location: '',
        item_date: new Date().toISOString().split('T')[0],
        tags: [],
        reporter_name: '',
        reporter_phone: '',
      });
      setError(null);
    } catch(err) {
      console.error('[v0] submit error:', err);
      setError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Report an Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 bg-white dark:bg-slate-900">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}
          {/* Status Toggle */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Item Status
            </label>
            <div className="flex gap-4">
              {['lost', 'found'].map(status => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-foreground capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Silver iPhone 14"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Provide details about the item..."
              rows="4"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Where was it lost/found?"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date *
            </label>
            <input
              type="date"
              name="item_date"
              value={formData.item_date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    console.log('[v0] Toggling category:', category);
                    handleTagToggle(category);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 cursor-pointer active:scale-95 ${
                    formData.tags.includes(category)
                       ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Reporter Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="reporter_name"
                value={formData.reporter_name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Phone *
              </label>
              <input
                type="tel"
                name="reporter_phone"
                value={formData.reporter_phone}
                onChange={handleInputChange}
                required
                placeholder="Your phone number"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}