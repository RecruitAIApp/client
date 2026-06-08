import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEmployerStore } from "../store/employerStore";
import { getCompanyDashboard, inviteHR, removeHR } from "../services/employerApi";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "../components/ui/Modal";
import {
  Plus,
  Mail,
  Building,
  Loader2,
  CheckCircle,
  Sparkles,
  Briefcase,
} from "lucide-react";

// Import modular dashboard components and their loading skeletons
import StatsCardsGrid, { StatsCardsSkeleton } from "../components/employer-dashboard/StatsCards";
import RecentJobsCard, { RecentJobsSkeleton } from "../components/employer-dashboard/RecentJobs";
import RecentApplicationsCard, { RecentApplicationsSkeleton } from "../components/employer-dashboard/RecentApplications";
import TeamMembersCard, { TeamMembersSkeleton } from "../components/employer-dashboard/TeamMembers";

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

  // Remove HR modal confirmation state
  const [isRemoveHrOpen, setIsRemoveHrOpen] = useState(false);
  const [hrToRemoveId, setHrToRemoveId] = useState(null);
  const [hrToRemoveName, setHrToRemoveName] = useState("");

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
      toast.success("HR Recruiter invited successfully.");
      setTimeout(() => {
        setIsInviteOpen(false);
        setInviteSuccess("");
      }, 2000);
    },
    onError: (err) => {
      const errorMsg = err.message || "Failed to invite HR.";
      setInviteError(errorMsg);
      toast.error(errorMsg);
    },
  });

  // Remove HR mutation
  const removeHRMutation = useMutation({
    mutationFn: (hrUserId) => removeHR(companyId, hrUserId),
    onSuccess: () => {
      queryClient.invalidateQueries(["companyDashboard", companyId]);
      toast.success("HR Recruiter removed successfully.");
    },
    onError: (err) => {
      const errorMsg = err.message || "Failed to remove HR member.";
      toast.error(errorMsg);
    },
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteHRMutation.mutate(inviteEmail.trim());
  };

  const handleRemoveHRTrigger = (hrUserId, hrName) => {
    setHrToRemoveId(hrUserId);
    setHrToRemoveName(hrName);
    setIsRemoveHrOpen(true);
  };

  const handleConfirmRemoveHR = () => {
    if (hrToRemoveId) {
      removeHRMutation.mutate(hrToRemoveId, {
        onSuccess: () => {
          setIsRemoveHrOpen(false);
          setHrToRemoveId(null);
          setHrToRemoveName("");
        },
      });
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
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Loading Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-lg" />
            <Skeleton className="h-4 w-96 rounded-sm" />
          </div>
          <div className="flex gap-3 shrink-0">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>

        {/* Stats Cards Loader */}
        <StatsCardsSkeleton />

        {/* Sections Loader */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentJobsSkeleton />
            <RecentApplicationsSkeleton />
          </div>
          <div className="space-y-8">
            <TeamMembersSkeleton />
          </div>
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
        <div className="flex items-center gap-3.5 shrink-0">
          {recentJobs?.length > 0 && recentJobs[0]._id && (
            <Button 
              variant="outline" 
              className="border-teal-200 text-teal-700 hover:bg-teal-50/50 font-semibold flex items-center gap-1.5 transition-all duration-200 px-4 py-2 text-sm rounded-lg"
              onClick={() => navigate(`/employer/company/${companyId}/ai-assistant/${recentJobs[0]._id}`)}
            >
              <Sparkles className="w-4 h-4 text-teal-500" /> AI Assistant
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => navigate(`/employer/company/${companyId}/jobs`)} 
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold flex items-center gap-1.5 transition-all duration-200 px-4 py-2 text-sm rounded-lg"
          >
            <Briefcase className="w-4 h-4 text-slate-400" /> Manage Jobs
          </Button>
          <Button 
            onClick={() => navigate("/jobs/create")} 
            className="bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/90 text-white font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all duration-200 px-4 py-2 text-sm rounded-lg"
          >
            <Plus className="w-4 h-4" /> Post a Job
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsCardsGrid stats={stats} />

      {/* Main Dashboard Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Recent Activities */}
        <div className="lg:col-span-2 space-y-8">
          <RecentJobsCard recentJobs={recentJobs} companyId={companyId} />
          <RecentApplicationsCard recentApplications={recentApplications} />
        </div>

        {/* Right Sidebar - Actions & Members */}
        <div className="space-y-8">
          <TeamMembersCard
            team={team}
            isOwner={isOwner}
            onInviteOpen={() => setIsInviteOpen(true)}
            onRemoveHR={handleRemoveHRTrigger}
            pendingRemove={removeHRMutation.isPending}
          />
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

      {/* Remove HR Confirmation Modal */}
      {isRemoveHrOpen && (
        <Modal open={isRemoveHrOpen} onOpenChange={setIsRemoveHrOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle className="text-slate-900 font-bold">Remove HR Recruiter</ModalTitle>
              <ModalDescription className="text-slate-500 mt-2">
                Are you sure you want to remove <span className="font-semibold text-slate-800">{hrToRemoveName}</span> from the company?
                <br /><br />
                This user will lose all recruiter dashboard privileges for {company?.name}.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter className="mt-6 flex flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsRemoveHrOpen(false);
                  setHrToRemoveId(null);
                  setHrToRemoveName("");
                }}
                disabled={removeHRMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmRemoveHR}
                disabled={removeHRMutation.isPending}
              >
                {removeHRMutation.isPending ? "Removing..." : "Remove"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
