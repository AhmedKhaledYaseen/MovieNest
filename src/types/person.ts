import { CombinedCreditsResponse } from "./common";

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  media_type: "person";
}

export interface PersonDetails extends Person {
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  also_known_as: string[];
  homepage: string | null;
  gender: number;
  combined_credits?: CombinedCreditsResponse;
}
