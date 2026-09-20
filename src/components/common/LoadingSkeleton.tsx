import { Skeleton } from '@/components/ui/skeleton';

export function PosterSkeleton() {
  return <Skeleton className="w-full aspect-[2/3] rounded-lg" />;
}

export function BackdropSkeleton() {
  return <Skeleton className="w-full aspect-video rounded-lg" />;
}

export function ProfileSkeleton() {
  return <Skeleton className="w-full aspect-square rounded-full" />;
}

export function TextSkeleton({ lines = 1 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}
