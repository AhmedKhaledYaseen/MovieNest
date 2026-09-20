import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProfileUrl } from '@/utils/tmdb';
import { Person } from '@/types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link href={`/person/${person.id}`} className="group block">
      <Card className="overflow-hidden border-0 bg-transparent shadow-none transition-transform duration-300 hover:scale-[1.03]">
        <CardContent className="p-0 relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-muted">
          <ImageWithFallback
            src={getProfileUrl(person.profile_path)}
            fallbackSrc="/images/placeholder-profile.svg"
            alt={person.name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 15vw"
            className="object-cover"
          />
        </CardContent>
        <div className="mt-3 space-y-1 text-center">
          <h3 className="font-semibold truncate text-sm md:text-base text-foreground" title={person.name}>
            {person.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{person.known_for_department}</p>
        </div>
      </Card>
    </Link>
  );
}

export function PersonCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="space-y-1.5 flex flex-col items-center">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
