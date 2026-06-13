import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("bg-slate-200 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export function SkeletonText({ className, lines = 1, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4 rounded", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = 40, className, ...props }) {
  return (
    <Skeleton
      className={cn("rounded-full shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}

export function SkeletonCard({ className, children, ...props }) {
  return (
    <div
      className={cn("bg-white rounded-2xl border border-slate-100 shadow-sm p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
