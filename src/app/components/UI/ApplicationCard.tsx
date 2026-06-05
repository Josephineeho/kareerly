"use client"
import React from "react"
import { MessageSquare, MoreHorizontal, CalendarPlus } from "lucide-react"
import { ApplicationStatus, ApplicationCardProps } from "@/types";
// 1. Define the supported status types matching your database enums

export default function ApplicationCard({
  jobTitle,
  companyName,
  appliedDate,
  logoUrl,
  status,
  currentStage = 1,
  totalStages = 4,
  statusMetaText,
  onPrimaryAction
}: ApplicationCardProps) {

  // 3. Status Badge and Styling Configurations based on your theme
  const statusConfig = {
    applied: {
      label: "APPLIED",
      badgeClass: "bg-surface-container-high text-on-surface-variant",
      hasProgressBar: true,
    },
    reviewing: {
      label: "IN REVIEW",
      badgeClass: "bg-blue-100 text-[#0056d2]",
      hasProgressBar: true,
    },
    shortlisted: {
      label: "SHORTLISTED",
      badgeClass: "bg-[#94f0df] text-[#006f62]",
      hasProgressBar: true,
    },
    interviewing: {
      label: "INTERVIEWING",
      badgeClass: "bg-purple-100 text-purple-700",
      hasProgressBar: true,
    },
    offered: {
      label: "OFFER RECEIVED",
      badgeClass: "bg-emerald-100 text-emerald-700",
      hasProgressBar: true,
      customProgressLine: true, // Full solid line like 'Staff UX Researcher'
    },
    rejected: {
      label: "DECLINED",
      badgeClass: "bg-slate-200 text-slate-600",
      hasProgressBar: false, // Replaced with text warning like 'Creative Director'
    },
    withdrawn: {
      label: "WITHDRAWN",
      badgeClass: "bg-slate-100 text-slate-400",
      hasProgressBar: false,
    }
  }[status];

  return (
    <div 
      className={`
        bg-surface-container-lowest p-6 rounded-xl shadow-tonal-lift transition-all duration-200
        ${status === 'rejected' ? 'border border-slate-300' : 'border border-transparent'}
      `}
    >
      {/* HEADER SECTION: Logo, Titles, and Status Badge */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex gap-4 items-center">
          {/* Company Logo Wrapper */}
          <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
            {logoUrl ? (
              <img src={logoUrl} alt={companyName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-sm">{companyName.charAt(0)}</span>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-on-surface leading-snug tracking-tight line-clamp-1">
              {jobTitle}
            </h3>
            <p className="text-sm text-on-surface-variant font-medium mt-0.5 line-clamp-1">
              {companyName} • <span className="text-slate-400">Applied {appliedDate}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <span className={`text-[10px] font-extrabold px-2.5 py-1.5 rounded-md tracking-wider shrink-0 ${statusConfig.badgeClass}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* MID SECTION: Progress Tracks vs Warnings */}
      <div className="mb-6">
        {statusConfig.hasProgressBar ? (
          <>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              <span>Application Progress</span>
              <span className={status === 'offered' ? 'text-emerald-700' : 'text-primary'}>
                {status === 'offered' ? 'Completed' : `Stage ${currentStage} of ${totalStages}`}
              </span>
            </div>

            {/* Progress Bars Indicator */}
            {statusConfig.customProgressLine ? (
              /* Offered Style: Single solid bar */
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-700 rounded-full w-full" />
              </div>
            ) : (
              /* Segmented Step Style (e.g. Stage 3 of 5) */
              <div className="flex gap-1">
                {Array.from({ length: totalStages }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      idx < currentStage ? 'bg-[#006b5e]' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Declined Style text layout */
          <p className="text-sm text-on-surface-variant/80 font-medium py-1">
            The position has been filled. Better luck next time!
          </p>
        )}

        {/* Optional Metadata Timeline Text */}
        {statusMetaText && (
          <p className="text-xs italic text-on-surface-variant/70 mt-3 font-medium">
            {statusMetaText}
          </p>
        )}
      </div>

      {/* FOOTER SECTION: Actions Layout */}
      <div className="flex items-center gap-3">
        {/* Dynamic Primary Functional Action Button */}
        <button
          onClick={onPrimaryAction}
          className={`
            flex-1 py-3 px-4 font-bold text-sm rounded-lg transition-all active:scale-[0.99]
            ${status === 'rejected' 
              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
              : 'bg-[#0040a1] text-white hover:bg-[#0056d2] shadow-sm'
            }
          `}
        >
          {status === 'offered' ? 'Review Offer' : status === 'rejected' ? 'View Feedback' : 'View Details'}
        </button>

        {/* Dynamic Auxiliary Context Action Icons */}
        {status === 'offered' ? (
          <button className="p-3 border border-slate-200 rounded-lg text-[#0040a1] hover:bg-slate-50 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
        ) : status === 'rejected' ? (
          <button className="p-3 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
            <CalendarPlus className="w-5 h-5" />
          </button>
        ) : (
          <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}