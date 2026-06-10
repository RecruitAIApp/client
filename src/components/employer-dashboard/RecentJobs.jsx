
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

export function RecentJobsSkeleton() {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-4 w-16" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-400 uppercase">
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-slate-50">
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-8 w-24 rounded-lg ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RecentJobsCard({ recentJobs, companyId }) {
  const navigate = useNavigate();

  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Recent Jobs</h2>
          <p className="text-xs text-slate-400">View and track latest postings</p>
        </div>
        <Link
          to={`/employer/company/${companyId}/jobs`}
          className="text-xs font-semibold text-[var(--color-brand-blue)] hover:underline flex items-center gap-0.5"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {recentJobs?.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No jobs posted yet. Create your first job posting!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-400 uppercase">
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentJobs?.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      <Link
                        to={`/employer/pipeline/${job._id}`}
                        className="hover:text-[var(--color-brand-blue)] flex items-center gap-1 group"
                      >
                        {job.title}
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </td>
                    <td className="px-6 py-4 capitalize text-slate-500 whitespace-nowrap">
                      {job.jobType} / {job.employmentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={job.status === "open" ? "success" : "default"}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-brand-teal hover:bg-brand-teal/5 font-bold gap-1.5 inline-flex"
                        onClick={() => navigate(`/employer/company/${companyId}/ai-assistant/${job._id}`)}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> HR Agent
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
