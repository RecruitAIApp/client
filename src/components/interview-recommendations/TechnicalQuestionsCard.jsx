import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Code } from "lucide-react";
import { Card } from "../ui/Card.jsx";

export function TechnicalQuestionsCard({ questions = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
        <Code className="h-5 w-5 text-indigo-500" />
        Expected Technical Questions (10+)
      </h3>
      <p className="text-slate-500 text-xs">
        Click on any question below to see tips, conceptual approaches, or suggested key details to mention in your answer.
      </p>

      <div className="space-y-3 pt-2">
        {questions.map((q, index) => {
          const isExpanded = expandedIndex === index;
          // Split question and hints/explanation if model included it with a colon or divider,
          // otherwise render a default hint wrapper.
          const parts = q.split(/\:\s*(.+)/s);
          const questionText = parts[0] || q;
          const hintText = parts[1] || "Ensure you define the core term, explain the business utility, and provide a concrete example from your past work.";

          return (
            <div 
              key={index}
              className={`border border-slate-100 rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? "border-indigo-100 bg-indigo-50/5 shadow-xs" : "hover:border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-4 hover:cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600 mt-0.5">
                    Q{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{questionText}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pl-12 border-t border-slate-100/50 pt-3 text-xs leading-relaxed text-slate-600 bg-slate-50/50">
                  <div className="bg-white border border-slate-100 p-3 rounded-lg">
                    <span className="font-semibold text-indigo-600 block mb-1">Answer Guideline & Hints:</span>
                    <p>{hintText}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
