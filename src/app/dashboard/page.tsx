"use client"
import { ArrowRight, BookmarkCheck, BriefcaseBusiness, Eye, MessageSquare, Plus, Sparkles, TrendingUp, Trophy } from 'lucide-react'
import React, { useState } from 'react'
import { Job, RecentActivity, SavedOpportunity } from '@/types';
import { JobCard } from '../components/dashboard/JobCard';
import { SavedItem } from '../components/dashboard/SavedItem';
import { ActivityItem } from '../components/dashboard/ActivityItem';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

interface StatCardProps {
  icon: React.ReactNode;
  num: number;
  text: string;
  trend?: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorMap = {
  blue:   { bg: 'bg-primary/10',   icon: 'text-primary',   border: 'border-primary/10' },
  green:  { bg: 'bg-secondary/10', icon: 'text-secondary',  border: 'border-secondary/10' },
  purple: { bg: 'bg-purple-500/10', icon: 'text-purple-600', border: 'border-purple-500/10' },
  orange: { bg: 'bg-orange-500/10', icon: 'text-orange-500', border: 'border-orange-500/10' },
};

function StatCard({ icon, num, text, trend, color }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`bg-surface-container-lowest rounded-2xl p-5 border ${c.border} hover:shadow-tonal-lift transition-all duration-200 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.icon}`}>
          {icon}
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
            <TrendingUp size={10} />
            {trend}
          </span>
        )}
      </div>
      <p className="font-black text-2xl text-on-surface">{num}</p>
      <p className="text-xs font-semibold text-on-surface-variant mt-0.5 uppercase tracking-wider">{text}</p>
    </div>
  );
}

function Dashboard() {
  const { user } = useUser();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  const dashboardStats: StatCardProps[] = [
    { icon: <Eye size={18} />,             num: 24,  text: "Profile Views",        trend: "+18%",  color: 'blue'   },
    { icon: <MessageSquare size={18} />,   num: 12,  text: "New Messages",         trend: "+5",    color: 'green'  },
    { icon: <BriefcaseBusiness size={18}/>,num: 5,   text: "Applications",         trend: "Active",color: 'purple' },
    { icon: <Trophy size={18} />,          num: 3,   text: "Interviews Scheduled",               color: 'orange' },
  ];

  const mockJobs: Job[] = [
    { id: '1', title: 'Senior Product Designer', company: 'Linear', location: 'Remote', salary: '$140k – $190k', tags: ['Figma', 'UX Research'], matchPercentage: 98 },
    { id: '2', title: 'Design Architect',         company: 'Vercel', location: 'San Francisco', salary: '$160k – $210k', tags: ['React', 'Systems'], matchPercentage: 92 },
    { id: '3', title: 'UI/UX Lead',              company: 'Stripe', location: 'Remote',        salary: '$130k – $170k', tags: ['Figma', 'Motion'],  matchPercentage: 87 },
  ];

  const mockSaved: SavedOpportunity[] = [
    { id: '1', title: 'Visual Designer',       company: 'Spotify', postedTime: '2 days ago',  logoLetter: 'S' },
    { id: '2', title: 'Staff Product Designer',company: 'Notion',  postedTime: '1 week ago',  logoLetter: 'N' },
    { id: '3', title: 'Creative Director',     company: 'Apple',   postedTime: '3 days ago',  logoLetter: 'A' },
  ];

  const mockActivities: RecentActivity[] = [
    { id: '1', type: 'view',    actor: 'Recruiter from Google',  content: '', time: '2 hours ago' },
    { id: '2', type: 'message', actor: 'Sarah Chen (Airbnb)',    content: '', time: 'Yesterday'   },
    { id: '3', type: 'view',    actor: 'Hiring Manager at Meta', content: '', time: '3 days ago'  },
  ];

  const profileStrength = 62;
  const profileItems = [
    { label: 'Work experience added',   done: true  },
    { label: 'Portfolio uploaded',      done: true  },
    { label: 'Skills listed',           done: true  },
    { label: 'Add a technical skill',   done: false },
    { label: 'Upload resume/CV',        done: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-primary rounded-3xl p-6 md:p-8">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Sparkles size={11} />
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
            </div>
            <h1 className="font-black text-2xl md:text-3xl text-white tracking-tight">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-white/70 mt-2 text-sm leading-relaxed max-w-lg">
              You have <span className="text-white font-bold">12 new messages</span> from recruiters at Google and Stripe. Your profile views are up <span className="text-white font-bold">18%</span> this week.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/dashboard/messages">
              <button className="flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-white/25 active:scale-95 transition-all duration-200">
                <MessageSquare size={15} />
                View Messages
              </button>
            </Link>
            <Link href="/dashboard/jobs">
              <button className="flex items-center gap-2 bg-white text-primary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg">
                Browse Jobs
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Recommended Jobs */}
        <section className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-xl text-on-surface tracking-tight">Recommended for You</h2>
              <p className="text-xs text-muted mt-0.5">Based on your profile and preferences</p>
            </div>
            <Link href="/dashboard/jobs">
              <button className="flex items-center gap-1.5 text-primary text-xs font-bold hover:underline">
                See all <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {mockJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Right Rail */}
        <aside className="space-y-5">

          {/* Profile Strength */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 shadow-tonal-lift">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Profile Strength</h3>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Export <ArrowRight size={11} />
              </button>
            </div>

            {/* Progress ring-style bar */}
            <div className="mb-1 flex justify-between items-center">
              <span className="text-2xl font-black text-on-surface">{profileStrength}%</span>
              <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">Good</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2 mb-5">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                style={{ width: `${profileStrength}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {profileItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-secondary text-white' : 'border-2 border-dashed border-slate-300'}`}>
                    {item.done ? (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : (
                      <Plus size={11} className="text-muted" />
                    )}
                  </div>
                  <p className={`text-xs font-semibold ${item.done ? 'text-on-surface line-through opacity-50' : 'text-on-surface'}`}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Opportunities */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 shadow-tonal-lift">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Saved Jobs</h3>
              <BookmarkCheck size={15} className="text-muted" />
            </div>

            <div className="divide-y divide-surface-container-low">
              {mockSaved.map((item) => (
                <SavedItem key={item.id} item={item} />
              ))}
            </div>

            <Link href="/dashboard/saved-jobs">
              <button className="w-full mt-4 py-2.5 text-xs font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all duration-200">
                View All Saved →
              </button>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 border border-slate-100 shadow-tonal-lift">
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Recent Activity</h3>
            <div className="space-y-1">
              {mockActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

export default Dashboard
