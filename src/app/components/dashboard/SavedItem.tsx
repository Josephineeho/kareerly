import React from 'react';
import { SavedOpportunity } from '@/types';

interface SavedItemProps {
  item: SavedOpportunity;
}

export const SavedItem: React.FC<SavedItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 py-3 group cursor-pointer">
      {/* Stylized square character Avatar */}
      <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center font-bold text-primary border border-outline-variant shadow-sm shrink-0">
        {item.logoLetter}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-text-muted mt-0.5 font-medium">
          {item.company} <span className="text-on-surface-variant/30 mx-1">•</span> {item.postedTime}
        </p>
      </div>
    </div>
  );
};