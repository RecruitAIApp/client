import React from "react";
import { AlertCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";

export function SkillGapCard({ skillGapAnalysis }) {
  const { missingSkills = [], weakAreas = [], suggestedImprovements = [] } = skillGapAnalysis || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Missing Skills */}
      <Card className="p-5 border-t-4 border-red-500 flex flex-col justify-between">
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Missing Skills
          </h4>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {missingSkills.map((skill, index) => (
                <Badge key={index} variant="error">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-xs italic">No critical missing skills detected. Excellent alignment!</p>
          )}
        </div>
      </Card>

      {/* Weak Areas */}
      <Card className="p-5 border-t-4 border-amber-500 flex flex-col justify-between">
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Weak Areas
          </h4>
          {weakAreas.length > 0 ? (
            <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-600">
              {weakAreas.map((area, index) => (
                <li key={index} className="leading-relaxed">
                  {area}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-xs italic">No significant weak areas identified.</p>
          )}
        </div>
      </Card>

      {/* Suggested Improvements */}
      <Card className="p-5 border-t-4 border-emerald-500 flex flex-col justify-between">
        <div className="space-y-3">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Lightbulb className="h-5 w-5 text-emerald-500" />
            Suggested Improvements
          </h4>
          {suggestedImprovements.length > 0 ? (
            <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-600">
              {suggestedImprovements.map((tip, index) => (
                <li key={index} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-xs italic">Focus on standard review preparations.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
