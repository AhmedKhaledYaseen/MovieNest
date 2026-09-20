import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useFavorites } from '@/hooks/useFavorites';
import { MediaCard } from '@/components/media/MediaCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, useMemo } from 'react';
import { FavoriteItem } from '@/types';
import { Movie, TVShow } from '@/types';

/** Map a FavoriteItem into the minimal Movie/TVShow shape MediaCard needs */
function toMediaItem(item: FavoriteItem): Movie | TVShow {
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

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const movies = useMemo(() => favorites.filter((f) => f.mediaType === 'movie'), [favorites]);
  const tvShows = useMemo(() => favorites.filter((f) => f.mediaType === 'tv'), [favorites]);

  if (!mounted) return null;

  return (
    <AuthGuard>
      <Layout>
        <Head>
          <title>My Favorites — MovieNest</title>
        </Head>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
          <h1 className="text-3xl font-bold tracking-tight mb-8">My Favorites</h1>

          {favorites.length === 0 ? (
            <EmptyState 
              title="No favorites yet" 
              description="Start exploring movies and TV shows and add them to your favorites." 
            />
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
                <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
                <TabsTrigger value="tv">TV Shows ({tvShows.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {favorites.map((item) => (
                    <MediaCard key={`fav-${item.mediaType}-${item.id}`} item={toMediaItem(item)} mediaType={item.mediaType} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="movies">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {movies.map((item) => (
                    <MediaCard key={`fav-movie-${item.id}`} item={toMediaItem(item)} mediaType="movie" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tv">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {tvShows.map((item) => (
                    <MediaCard key={`fav-tv-${item.id}`} item={toMediaItem(item)} mediaType="tv" />
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
