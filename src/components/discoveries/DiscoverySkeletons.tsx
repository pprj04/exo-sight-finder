import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DiscoverySkeletons = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="glass-card overflow-hidden">
          {/* Mini Light Curve Skeleton */}
          <Skeleton className="h-20 w-full rounded-none" />

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Badge */}
            <Skeleton className="h-6 w-36" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </>
  );
};

export default DiscoverySkeletons;
