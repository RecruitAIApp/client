import { Skeleton, SkeletonText, SkeletonCircle } from "../ui/Skeleton";

function RecommendedJobSkeletonItem() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-start gap-4">
        <SkeletonCircle size={48} className="rounded-xl" />
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendedJobsSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <RecommendedJobSkeletonItem key={i} />
      ))}
    </div>
  );
}
