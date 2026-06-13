import React from "react";
import { Sparkles, Target, Award } from "lucide-react";
import { Card } from "../ui/Card.jsx";

export function RecommendationOverview({ overview }) {
  return (
    <Card className="p-6 border-l-4 border-[var(--color-brand-blue-light)] bg-gradient-to-br from-white to-blue-50/20">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-xl text-[var(--color-brand-blue-light)]">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            AI Interview Overview
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
            {overview}
          </p>
        </div>
      </div>
    </Card>
  );
}
