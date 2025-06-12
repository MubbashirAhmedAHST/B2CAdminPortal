"use client";
import { cn } from '../../helpers/utilities';
import { Skeleton } from '../ui/skeleton';

export default function SelectLoader({ className }) {
  return (
    <div className={cn(className)}>
      <Skeleton className="mb-1.5 h-4 w-28 rounded" />
      <Skeleton className="h-10 w-full rounded" />
    </div>
  );
}
