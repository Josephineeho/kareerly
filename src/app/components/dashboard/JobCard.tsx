import React from 'react';
import { Job } from '@/types';
import { Bookmark, MapPin, Banknote, ArrowRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const matchColor =
    job.matchPercentage >= 90
      ? 'bg-secondary/10 text-secondary border-secondary/20'
      : job.matchPercentage >= 75
      ? 'bg-primary/10 text-primary border-primary/20'
      : 'bg-surface-container-high text-on-surface-variant border-slate-200';

  return (
    <div className="group bg-surface-container-lowest border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-tonal-lift transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center font-black text-lg text-on-surface-variant shrink-0 border border-slate-100 group-hover:border-primary/20 transition-colors">
          {job.logoUrl
            ? <img src={job.logoUrl} alt={job.company} className="rounded-xl w-full h-full object-cover" />
            : job.company[0]
          }
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors leading-snug">
                {job.title}
              </h3>
              <p className="text-sm font-semibold text-on-surface-variant mt-0.5">{job.company}</p>
            </div>
            <button className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/8 transition-all shrink-0 -mt-0.5" aria-label="Save job">
              <Bookmark size={17} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-muted" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Banknote size={12} className="text-muted" />
              {job.salary}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-surface-container-low text-on-surface-variant border border-slate-200"
              >
                {tag}
              </span>
            ))}
            <span className={`px-2.5 py-0.5 text-xs font-black rounded-lg border ${matchColor}`}>
              {job.matchPercentage}% match
            </span>
          </div>
        </div>
      </div>

      {/* Apply CTA — shows on hover */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-xs text-muted">Posted recently</p>
        <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
          View & Apply <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};