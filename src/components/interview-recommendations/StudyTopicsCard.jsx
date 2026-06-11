import React from "react";
import { BookOpen } from "lucide-react";
import { Card } from "../ui/Card.jsx";

export function StudyTopicsCard({ topics = [] }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[var(--color-brand-blue-light)]" />
          Recommended Study Topics
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          The AI Interview Coach recommends mastering the following core subjects and engineering disciplines prior to the interview call:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {topics.map((topic, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/10 transition-all cursor-default"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-[var(--color-brand-blue-light)]">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-slate-700">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
