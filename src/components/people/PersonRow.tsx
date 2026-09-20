import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Person } from '@/types';
import { PersonCard, PersonCardSkeleton } from './PersonCard';

interface PersonRowProps {
  title: string;
  items?: Person[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function PersonRow({ 
  title, 
  items = [], 
  isLoading = false, 
  skeletonCount = 6,
}: PersonRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items, isLoading]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const validItems = items.filter(item => !!item.profile_path);

  if (!isLoading && validItems.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        {showArrows && (
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll('left')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll('right')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <div key={i} className="flex-none w-[120px] sm:w-[140px] md:w-[160px] snap-start">
                <PersonCardSkeleton />
              </div>
            ))
          ) : (
            validItems.map((item) => (
              <div key={item.id} className="flex-none w-[120px] sm:w-[140px] md:w-[160px] snap-start">
                <PersonCard person={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
