"use client"
import React from 'react'
import ApplicationCard from '@/app/components/UI/ApplicationCard'
import { Search, SlidersHorizontal } from "lucide-react"

function Applications() {

        {/* change filter controls: store in object and loop to render adding state for selected filter managed by the state */}
        const filters = [
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Interviewing", value: "interviewing" },
          { label: "Offers", value: "offers" },
          { label: "Archived", value: "archived" },
        ];

        const [selectedFilter, setSelectedFilter] = React.useState("all");

        function handleFilterChange(value: string) {
          setSelectedFilter(value);
          // Implement filtering logic based on the selected value
        }
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title and Badge Count */}
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            My Applications
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <p className="text-sm font-medium text-on-surface-variant">
              12 Active Applications
            </p>
          </div>
        </div>

        {/* Search & Filter Controls Container */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Input Box */}
          <div className="relative flex-1 md:w-64 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted pointer-events-none group-focus-within:text-primary transition-colors">
              <Search className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <input
              type="text"
              placeholder="Search roles or companies..."
              className="w-full bg-surface-container-low border-none text-sm text-on-surface rounded-xl py-3 pl-11 pr-4 outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Sliders/Filter Button */}
          <button className="p-3 bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant rounded-xl transition-colors shrink-0">
            <SlidersHorizontal className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* BOTTOM NAVIGATION FILTER PILLS */}
      <div className="flex items-center p-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              selectedFilter === filter.value
                ? "bg-primary text-white"
                : "bg-surface-container-low/60 text-on-surface-variant hover:bg-surface-container-low/80"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    {/* make  */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      <ApplicationCard jobTitle='SWE' companyName='FastWeb' appliedDate='today' logoUrl='https://fastwebcm.org/favicon.ico' status='reviewing' />
      {/* more jobs with different statuses */}
      <ApplicationCard jobTitle='Product Manager' companyName='TechCorp' appliedDate='3 days ago' logoUrl='https://techcorp.com/logo.png' status='interviewing' />
      <ApplicationCard jobTitle='Data Analyst' companyName='DataWorks' appliedDate='1 week ago' logoUrl='https://dataworks.com/logo.png' status='offered' />
      <ApplicationCard jobTitle='UX Designer' companyName='DesignHub' appliedDate='2 weeks ago' logoUrl='https://designhub.com/logo.png' status='rejected' />
      <ApplicationCard jobTitle='Marketing Specialist' companyName='MarketMakers' appliedDate='5 days ago' logoUrl='https://marketmakers.com/logo.png' status='reviewing' />
      </div>
    </div>
  )
}

export default Applications