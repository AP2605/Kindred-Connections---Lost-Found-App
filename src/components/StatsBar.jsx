import React from 'react';

export function StatsBar({ lostCount, foundCount }) {
  return (
     <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 py-6 border-b border-green-200 dark:border-green-900">
      <div className="container mx-auto px-4">
        <div className="flex gap-12">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-medium">Lost Items</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{lostCount}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-medium">Found Items</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{foundCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}