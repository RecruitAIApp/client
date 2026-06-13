import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { AIScoreBadge } from "../ui/AIScoreBadge";

function formatSalary(range) {
  if (!range) return null;
  const { min, max, currency = "$" } = range;
  const fmt = (n) => (n >= 1000 ? `${currency}${Math.round(n / 1000)}k` : `${currency}${n}`);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  return null;
}

export default function RecommendedJobCard({ job }) {
  const navigate = useNavigate();
  const salary = formatSalary(job.salaryRange);
  const logo = job.company?.logo ?? "💼";
  const companyName = job.company?.name ?? job.company ?? "Unknown";
  const jobId = job._id ?? job.id;

  return (
    <Card hover onClick={() => navigate(`/candidate/jobs/${jobId}`)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
            {logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-0.5 tracking-tight group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-slate-500">{companyName}</p>
              </div>
              {job.aiScore != null && <AIScoreBadge score={job.aiScore} showIcon />}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-4 bg-slate-50 inline-flex px-3 py-2 rounded-lg">
              {job.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </div>
              )}
              {(job.employmentType ?? job.type) && (
                <>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {job.employmentType ?? job.type}
                  </div>
                </>
              )}
              {job.postedDays != null && (
                <>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.postedDays}d ago
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              {salary ? (
                <span className="font-bold text-blue-700">{salary}</span>
              ) : <span />}
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/candidate/jobs/${jobId}`);
                }}
              >
                View Job
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
