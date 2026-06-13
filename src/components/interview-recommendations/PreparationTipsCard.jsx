import React from "react";
import { Lightbulb, BookOpen, CheckCircle } from "lucide-react";
import { Card } from "../ui/Card.jsx";

export function PreparationTipsCard({ tips = [], recommendations = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Preparation Tips */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Pro Preparation Tips
        </h3>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
              <CheckCircle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Suggested Reading / Resources */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          Suggested Focus Areas
        </h3>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
              <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
