import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { MediaDetails } from '@/components/media/MediaDetails';
import { MediaRow } from '@/components/media/MediaRow';
import { PersonRow } from '@/components/people/PersonRow';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { Person } from '@/types';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
  useMovieRecommendations
} from '@/hooks/useMovies';

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const movieId = id as string;

  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similar, isLoading: isSimilarLoading } = useSimilarMovies(movieId);
  const { data: recommendations, isLoading: isRecommendationsLoading } = useMovieRecommendations(movieId);

  if (isMovieError) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <ErrorState message="Movie not found or failed to load." onRetry={() => router.push('/movies')} />
        </div>
      </Layout>
    );
  }

  if (isMovieLoading || !movie) {
    return (
      <Layout>
        <div className="w-full min-h-[80vh]">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
      </Layout>
    );
  }

  const trailer = videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const trailerKey = trailer?.key;

  const cast = credits?.cast.slice(0, 10) || [];
  const title = `${movie.title} — MovieNest`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={movie.overview ?? `Details about ${movie.title}`} />
      </Head>

      <MediaDetails 
        item={movie} 
        mediaType="movie" 
        trailerKey={trailerKey} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {cast.length > 0 && (
          <PersonRow title="Top Cast" items={cast.map((person) => ({
            id: person.id,
            name: person.name,
            profile_path: person.profile_path,
            known_for_department: person.character, 
          } as Person))} />
        )}

        {similar?.results && similar.results.length > 0 && (
          <MediaRow
            title="Similar Movies"
            items={similar.results}
            mediaType="movie"
            isLoading={isSimilarLoading}
          />
        )}

        {recommendations?.results && recommendations.results.length > 0 && (
          <MediaRow
            title="Recommendations"
            items={recommendations.results}
            mediaType="movie"
            isLoading={isRecommendationsLoading}
          />
        )}
      </div>
    </Layout>
  );
}
