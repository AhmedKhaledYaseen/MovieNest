import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { MediaGrid } from '@/components/media/MediaGrid';
import { MediaFilters } from '@/components/media/MediaFilters';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useDiscoverTVShows } from '@/hooks/useTVShows';
import { useTVGenres } from '@/hooks/useGenres';
import { useEffect, useState } from 'react';

export default function TVShowsPage() {
  const router = useRouter();
  
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState<number | undefined>();
  const [sort, setSort] = useState('popularity.desc');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const qPage = Number(router.query.page) || 1;
      const qGenre = router.query.genre ? Number(router.query.genre) : undefined;
      const qSort = (router.query.sort as string) || 'popularity.desc';
      
      setPage(qPage);
      setGenre(qGenre);
      setSort(qSort);
      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  const updateUrl = (newPage: number, newGenre?: number, newSort?: string) => {
    const query: Record<string, string | number> = {};
    if (newPage > 1) query.page = newPage;
    if (newGenre) query.genre = newGenre;
    if (newSort && newSort !== 'popularity.desc') query.sort = newSort;
    
    router.push({
      pathname: '/tv',
      query
    }, undefined, { shallow: true });
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    updateUrl(p, genre, sort);
  };

  const handleGenreChange = (g?: number) => {
    setGenre(g);
    setPage(1);
    updateUrl(1, g, sort);
  };

  const handleSortChange = (s: string) => {
    setSort(s);
    setPage(1);
    updateUrl(1, genre, s);
  };

  const handleReset = () => {
    setGenre(undefined);
    setSort('popularity.desc');
    setPage(1);
    updateUrl(1, undefined, 'popularity.desc');
  };

  const { data: genresData } = useTVGenres();
  
  const { 
    data: tvData, 
    isLoading, 
    isError, 
    refetch 
  } = useDiscoverTVShows({
    page,
    genre,
    sort,
  });

  return (
    <Layout>
      <Head>
        <title>Browse TV Shows — MovieNest</title>
        <meta name="description" content="Browse and discover TV shows on MovieNest." />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-[80vh]">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">TV Shows</h1>
        
        <MediaFilters 
          genres={genresData?.genres || []}
          selectedGenre={genre}
          selectedSort={sort}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          onReset={handleReset}
          isLoading={!isReady || isLoading}
        />

        {isError ? (
          <ErrorState message="Failed to load TV shows. Please try again later." onRetry={() => refetch()} />
        ) : !isLoading && tvData?.results?.length === 0 ? (
          <EmptyState onAction={handleReset} actionLabel="Clear Filters" />
        ) : (
          <>
            <MediaGrid 
              items={tvData?.results} 
              isLoading={!isReady || isLoading} 
              skeletonCount={20}
              mediaType="tv" 
            />
            
            {tvData && tvData.total_pages > 1 && (
              <Pagination 
                currentPage={tvData.page} 
                totalPages={tvData.total_pages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
