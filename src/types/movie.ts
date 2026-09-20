import { Genre, ProductionCompany, SpokenLanguage } from "./common";

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres: Genre[];
  adult: boolean;
  media_type: "movie";
}

export interface MovieDetails extends Movie {
  tagline: string | null;
  runtime: number | null;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  homepage: string | null;
}
