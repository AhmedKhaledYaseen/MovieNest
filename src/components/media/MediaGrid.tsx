import { Movie, TVShow } from '@/types';
import { MediaCard, MediaCardSkeleton } from './MediaCard';

interface MediaGridProps {
  items?: (Movie | TVShow)[];
  isLoading?: boolean;
  skeletonCount?: number;
  mediaType?: 'movie' | 'tv';
}

export function MediaGrid({ 
  items = [], 
  isLoading = false, 
  skeletonCount = 10,
  mediaType 
}: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        No results found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} mediaType={mediaType} />
      ))}
    </div>
  );
}
