
import { Card, CardHeader, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";
import { Plus, UserX } from "lucide-react";

export function TeamMembersSkeleton() {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3.5 w-36" />
        </div>
        <Skeleton className="h-7 w-20 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-12 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function TeamMembersCard({ team, isOwner, onInviteOpen, onRemoveHR, pendingRemove }) {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Team Members</h2>
          <p className="text-xs text-slate-400">Recruiter permissions</p>
        </div>
        {isOwner && (
          <Button size="sm" onClick={onInviteOpen} className="px-3 py-1.5 text-xs hover:shadow-xs transition-shadow duration-200">
            <Plus className="w-3.5 h-3.5 mr-0.5" /> Invite HR
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {team?.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a, #14b8a6)",
                }}
              >
                {member.user?.fullName?.[0] || "U"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate leading-tight">
                  {member.user?.fullName}
                </p>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {member.user?.email}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge size="sm" variant={member.role === "owner" ? "purple" : "default"}>
                    {member.role}
                  </Badge>
                </div>
              </div>
            </div>
            {isOwner && member.role === "hr" && (
              <button
                onClick={() => onRemoveHR(member.user?._id, member.user?.fullName)}
                disabled={pendingRemove}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-all duration-200 rounded-lg hover:bg-red-50 cursor-pointer disabled:opacity-50"
                title="Remove HR"
              >
                <UserX className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
