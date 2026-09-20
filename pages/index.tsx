import Head from 'next/head';
import { HeroSection } from '@/components/layout/HeroSection';
import { MediaRow } from '@/components/media/MediaRow';
import { Layout } from '@/components/layout/Layout';
import { 
  useTrendingMovies, 
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies
} from '@/hooks/useMovies';
import { 
  useTrendingTVShows,
  usePopularTVShows,
  useTopRatedTVShows
} from '@/hooks/useTVShows';

export default function Home() {
  const { data: trendingMovies, isLoading: isTrendingMoviesLoading } = useTrendingMovies();
  const { data: popularMovies, isLoading: isPopularMoviesLoading } = usePopularMovies();
  const { data: topRatedMovies, isLoading: isTopRatedMoviesLoading } = useTopRatedMovies();
  const { data: upcomingMovies, isLoading: isUpcomingMoviesLoading } = useUpcomingMovies();

  const { data: trendingTVShows, isLoading: isTrendingTVLoading } = useTrendingTVShows();
  const { data: popularTVShows, isLoading: isPopularTVLoading } = usePopularTVShows();
  const { data: topRatedTVShows, isLoading: isTopRatedTVLoading } = useTopRatedTVShows();

  const heroItem = trendingMovies?.results?.[0];

  return (
    <Layout>
      <Head>
        <title>MovieNest</title>
        <meta name="description" content="Your ultimate destination for movies and TV shows." />
      </Head>

      <HeroSection item={heroItem} isLoading={isTrendingMoviesLoading} mediaType="movie" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 overflow-hidden">
        <MediaRow 
          title="Trending Movies"
          items={trendingMovies?.results?.slice(1)} 
          isLoading={isTrendingMoviesLoading} 
          mediaType="movie" 
        />
        
        <MediaRow 
          title="Trending TV Shows"
          items={trendingTVShows?.results} 
          isLoading={isTrendingTVLoading} 
          mediaType="tv" 
        />

        <MediaRow 
          title="Popular Movies"
          items={popularMovies?.results} 
          isLoading={isPopularMoviesLoading} 
          mediaType="movie" 
        />

        <MediaRow 
          title="Popular TV Shows"
          items={popularTVShows?.results} 
          isLoading={isPopularTVLoading} 
          mediaType="tv" 
        />

        <MediaRow 
          title="Upcoming Movies"
          items={upcomingMovies?.results} 
          isLoading={isUpcomingMoviesLoading} 
          mediaType="movie" 
        />

        <MediaRow 
          title="Top Rated Movies"
          items={topRatedMovies?.results} 
          isLoading={isTopRatedMoviesLoading} 
          mediaType="movie" 
        />

        <MediaRow 
          title="Top Rated TV Shows"
          items={topRatedTVShows?.results} 
          isLoading={isTopRatedTVLoading} 
          mediaType="tv" 
        />
      </div>
    </Layout>
  );
}
