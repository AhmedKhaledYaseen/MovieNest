export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export class TMDBError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "TMDBError";
    this.status = status;
  }
}

export async function get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new ConfigurationError("TMDB_API_KEY is not configured. Add it to .env.local");
  }

  const searchParams = new URLSearchParams(params);
  searchParams.append("api_key", apiKey);
  const queryString = searchParams.toString();
  
  const url = `https://api.themoviedb.org/3${endpoint}?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
  });

  if (!response.ok) {
    let message = "TMDB API request failed";
    try {
      const data = await response.json();
      if (data.status_message) {
        message = data.status_message;
      }
    } catch {
      // Ignore JSON parse error on failure
    }
    throw new TMDBError(response.status, message);
  }

  return response.json();
}
