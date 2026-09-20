import { SearchResult } from '@/services/tmdb/search';
import { MediaCard, MediaCardSkeleton } from '../media/MediaCard';
import { PersonCard } from '../people/PersonCard';

interface SearchResultsProps {
  items?: SearchResult[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function SearchResults({ items = [], isLoading = false, skeletonCount = 20 }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MediaCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {items.map((item) => {
        if (item.media_type === 'person') {
          return <PersonCard key={`person-${item.id}`} person={item as any} />;
        }
        return <MediaCard key={`${item.media_type}-${item.id}`} item={item as any} />;
      })}
    </div>
  );
}
