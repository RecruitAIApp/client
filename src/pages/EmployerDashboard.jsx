import{ useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEmployerStore } from "../store/employerStore";
import { getCompanyDashboard, inviteHR, removeHR } from "../services/employerApi";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { AIScoreBadge } from "../components/ui/AIScoreBadge";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "../components/ui/Modal";
import {
  Briefcase,
  FileText,
  TrendingUp,
  Brain,
  Plus,
  Mail,
  UserX,
  Building,
  ChevronRight,
  Loader2,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function EmployerDashboard() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    memberships,
    activeCompanyId,
    setActiveCompanyId,
    isLoading: storeLoading,
  } = useEmployerStore();

  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Sync route param with Zustand active company state
  useEffect(() => {
    if (companyId && companyId !== activeCompanyId) {
      setActiveCompanyId(companyId);
    }
  }, [companyId, activeCompanyId, setActiveCompanyId]);

  // Handle redirects if visiting general /employer/dashboard
  useEffect(() => {
    if (!companyId && !storeLoading) {
      if (activeCompanyId) {
        navigate(`/employer/company/${activeCompanyId}`, { replace: true });
      } else if (memberships.length > 0) {
        const firstId = memberships[0].company?._id;
        setActiveCompanyId(firstId);
        navigate(`/employer/company/${firstId}`, { replace: true });
      }
    }
  }, [companyId, memberships, activeCompanyId, storeLoading, navigate, setActiveCompanyId]);

  // Fetch company scoped dashboard metrics
  const {
    data: dashboardData,
    isLoading: isDashLoading,
    error: dashError,
  } = useQuery({
    queryKey: ["companyDashboard", companyId],
    queryFn: () => getCompanyDashboard(companyId),
    enabled: Boolean(companyId),
  });

  // Determine user's company-scoped role
  const activeMembership = memberships.find((m) => m.company?._id === companyId);
  const isOwner = activeMembership?.role === "owner";

  // Invite HR mutation
  const inviteHRMutation = useMutation({
    mutationFn: (email) => inviteHR(companyId, email),
    onSuccess: (data) => {
      setInviteSuccess(data.message || "Invitation sent successfully!");
      setInviteEmail("");
      setInviteError("");
      queryClient.invalidateQueries(["companyDashboard", companyId]);
      setTimeout(() => {
        setIsInviteOpen(false);
        setInviteSuccess("");
      }, 2000);
    },
    onError: (err) => {
      setInviteError(err.message || "Failed to invite HR.");
    },
  });

  // Remove HR mutation
  const removeHRMutation = useMutation({
    mutationFn: (hrUserId) => removeHR(companyId, hrUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(["companyDashboard", companyId]);
    },
    onError: (err) => {
      alert(err.message || "Failed to remove HR member.");
    },
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteHRMutation.mutate(inviteEmail.trim());
  };

  const handleRemoveHR = (hrUserId, hrName) => {
    if (confirm(`Are you sure you want to remove ${hrName} from the company?`)) {
      removeHRMutation.mutate(hrUserId);
    }
  };

  if (storeLoading || (!companyId && memberships.length > 0)) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (memberships.length === 0) {
    return (
      <div className="p-12 max-w-xl mx-auto text-center space-y-6 bg-white rounded-2xl border border-slate-100 shadow-md mt-10">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Building className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">No Company Workspace Found</h2>
          <p className="text-slate-500 text-sm mt-2">
            You are not part of any company yet. Onboard your company to start posting jobs.
          </p>
        </div>
        <Button onClick={() => navigate("/employer/company-onboarding")} className="mx-auto">
          <Plus className="w-4 h-4 mr-1" /> Onboard Company
        </Button>
      </div>
    );
  }

  if (isDashLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 lg:col-span-2 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (dashError) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-red-600">Error Loading Dashboard</h2>
        <p className="text-slate-600">{dashError.message || "Failed to load dashboard data."}</p>
        <Button onClick={() => queryClient.invalidateQueries(["companyDashboard", companyId])}>
          Retry
        </Button>
      </div>
    );
  }

  const { stats, recentJobs, recentApplications, team, company } = dashboardData?.data || {};

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {company?.name} Workspace
            </h1>
            <Badge variant="purple" className="capitalize">
              {activeMembership?.role}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1.5">{company?.description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {recentJobs?.[0] && (
            <Button 
              variant="outline" 
              className="border-brand-teal text-brand-teal hover:bg-brand-teal/5 font-bold"
              onClick={() => navigate(`/employer/company/${companyId}/ai-assistant/${recentJobs[0]._id}`)}
            >
              <Sparkles className="w-4 h-4" /> AI Recruitment Assistant
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate(`/employer/company/${companyId}/jobs`)}>
            Manage Jobs
          </Button>
          <Button onClick={() => navigate("/jobs/create")}>
            <Plus className="w-4 h-4" /> Post a Job
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Jobs</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.activeJobs} active</h3>
              <p className="text-xs text-slate-500 mt-1">{stats?.totalJobs} total jobs posted</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[var(--color-brand-teal)] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Applications</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.totalApplications}</h3>
              <p className="text-xs text-slate-500 mt-1">Candidates applied</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Pipeline Status</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stats?.hiredCount} hired</h3>
              <p className="text-xs text-slate-500 mt-1">{stats?.interviewingCount} in interviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Avg. AI Match Score</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-0.5">
                {stats?.averageAiScore ? `${stats.averageAiScore}%` : "N/A"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">AI screening completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Recent Activities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Jobs */}
          <Card className="border border-slate-100 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Recent Jobs</h2>
                <p className="text-xs text-slate-400">Manage latest job postings</p>
              </div>
              <Link
                to={`/employer/company/${companyId}/jobs`}
                className="text-sm font-semibold text-[var(--color-brand-blue)] hover:underline flex items-center gap-0.5"
              >
                View all <ChevronRight className="w-4 h-4" />
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
                    <tbody className="divide-y divide-slate-50">
                      {recentJobs?.map((job) => (
                        <tr key={job._id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-semibold text-slate-700">
                            <Link to={`/employer/company/${companyId}/jobs`} className="hover:text-[var(--color-brand-blue)]">
                              {job.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 capitalize text-slate-500">
                            {job.jobType} / {job.employmentType}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={job.status === "open" ? "success" : "default"}>
                              {job.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-brand-teal hover:bg-brand-teal/5 font-bold gap-1.5"
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

          {/* Recent Applications */}
          <Card className="border border-slate-100 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>
                <p className="text-xs text-slate-400">Candidates applying to your jobs</p>
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
                    <tbody className="divide-y divide-slate-50">
                      {recentApplications?.map((app) => (
                        <tr key={app._id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-700">{app.candidateId?.fullName}</p>
                            <p className="text-xs text-slate-400">{app.candidateId?.email}</p>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-medium">
                            {app.jobId?.title || "Deleted Job"}
                          </td>
                          <td className="px-6 py-4 capitalize">
                            <Badge variant={app.stage?.key === "hired" ? "success" : app.stage?.key === "rejected" ? "error" : "warning"}>
                              {app.stage?.key}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {app.aiScreening?.status === "completed" ? (
                              <AIScoreBadge score={app.aiScreening?.overallScore} size="sm" />
                            ) : (
                              <span className="text-xs text-slate-400 font-medium capitalize">
                                {app.aiScreening?.status || "queued"}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
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
        </div>

        {/* Right Sidebar - Team Members */}
        <div className="space-y-8">
          <Card className="border border-slate-100 shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Team Members</h2>
                <p className="text-xs text-slate-400">Manage recruiter permissions</p>
              </div>
              {isOwner && (
                <Button size="sm" onClick={() => setIsInviteOpen(true)} className="px-3.5 py-2">
                  <Plus className="w-3.5 h-3.5 mr-0.5" /> Invite HR
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {team?.map((member) => (
                <div key={member._id} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-(--color-brand-blue) to-(--color-brand-teal) text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {member.user?.fullName?.[0] || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{member.user?.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">{member.user?.email}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge size="sm" variant={member.role === "owner" ? "purple" : "default"}>
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {isOwner && member.role === "hr" && (
                    <button
                      onClick={() => handleRemoveHR(member.user?._id, member.user?.fullName)}
                      disabled={removeHRMutation.isPending}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer disabled:opacity-50"
                      title="Remove HR"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Invite HR Modal */}
      {isInviteOpen && (
        <Modal open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Invite HR Recruiter</ModalTitle>
              <ModalDescription>
                Invite a recruiter to join {company?.name}. Existing users will be added directly. New users will receive an email invitation to register.
              </ModalDescription>
            </ModalHeader>
            <form onSubmit={handleInviteSubmit} className="space-y-4 py-2">
              <Input
                label="Email Address"
                placeholder="recruiter@company.com"
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                error={inviteError}
                disabled={inviteHRMutation.isPending}
              />
              {inviteSuccess && (
                <div className="flex gap-2 p-3 bg-green-50 text-green-700 text-sm rounded-lg" role="alert">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>{inviteSuccess}</span>
                </div>
              )}
              <ModalFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteOpen(false)}
                  disabled={inviteHRMutation.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={inviteHRMutation.isPending}>
                  {inviteHRMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />
                      Sending...
                    </>
                  ) : (
                    "Send Invitation"
                  )}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
