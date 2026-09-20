import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getBackdropUrl } from '@/utils/tmdb';
import { Movie, TVShow } from '@/types';
import { Play, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroSectionProps {
  item?: Movie | TVShow;
  isLoading?: boolean;
  mediaType?: 'movie' | 'tv';
}

export function HeroSection({ item, isLoading, mediaType }: HeroSectionProps) {
  if (isLoading || !item) {
    return <Skeleton className="w-full h-[60vh] md:h-[80vh] rounded-none" />;
  }

  const isMovie = 'title' in item;
  const title = isMovie ? item.title : (item as TVShow).name;
  const overview = item.overview;
  const type = mediaType || (isMovie ? 'movie' : 'tv');

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getBackdropUrl(item.backdrop_path, 'w1280')}
          fallbackSrc="/images/placeholder-backdrop.svg"
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-md">
            {title}
          </h1>
          
          <p className="text-sm md:text-lg text-muted-foreground line-clamp-3 md:line-clamp-4 max-w-xl drop-shadow">
            {overview}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Button size="lg" className="rounded-full font-semibold px-8 gap-2" asChild>
              <Link href={`/${type === 'movie' ? 'movies' : 'tv'}/${item.id}`}>
                <Play className="w-5 h-5 fill-current" /> Play Trailer
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full font-semibold px-8 gap-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground border-0 backdrop-blur-sm" asChild>
              <Link href={`/${type === 'movie' ? 'movies' : 'tv'}/${item.id}`}>
                <Info className="w-5 h-5" /> More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
