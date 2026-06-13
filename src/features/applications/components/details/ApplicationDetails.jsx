export default function ApplicationDetails({meta}) {
  const {appliedDate, status} = meta || {};
  return(
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_12px_rgba(15,23,42,0.03)] space-y-4">
      <h3 className="font-extrabold text-sm text-(--color-secondary-main) border-b border-slate-100 pb-3">Application Details</h3>
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs text-(--color-secondary-muted) font-semibold block mb-1">Applied</span>
          <span className="text-(--color-secondary-main) font-bold text-sm">{appliedDate}</span>
        </div>
        <div>
          <span className="text-xs text-(--color-secondary-muted) font-semibold block mb-2">Current Status</span>
          <span className="bg-[var(--color-bg-light-tint)] text-[var(--color-primary-main)] font-bold text-xs px-3 py-1 rounded-full border border-blue-200/50 inline-block capitalize transition-all duration-200 ease-in-out hover:scale-105">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}