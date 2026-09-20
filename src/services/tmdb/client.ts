export class APIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function get<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let message = "API request failed";
    try {
      const data = await response.json();
      if (data.message) {
        message = data.message;
      } else if (data.error) {
        message = data.error;
      }
    } catch {
      // Ignore JSON parse error on failure
    }
    throw new APIError(response.status, message);
  }

  return response.json();
}
