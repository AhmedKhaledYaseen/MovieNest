import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { MediaDetails } from '@/components/media/MediaDetails';
import { MediaRow } from '@/components/media/MediaRow';
import { PersonRow } from '@/components/people/PersonRow';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { Person } from '@/types';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { getPosterUrl } from '@/utils/tmdb';
import { getYear } from '@/utils/date';
import {
  useTVShowDetails,
  useTVShowCredits,
  useTVShowVideos,
  useSimilarTVShows,
  useTVShowRecommendations
} from '@/hooks/useTVShows';
import { Card, CardContent } from '@/components/ui/card';

export default function TVShowDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const tvId = id as string;

  const { data: tvShow, isLoading: isTVLoading, isError: isTVError } = useTVShowDetails(tvId);
  const { data: credits } = useTVShowCredits(tvId);
  const { data: videos } = useTVShowVideos(tvId);
  const { data: similar, isLoading: isSimilarLoading } = useSimilarTVShows(tvId);
  const { data: recommendations, isLoading: isRecommendationsLoading } = useTVShowRecommendations(tvId);

  if (isTVError) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <ErrorState message="TV show not found or failed to load." onRetry={() => router.push('/tv')} />
        </div>
      </Layout>
    );
  }

  if (isTVLoading || !tvShow) {
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
  const title = `${tvShow.name} — MovieNest`;
  const seasons = (tvShow.seasons || []).filter(season => !!season.poster_path);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={tvShow.overview ?? `Details about ${tvShow.name}`} />
      </Head>

      <MediaDetails 
        item={tvShow} 
        mediaType="tv" 
        trailerKey={trailerKey} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {seasons.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Seasons</h2>
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {seasons.map((season) => (
                <Card key={season.id} className="flex-none w-[140px] sm:w-[160px] md:w-[200px] snap-start overflow-hidden border-0 bg-transparent shadow-none">
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-muted mb-3">
                      <ImageWithFallback
                        src={getPosterUrl(season.poster_path)}
                        fallbackSrc="/images/placeholder-poster.svg"
                        alt={season.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm md:text-base truncate">{season.name}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{getYear(season.air_date)}</span>
                        <span>{season.episode_count} Episodes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

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
            title="Similar TV Shows"
            items={similar.results}
            mediaType="tv"
            isLoading={isSimilarLoading}
          />
        )}

        {recommendations?.results && recommendations.results.length > 0 && (
          <MediaRow
            title="Recommendations"
            items={recommendations.results}
            mediaType="tv"
            isLoading={isRecommendationsLoading}
          />
        )}
      </div>
    </Layout>
  );
}
