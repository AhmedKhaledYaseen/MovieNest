import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useWatchlist } from '@/hooks/useWatchlist';
import { MediaCard } from '@/components/media/MediaCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, useMemo } from 'react';
import { WatchlistItem } from '@/types';
import { Movie, TVShow } from '@/types';

/** Map a WatchlistItem into the minimal Movie/TVShow shape MediaCard needs */
function toMediaItem(item: WatchlistItem): Movie | TVShow {
  if (item.mediaType === 'movie') {
    return {
      id: item.id,
      title: item.title,
      original_title: item.title,
      overview: null,
      poster_path: item.posterPath,
      backdrop_path: null,
      release_date: item.releaseDate,
      vote_average: item.voteAverage,
      vote_count: 0,
      popularity: 0,
      genre_ids: [],
      genres: [],
      adult: false,
      media_type: 'movie',
    } as Movie;
  }
  return {
    id: item.id,
    name: item.title,
    original_name: item.title,
    overview: null,
    poster_path: item.posterPath,
    backdrop_path: null,
    first_air_date: item.releaseDate,
    vote_average: item.voteAverage,
    vote_count: 0,
    popularity: 0,
    genre_ids: [],
    genres: [],
    media_type: 'tv',
  } as TVShow;
}

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const movies = useMemo(() => watchlist.filter((w) => w.mediaType === 'movie'), [watchlist]);
  const tvShows = useMemo(() => watchlist.filter((w) => w.mediaType === 'tv'), [watchlist]);

  if (!mounted) return null;

  return (
    <AuthGuard>
      <Layout>
        <Head>
          <title>My Watchlist — MovieNest</title>
        </Head>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
          <h1 className="text-3xl font-bold tracking-tight mb-8">My Watchlist</h1>

          {watchlist.length === 0 ? (
            <EmptyState 
              title="Watchlist is empty" 
              description="Keep track of movies and TV shows you want to watch." 
            />
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All ({watchlist.length})</TabsTrigger>
                <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
                <TabsTrigger value="tv">TV Shows ({tvShows.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {watchlist.map((item) => (
                    <MediaCard key={`watch-${item.mediaType}-${item.id}`} item={toMediaItem(item)} mediaType={item.mediaType} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="movies">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {movies.map((item) => (
                    <MediaCard key={`watch-movie-${item.id}`} item={toMediaItem(item)} mediaType="movie" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tv">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {tvShows.map((item) => (
                    <MediaCard key={`watch-tv-${item.id}`} item={toMediaItem(item)} mediaType="tv" />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </Layout>
    </AuthGuard>
  );
}
