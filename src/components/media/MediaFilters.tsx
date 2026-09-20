import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Genre } from "@/types";

interface MediaFiltersProps {
  genres: Genre[];
  selectedGenre?: number;
  selectedSort: string;
  onGenreChange: (genreId?: number) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const SORT_OPTIONS = [
  { label: "Most Popular", value: "popularity.desc" },
  { label: "Least Popular", value: "popularity.asc" },
  { label: "Highest Rated", value: "vote_average.desc" },
  { label: "Lowest Rated", value: "vote_average.asc" },
  { label: "Newest First", value: "primary_release_date.desc" },
  { label: "Oldest First", value: "primary_release_date.asc" },
];

export function MediaFilters({
  genres,
  selectedGenre,
  selectedSort,
  onGenreChange,
  onSortChange,
  onReset,
  isLoading
}: MediaFiltersProps) {
  const isFiltered = selectedGenre !== undefined || selectedSort !== "popularity.desc";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
      <Select 
        value={selectedGenre?.toString() || "all"} 
        onValueChange={(val: string) => onGenreChange(val === "all" ? undefined : parseInt(val, 10))}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedSort} 
        onValueChange={onSortChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button 
          variant="ghost" 
          onClick={onReset} 
          disabled={isLoading}
          className="w-full sm:w-auto mt-2 sm:mt-0"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
