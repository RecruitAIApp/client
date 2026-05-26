import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

/** Blocks pending (unapproved) owners from company workspace routes. */
export default function EmployerApprovedGuard() {
  const user = useAuthStore((s) => s.user);
  const membership = useAuthStore((s) => s.membership);

  const isPending =
    user?.status === "pending_approval" || membership?.pendingApproval;

  if (isPending) {
    if (membership?.needsCompanyOnboarding) {
      return <Navigate to="/employer/company-onboarding" replace />;
    }
    return <Navigate to="/employer/pending-approval" replace />;
  }

  return <Outlet />;
}
