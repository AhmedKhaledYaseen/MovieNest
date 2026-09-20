import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useSearch } from '@/hooks/useSearch';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const router = useRouter();
  
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'multi' | 'movie' | 'tv' | 'person'>('multi');
  const [page, setPage] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const qQuery = (router.query.q as string) || '';
      const qType = (router.query.type as 'multi' | 'movie' | 'tv' | 'person') || 'multi';
      const qPage = Number(router.query.page) || 1;
      
      setQuery(qQuery);
      setType(['multi', 'movie', 'tv', 'person'].includes(qType) ? qType : 'multi');
      setPage(qPage);
      setIsReady(true);
    }
  }, [router.isReady, router.query]);

  const updateUrl = (newQuery: string, newType: string, newPage: number) => {
    const queryObj: Record<string, string | number> = {};
    if (newQuery) queryObj.q = newQuery;
    if (newType !== 'multi') queryObj.type = newType;
    if (newPage > 1) queryObj.page = newPage;
    
    router.push({
      pathname: '/search',
      query: queryObj
    }, undefined, { shallow: true });
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
    updateUrl(q, type, 1);
  };

  const handleTypeChange = (t: 'multi' | 'movie' | 'tv' | 'person') => {
    setType(t);
    setPage(1);
    updateUrl(query, t, 1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    updateUrl(query, type, p);
  };

  const { 
    data: searchData, 
    isLoading, 
    isError,
    refetch
  } = useSearch(query, type, page);

  const hasSearched = query.trim().length > 0;
  const isFetching = !isReady || (hasSearched && isLoading);

  return (
    <Layout>
      <Head>
        <title>Search — MovieNest</title>
        <meta name="description" content="Search for movies, TV shows, and people on MovieNest." />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 min-h-[80vh]">
        <div className="mb-8">
          <SearchBar 
            initialValue={query}
            onSearch={handleSearch}
            autoFocus
          />
        </div>

        {hasSearched && (
          <SearchFilters 
            selectedType={type} 
            onTypeChange={handleTypeChange} 
          />
        )}

        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
            <h2 className="text-2xl font-semibold mb-2">Find your next favorite</h2>
            <p className="text-muted-foreground">Search by title, character, or genre.</p>
          </div>
        ) : isError ? (
          <ErrorState message="Failed to load search results." onRetry={() => refetch()} />
        ) : !isLoading && searchData?.results?.length === 0 ? (
          <EmptyState 
            title="No matches found" 
            description={`We couldn't find anything matching "${query}". Try different keywords or adjust your filters.`} 
          />
        ) : (
          <>
            <SearchResults 
              items={searchData?.results} 
              isLoading={isFetching}
            />
            
            {searchData && searchData.total_pages > 1 && (
              <Pagination 
                currentPage={searchData.page} 
                totalPages={searchData.total_pages} 
                onPageChange={handlePageChange} 
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
