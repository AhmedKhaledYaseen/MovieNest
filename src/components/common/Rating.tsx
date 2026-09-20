import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  className?: string;
  textColor?: string;
}

export function Rating({ value, className, textColor }: RatingProps) {
  const rounded = (value || 0).toFixed(1);
  const color = 'text-yellow-500 fill-yellow-500';

  return (
    <div className={cn("flex items-center gap-1 font-semibold", className)}>
      <Star className={cn("w-4 h-4", color)} />
      <span className={textColor}>{rounded}</span>
    </div>
  );
}
