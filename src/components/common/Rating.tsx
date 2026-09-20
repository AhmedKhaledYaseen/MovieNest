import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className }: RatingProps) {
  const rounded = value.toFixed(1);
  const color = value >= 7 ? 'text-green-500 fill-green-500' 
    : value >= 5 ? 'text-yellow-500 fill-yellow-500' 
    : 'text-red-500 fill-red-500';

  return (
    <div className={cn("flex items-center gap-1 font-semibold", className)}>
      <Star className={cn("w-4 h-4", color)} />
      <span>{rounded}</span>
    </div>
  );
}
