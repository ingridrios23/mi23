// IMPORTANT: replace with your real keys before publishing
const TM_API_KEY = "YOUR_TICKETMASTER_KEY";
const MAPBOX_KEY = "YOUR_MAPBOX_KEY";

/**
 * Fetch events from Ticketmaster Discovery API
 * - keyword: search text
 * - size: number of results
 * - page: pagination page
 */
async function fetchTicketmasterEvents({ keyword = "", size = 20, page = 0, classificationName = "" } = {}) {
  try {
    const params = new URLSearchParams({
      apikey: TM_API_KEY,
      size,
      page,
      keyword,
      classificationName
    });
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ticketmaster error ${res.status}`);
    const data = await res.json();
    return data._embedded ? data._embedded.events : [];
  } catch (err) {
    console.error("fetchTicketmasterEvents:", err);
    return [];
  }
}

/**
 * Fetch single event by id (Ticketmaster)
 */
async function fetchTicketmasterEventById(id) {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${TM_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Event fetch failed');
    return await res.json();
  } catch (err) {
    console.error('fetchTicketmasterEventById', err);
    return null;
  }
}

/**
 * Geocode address using Mapbox
 */
async function geocodeAddress(address) {
  if (!MAPBOX_KEY) return null;
  const q = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${MAPBOX_KEY}&limit=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Mapbox geocode error');
    const data = await res.json();
    const feature = data.features && data.features[0];
    if (!feature) return null;
    return { lng: feature.center[0], lat: feature.center[1], place_name: feature.place_name };
  } catch (err) {
    console.error('geocodeAddress', err);
    return null;
  }
}
