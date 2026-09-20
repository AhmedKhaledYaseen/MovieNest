import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie, TVShow } from '@/types';
import { MediaCard, MediaCardSkeleton } from './MediaCard';

interface MediaRowProps {
  title: string;
  items?: (Movie | TVShow)[];
  isLoading?: boolean;
  skeletonCount?: number;
  mediaType?: 'movie' | 'tv';
}

export function MediaRow({ 
  title, 
  items = [], 
  isLoading = false, 
  skeletonCount = 6,
  mediaType 
}: MediaRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll('left')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll('right')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="flex-none w-[140px] sm:w-[160px] md:w-[200px] snap-start">
                <MediaCardSkeleton />
              </div>
            ))
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex-none w-[140px] sm:w-[160px] md:w-[200px] snap-start">
                <MediaCard item={item} mediaType={mediaType} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
