
import { Card, CardContent } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { Briefcase, FileText, TrendingUp, Brain } from "lucide-react";

export function StatCard({ title, value, subtext, icon: Icon, colorClass, bgClass }) {
  return (
    <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-slate-100 rounded-xl overflow-hidden bg-white">
      <CardContent className="flex items-center gap-4 py-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bgClass} ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{value}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border border-slate-100 rounded-xl bg-white">
          <CardContent className="flex items-center gap-4 py-6">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-3.5 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function StatsCardsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Jobs"
        value={`${stats?.activeJobs || 0} Active`}
        subtext={`${stats?.totalJobs || 0} total jobs posted`}
        icon={Briefcase}
        colorClass="text-[var(--color-brand-blue)]"
        bgClass="bg-blue-50/80"
      />
      <StatCard
        title="Applications"
        value={stats?.totalApplications || 0}
        subtext="Candidates applied"
        icon={FileText}
        colorClass="text-[var(--color-brand-teal)]"
        bgClass="bg-teal-50/80"
      />
      <StatCard
        title="Pipeline Status"
        value={`${stats?.hiredCount || 0} hired`}
        subtext={`${stats?.interviewingCount || 0} in interviews`}
        icon={TrendingUp}
        colorClass="text-purple-600"
        bgClass="bg-purple-50/80"
      />
      <StatCard
        title="Avg. AI Match Score"
        value={stats?.averageAiScore ? `${stats.averageAiScore}%` : "N/A"}
        subtext="AI screening completed"
        icon={Brain}
        colorClass="text-green-600"
        bgClass="bg-green-50/80"
      />
    </div>
  );
}
