export function getPostAuthPath(user, membership = null) {
  if (!user) return "/login";

  if (user.role === "candidate") {
    return "/profile";
  }

  if (user.role === "employer") {
    if (membership?.employerType === "owner") {
      if (membership?.needsCompanyOnboarding) {
        return "/employer/company-onboarding";
      }
      if (membership?.pendingApproval) {
        return "/employer/pending-approval";
      }
      return "/employer/dashboard";
    }
    if (membership?.employerType === "hr") {
      if (membership?.hasCompany) {
        return "/employer/dashboard";
      }
      return "/employer/hr-dashboard";
    }
    if (membership?.pendingApproval) {
      return "/employer/pending-approval";
    }
    return "/employer/hr-dashboard";
  }

  if (user.role === "admin") {
    return "/admin/dashboard";
  }

  return "/";
}
