import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Clock,
} from "lucide-react";
import {
  getPendingCompanies,
  approveCompany,
  rejectCompany,
} from "../services/adminApi";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";

function CompanyCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminCompanies() {
  const queryClient = useQueryClient();
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["pendingCompanies"],
    queryFn: getPendingCompanies,
  });

  const companies = data?.data ?? [];

  const approveMutation = useMutation({
    mutationFn: (companyId) => approveCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingCompanies"]);
      queryClient.invalidateQueries(["adminStats"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ companyId, reason }) => rejectCompany(companyId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingCompanies"]);
      queryClient.invalidateQueries(["adminStats"]);
      setRejectModal(null);
      setRejectReason("");
    },
  });

  const handleReject = () => {
    rejectMutation.mutate({
      companyId: rejectModal.companyId,
      reason: rejectReason,
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 text-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Moderation
          </h1>
          {!isLoading && companies.length > 0 && (
            <Badge variant="warning">{companies.length} pending</Badge>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Review company licenses and approve or reject registrations.
        </p>
      </div>

      {/* Empty state */}
      {!isLoading && companies.length === 0 && (
        <div className="text-center py-20 space-y-3">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-700">
            All caught up!
          </h2>
          <p className="text-slate-400 text-sm">
            No companies are pending review right now.
          </p>
        </div>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <CompanyCardSkeleton key={i} />
            ))
          : companies.map((company) => {
              const licenseUrl =
                company.licenses && company.licenses.secure_url;
              const logoUrl = company.logo && company.logo.secure_url;

              return (
                <Card key={company._id}>
                  <CardContent className="p-6 space-y-4">
                    {/* Company header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={company.name}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-800">
                            {company.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {company.industry ?? "—"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </div>
                    </div>

                    {/* Company details */}
                    <div className="space-y-1.5 text-sm text-slate-600">
                      {company.owner && (
                        <p>
                          <span className="font-medium text-slate-700">
                            Owner:
                          </span>{" "}
                          {company.owner.fullName} — {company.owner.email}
                        </p>
                      )}
                      {company.size && (
                        <p>
                          <span className="font-medium text-slate-700">
                            Size:
                          </span>{" "}
                          {company.size}
                        </p>
                      )}
                      {company.location && (
                        <p>
                          <span className="font-medium text-slate-700">
                            Location:
                          </span>{" "}
                          {company.location}
                        </p>
                      )}
                      <p>
                        <span className="font-medium text-slate-700">
                          Submitted:
                        </span>{" "}
                        {new Date(company.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* License */}
                    {licenseUrl ? (
                      <a
                        href={licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-(--color-brand-blue) hover:underline font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View License Document
                      </a>
                    ) : (
                      <p className="text-sm text-red-500 font-medium">
                        ⚠ No license uploaded yet
                      </p>
                    )}

                    {/* Rejection reason if previously rejected */}
                    {company.rejectionReason && (
                      <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-sm text-red-600">
                        <span className="font-medium">Previous rejection:</span>{" "}
                        {company.rejectionReason}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveMutation.mutate(company._id)}
                        disabled={approveMutation.isPending || !licenseUrl}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {approveMutation.isPending ? "Approving..." : "Approve"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setRejectModal({
                            companyId: company._id,
                            companyName: company.name,
                          })
                        }
                        disabled={rejectMutation.isPending}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Reject Company</h2>
            <p className="text-sm text-slate-500">
              You are rejecting{" "}
              <span className="font-semibold text-slate-700">
                {rejectModal.companyName}
              </span>
              . The owner will be able to re-upload their license and resubmit.
            </p>
            <Input
              label="Reason (optional)"
              placeholder="e.g. License document is not clear"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setRejectModal(null);
                  setRejectReason("");
                }}
                disabled={rejectMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={rejectMutation.isPending}
              >
                {rejectMutation.isPending ? "Rejecting..." : "Reject Company"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
