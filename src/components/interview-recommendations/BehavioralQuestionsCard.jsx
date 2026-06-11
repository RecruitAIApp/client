import React from "react";
import { Users, HelpCircle } from "lucide-react";
import { Card } from "../ui/Card.jsx";

export function BehavioralQuestionsCard({ questions = [] }) {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
        <Users className="h-5 w-5 text-indigo-500" />
        Expected Behavioral Questions (5+)
      </h3>
      <p className="text-slate-500 text-xs">
        Recruiters use these questions to evaluate your communication, adaptability, and performance in real-world scenarios. We recommend using the **STAR Method** (Situation, Task, Action, Result) to format your replies.
      </p>

      <div className="space-y-3 pt-2">
        {questions.map((q, index) => (
          <div 
            key={index}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/5 transition-all"
          >
            <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Question {index + 1}</span>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">{q}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
