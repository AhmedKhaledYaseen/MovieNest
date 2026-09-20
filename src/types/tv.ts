import { Genre, Network, Season, Creator } from "./common";

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  genres: Genre[];
  media_type: "tv";
}

export interface TVShowDetails extends TVShow {
  last_air_date: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  networks: Network[];
  seasons: Season[];
  tagline: string | null;
  created_by: Creator[];
  episode_run_time: number[];
}
