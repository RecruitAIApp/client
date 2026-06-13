import { Badge } from "../ui/Badge.jsx";

export function InterviewStatusBadge({ status, className = "" }) {
  const statusConfig = {
    scheduled: { label: "Scheduled", variant: "info" },
    rescheduled: { label: "Rescheduled", variant: "warning" },
    completed: { label: "Completed", variant: "success" },
    cancelled: { label: "Cancelled", variant: "error" },
  };

  const config = statusConfig[status?.toLowerCase()] || { label: status, variant: "default" };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
