
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Skeleton } from "../ui/Skeleton";
import { AIScoreBadge } from "../ui/AIScoreBadge";

export function RecentApplicationsSkeleton() {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="pb-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3.5 w-56 mt-2" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-400 uppercase">
                <th className="px-6 py-3">Candidate</th>
                <th className="px-6 py-3">Job Role</th>
                <th className="px-6 py-3">Stage</th>
                <th className="px-6 py-3">AI Score</th>
                <th className="px-6 py-3">Applied</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-slate-50">
                  <td className="px-6 py-4 space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3.5 w-48" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-12 rounded-lg" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
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

export default function RecentApplicationsCard({ recentApplications }) {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Recent Applications</h2>
          <p className="text-xs text-slate-400">Latest candidate matches</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {recentApplications?.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No applications received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-400 uppercase">
                  <th className="px-6 py-3">Candidate</th>
                  <th className="px-6 py-3">Job Role</th>
                  <th className="px-6 py-3">Stage</th>
                  <th className="px-6 py-3">AI Score</th>
                  <th className="px-6 py-3">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplications?.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700 leading-tight">
                        {app.candidateId?.fullName}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.candidateId?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                      {app.jobId?.title || "Deleted Job"}
                    </td>
                    <td className="px-6 py-4 capitalize whitespace-nowrap">
                      <Badge
                        variant={
                          app.stage?.key === "hired"
                            ? "success"
                            : app.stage?.key === "rejected"
                            ? "error"
                            : "warning"
                        }
                      >
                        {app.stage?.key}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.aiScreening?.status === "completed" ? (
                        <AIScoreBadge score={app.aiScreening?.overallScore} size="sm" />
                      ) : (
                        <span className="text-xs text-slate-400 font-medium capitalize">
                          {app.aiScreening?.status || "queued"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString()}
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
