import React from 'react';
import { RecentActivity } from '@/types';

interface ActivityItemProps {
  activity: RecentActivity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  // Select color system dynamically based on notification variants
  const indicatorColor = activity.type === 'view' ? 'bg-[#0f9d58]' : 'bg-primary';

  return (
    <div className="flex items-start gap-4 py-3">
      {/* Custom status dot */}
      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${indicatorColor}`} />
      
      <div className="flex-grow">
        <p className="text-sm text-on-surface font-medium leading-relaxed">
          {activity.type === 'view' ? (
            <>
              {activity.actor} <span className="text-text-muted">viewed your profile.</span>
            </>
          ) : (
            <>
              <span className="text-text-muted">New message from</span> {activity.actor}
            </>
          )}
        </p>
        <p className="text-xs text-text-muted mt-1">{activity.time}</p>
      </div>
    </div>
  );
};