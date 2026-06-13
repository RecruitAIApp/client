import React from 'react';
import { Target, TrendingUp, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

const getIcon = (label) => {
  const normalized = label.toLowerCase().trim();
  if (normalized.includes('skills')) {
    return <Target className="w-5 h-5 text-white" />;
  }
  if (normalized.includes('experience')) {
    return <TrendingUp className="w-5 h-5 text-white" />;
  }
  if (normalized.includes('culture')) {
    return <Award className="w-5 h-5 text-white" />;
  }
  if (normalized.includes('education')) {
    return <GraduationCap className="w-5 h-5 text-white" />;
  }
  return <Target className="w-5 h-5 text-white" />;
};

export default function AIScreeningSummary({ summary = [], strengths = [] }) {
  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-6 space-y-6 shadow-[0_4px_12px_rgba(15,23,42,0.03)]'>
      <h3 className="font-extrabold text-base text-(--color-secondary-main) border-b border-slate-100 pb-3">AI Screening Summary</h3>
      
      {/* 2-column responsive grid layout to save massive vertical space */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {summary.map((item, idx) => {
          const hasScore = typeof item.percentage === 'number' && item.percentage > 0;
          return (
            <div key={idx} className="flex gap-4 items-start border border-slate-100/50 p-3 rounded-xl bg-slate-50/20 hover:bg-slate-50/50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-main)] to-[#3b82f6] flex items-center justify-center shrink-0 shadow-2xs">
                {getIcon(item.label)}
              </div>

              <div className="flex-1 min-w-0">
                <div className='flex justify-between items-center'>
                  <span className="text-sm font-bold text-(--color-secondary-main) truncate pr-1">{item.label}</span>
                  {hasScore ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/55 transition-all duration-200">
                      {item.percentage}%
                    </span>
                  ) : (
                    <span className="inline-block w-8 h-4 rounded-full bg-slate-100 animate-pulse border border-slate-200/40" />
                  )}
                </div>
                {item.desc ? (
                  <p className="text-xs text-(--color-secondary-muted) mt-1 leading-relaxed line-clamp-2" title={item.desc}>{item.desc}</p>
                ) : (
                  <div className="h-3 bg-slate-100 rounded w-3/4 mt-2 animate-pulse" />
                )}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  {hasScore ? (
                    <div className="bg-gradient-to-br from-[var(--color-primary-main)] to-[#3b82f6] h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${item.percentage}%` }}></div>
                  ) : (
                    <div className="bg-slate-200 h-full w-full rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {strengths && strengths.length > 0 && (
        <div className="space-y-3 pt-5 border-t border-slate-100">
          <h4 className="text-sm font-bold text-(--color-secondary-main)">Key Strengths</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-(--color-secondary-muted)">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}