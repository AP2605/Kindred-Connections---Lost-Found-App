import React from 'react';

export function StatsBar({ lostCount, foundCount }) {
  return (
    <div className="bg-secondary py-4 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Lost Items</p>
            <p className="text-2xl font-bold text-foreground">{lostCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Found Items</p>
            <p className="text-2xl font-bold text-foreground">{foundCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}