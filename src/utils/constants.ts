export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const STORAGE_KEYS = {
  USERS: "movienest_users",
  AUTH: "movienest_auth",
  FAVORITES_PREFIX: "movienest_favorites_",
  WATCHLIST_PREFIX: "movienest_watchlist_",
};

export const STALE_TIMES = {
  SHORT: 5 * 60 * 1000, // 5 min
  MEDIUM: 10 * 60 * 1000, // 10 min
  LONG: 30 * 60 * 1000, // 30 min
  DAY: 24 * 60 * 60 * 1000, // 24 hours
};

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
};
