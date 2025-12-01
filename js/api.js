// OPEN EVENTS API (NO API KEY REQUIRED)
export const API_URL = "https://api.hel.fi/linkedevents/v1/event/";

/**
 * Fetch events from public API
 */
export async function fetchEvents(keyword = "") {
  try {
    const url = keyword
      ? `${API_URL}?text=${encodeURIComponent(keyword)}`
      : API_URL;

    const response = await fetch(url);
    const data = await response.json();

    return data.data || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
