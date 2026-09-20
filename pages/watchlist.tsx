import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useWatchlist } from '@/hooks/useWatchlist';
import { MediaCard } from '@/components/media/MediaCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const movies = watchlist.filter((w) => w.mediaType === 'movie');
  const tvShows = watchlist.filter((w) => w.mediaType === 'tv');

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
                    <MediaCard key={`watch-${item.mediaType}-${item.id}`} item={item as any} mediaType={item.mediaType} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="movies">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {movies.map((item) => (
                    <MediaCard key={`watch-movie-${item.id}`} item={item as any} mediaType="movie" />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tv">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                  {tvShows.map((item) => (
                    <MediaCard key={`watch-tv-${item.id}`} item={item as any} mediaType="tv" />
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
