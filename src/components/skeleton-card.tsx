import { cn } from '@/lib/utils';
import Skeleton from './skeleton';

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-8', className)}>
      <Skeleton className="h-6 w-full" />

      <div className="flex flex-col space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>

      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}
