import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  selectedType: 'multi' | 'movie' | 'tv' | 'person';
  onTypeChange: (type: 'multi' | 'movie' | 'tv' | 'person') => void;
}

const FILTERS: { label: string; value: 'multi' | 'movie' | 'tv' | 'person' }[] = [
  { label: 'All', value: 'multi' },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
  { label: 'People', value: 'person' },
];

export function SearchFilters({ selectedType, onTypeChange }: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedType === filter.value ? 'default' : 'outline'}
          className={cn("rounded-full", selectedType === filter.value && "pointer-events-none")}
          onClick={() => onTypeChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
