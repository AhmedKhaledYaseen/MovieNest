import { TMDB_IMAGE_BASE_URL } from "./constants";

export type PosterSize = "w342" | "w500" | "original";
export type BackdropSize = "w780" | "w1280" | "original";
export type ProfileSize = "w185" | "h632" | "original";

export function getPosterUrl(path: string | null, size: PosterSize = "w500"): string {
  if (!path) return "/images/placeholder-poster.svg";
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: BackdropSize = "w1280"): string {
  if (!path) return "/images/placeholder-backdrop.svg";
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}

export function getProfileUrl(path: string | null, size: ProfileSize = "w185"): string {
  if (!path) return "/images/placeholder-profile.svg";
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
}
