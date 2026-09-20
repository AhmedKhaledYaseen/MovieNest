import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Heart, BookmarkPlus } from 'lucide-react';
import { Rating } from '../common/Rating';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { TrailerModal } from '../common/TrailerModal';
import { getBackdropUrl, getPosterUrl } from '@/utils/tmdb';
import { MovieDetails, TVShowDetails } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { useWatchlist } from '@/hooks/useWatchlist';
import { BookmarkCheck } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MediaDetailsProps {
  item: MovieDetails | TVShowDetails;
  mediaType: 'movie' | 'tv';
  trailerKey?: string;
}

function formatRuntime(minutes: number): string {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function MediaDetails({ item, mediaType, trailerKey }: MediaDetailsProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { isWatchlist, toggleWatchlist } = useWatchlist();

  const isMovie = mediaType === 'movie';
  const title = isMovie ? (item as MovieDetails).title : (item as TVShowDetails).name;
  const releaseDate = isMovie ? (item as MovieDetails).release_date : (item as TVShowDetails).first_air_date;
  const runtime = isMovie ? ((item as MovieDetails).runtime ?? 0) : ((item as TVShowDetails).episode_run_time?.[0] ?? 0);

  const isFav = mounted ? isFavorite(item.id, mediaType) : false;
  const isWatch = mounted ? isWatchlist(item.id, mediaType) : false;

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: item.id,
      mediaType,
      title,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: releaseDate || null,
    });
  };

  const handleWatchlistClick = () => {
    toggleWatchlist({
      id: item.id,
      mediaType,
      title,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: releaseDate || null,
    });
  };

  return (
    <div className="relative w-full min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getBackdropUrl(item.backdrop_path, 'w1280')}
          fallbackSrc="/images/placeholder-backdrop.svg"
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/90 md:bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          <div className="w-64 sm:w-72 md:w-80 shrink-0 relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={getPosterUrl(item.poster_path, 'w500')}
              fallbackSrc="/images/placeholder-poster.svg"
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {title}
              </h1>
              {item.tagline && (
                <p className="text-lg md:text-xl text-muted-foreground italic">
                  "{item.tagline}"
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium">
              <Rating value={item.vote_average} className="text-lg" />
              <span>({item.vote_count} votes)</span>
              <span>•</span>
              <span>{releaseDate}</span>
              {runtime > 0 && (
                <>
                  <span>•</span>
                  <span>{formatRuntime(runtime)}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {item.genres.map(g => (
                <Badge key={g.id} variant="secondary">{g.name}</Badge>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-foreground/90 leading-relaxed max-w-3xl mx-auto md:mx-0 text-left">
                {item.overview}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              {trailerKey && (
                <Button size="lg" className="rounded-full gap-2 px-6" onClick={() => setIsTrailerOpen(true)}>
                  <Play className="w-5 h-5 fill-current" /> Watch Trailer
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className={cn("rounded-full gap-2 px-6", isFav && "text-red-500 border-red-500 hover:bg-red-500/10")} 
                onClick={handleFavoriteClick}
              >
                <Heart className={cn("w-5 h-5", isFav && "fill-current")} /> 
                {isFav ? 'Favorited' : 'Favorite'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={cn("rounded-full gap-2 px-6", isWatch && "text-primary border-primary hover:bg-primary/10")}
                onClick={handleWatchlistClick}
              >
                {isWatch ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />} 
                {isWatch ? 'On Watchlist' : 'Watchlist'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </div>
  );
}
