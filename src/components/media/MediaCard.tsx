import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getPosterUrl } from '@/utils/tmdb';
import { getYear } from '@/utils/date';
import { Movie, TVShow } from '@/types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Rating } from '../common/Rating';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Heart, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface MediaCardProps {
  item: Movie | TVShow;
  mediaType?: 'movie' | 'tv';
}

export function MediaCard({ item, mediaType }: MediaCardProps) {
  const isMovie = 'title' in item;
  const title = isMovie ? item.title : (item as TVShow).name;
  const date = isMovie ? item.release_date : (item as TVShow).first_air_date;
  const type = mediaType || (item.media_type) || (isMovie ? 'movie' : 'tv');
  const href = `/${type === 'movie' ? 'movies' : 'tv'}/${item.id}`;

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isWatchlist, toggleWatchlist } = useWatchlist();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isFav = mounted ? isFavorite(item.id, type as 'movie' | 'tv') : false;
  const isWatch = mounted ? isWatchlist(item.id, type as 'movie' | 'tv') : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({
      id: item.id,
      mediaType: type as 'movie' | 'tv',
      title: title,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: date || null,
    });
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWatchlist({
      id: item.id,
      mediaType: type as 'movie' | 'tv',
      title: title,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: date || null,
    });
  };

  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden border-0 bg-transparent shadow-none transition-transform duration-300 hover:scale-[1.03]">
        <CardContent className="p-0 relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-muted">
          <ImageWithFallback
            src={getPosterUrl(item.poster_path)}
            fallbackSrc="/images/placeholder-poster.svg"
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
          <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 text-xs">
            <Rating value={item.vote_average} />
          </div>
          
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="secondary" 
              className={cn("h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80", isFav && "text-red-500")}
              onClick={handleFavoriteClick}
            >
              <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
              <span className="sr-only">Toggle Favorite</span>
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className={cn("h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80", isWatch && "text-primary")}
              onClick={handleWatchlistClick}
            >
              {isWatch ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
              <span className="sr-only">Toggle Watchlist</span>
            </Button>
          </div>
        </CardContent>
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold truncate text-sm md:text-base text-foreground" title={title}>
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{getYear(date)}</p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">
              {type === 'movie' ? 'Movie' : 'TV Show'}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
