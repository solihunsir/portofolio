export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Resolves an asset URL properly.
 * - If path starts with /uploads, prepends the backend API_BASE_URL
 * - If path starts with http/https, returns as is
 * - If path starts with /assets, returns as is (static asset in public folder)
 */
export function resolveAssetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads")) return `${API_BASE_URL}${path}`;
  return path;
}

/**
 * Common API request helper with error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  // Only set Content-Type to JSON if body is NOT FormData
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  let data = null;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = (data && data.error) || (data && data.message) || response.statusText || "Request failed";
    throw new Error(errorMsg);
  }

  return data;
}
