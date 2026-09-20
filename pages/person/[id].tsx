import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { getProfileUrl } from '@/utils/tmdb';
import { usePersonDetails } from '@/hooks/usePerson';
import { MediaRow } from '@/components/media/MediaRow';

export default function PersonDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const personId = id as string;

  const { data: person, isLoading, isError } = usePersonDetails(personId);

  if (isError) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <ErrorState message="Person not found or failed to load." onRetry={() => router.back()} />
        </div>
      </Layout>
    );
  }

  if (isLoading || !person) {
    return (
      <Layout>
        <div className="w-full min-h-[80vh] pt-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex flex-col md:flex-row gap-8">
            <Skeleton className="w-64 h-96 rounded-xl shrink-0 mx-auto md:mx-0" />
            <div className="flex-1 space-y-4 w-full">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const title = `${person.name} — MovieNest`;
  const knownFor = [...(person.combined_credits?.cast || []), ...(person.combined_credits?.crew || [])]
    .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
    .slice(0, 20);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={person.biography?.substring(0, 160) || `Learn more about ${person.name}`} />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <div className="w-64 sm:w-72 shrink-0 mx-auto md:mx-0 space-y-6">
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={getProfileUrl(person.profile_path, 'h632')}
                fallbackSrc="/images/placeholder-profile.svg"
                alt={person.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-xl font-bold">Personal Info</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">Known For</h3>
                  <p className="text-muted-foreground text-sm">{person.known_for_department}</p>
                </div>
                
                {person.gender > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm">Gender</h3>
                    <p className="text-muted-foreground text-sm">
                      {person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Non-binary'}
                    </p>
                  </div>
                )}
                
                {person.birthday && (
                  <div>
                    <h3 className="font-semibold text-sm">Birthday</h3>
                    <p className="text-muted-foreground text-sm">{person.birthday}</p>
                  </div>
                )}
                
                {person.deathday && (
                  <div>
                    <h3 className="font-semibold text-sm">Day of Death</h3>
                    <p className="text-muted-foreground text-sm">{person.deathday}</p>
                  </div>
                )}
                
                {person.place_of_birth && (
                  <div>
                    <h3 className="font-semibold text-sm">Place of Birth</h3>
                    <p className="text-muted-foreground text-sm">{person.place_of_birth}</p>
                  </div>
                )}

                {person.also_known_as?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm">Also Known As</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      {person.also_known_as.map((name, i) => (
                        <p key={i} className="text-muted-foreground text-sm">{name}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
              {person.name}
            </h1>
            
            {person.biography && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Biography</h2>
                <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {person.biography}
                </div>
              </div>
            )}
            
            {knownFor.length > 0 && (
              <div className="pt-4">
                <MediaRow
                  title="Known For"
                  items={knownFor as any[]}
                  isLoading={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
