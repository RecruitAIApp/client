import React from 'react';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationKanbanCard({ app }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-(--color-border) p-4.5 shadow-micro hover:shadow-hover hover:-translate-y-1 transition-all duration-300 space-y-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="w-11 h-11 rounded-xl bg-[var(--color-bg-light-tint)] text-[var(--color-primary-main)] flex items-center justify-center shrink-0 shadow-2xs">
          <Briefcase className="w-5.5 h-5.5" />
        </div>

        <div className="truncate flex-1 min-w-0">
          <h4 className="font-extrabold text-(--color-secondary-main) text-sm md:text-base truncate tracking-tight">{app.role}</h4>
          <p className="text-xs md:text-sm text-(--color-secondary-muted) font-bold truncate mt-0.5">{app.company}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-1 gap-2">
        <button
          onClick={() => navigate(`/candidate/jobs/${app.jobId}`)}
          className="border border-(--color-border) text-(--color-secondary-muted) font-bold text-xs md:text-sm px-4 py-1.5 rounded-[24px] hover:bg-slate-50 transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          View Job
        </button>
        <button
          onClick={() => navigate(`/candidate/application/${app.id}`)}
          className="border border-[var(--color-primary-main)] text-[var(--color-primary-main)] font-bold text-xs md:text-sm px-4 py-1.5 rounded-[24px] hover:bg-[var(--color-bg-light-tint)] transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          View Application
        </button>
      </div>
    </div>
  );
}