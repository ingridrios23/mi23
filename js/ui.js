/**
 * Select image for event
 */
export function getEventImage(event) {
  // If API provides images
  if (event.images && event.images.length > 0) {
    return event.images[0].url;
  }

  // Category-based fallback images
  const category = event.event_status || "default";

  const categoryImages = {
    music: "./assets/music.jpg",
    food: "./assets/food.jpg",
    sports: "./assets/sports.jpg",
    art: "./assets/art.jpg",
    tech: "./assets/tech.jpg",
    default: "./assets/default.jpg"
  };

  return categoryImages[category.toLowerCase()] || categoryImages.default;
}

/**
 * Render event cards
 */
export function renderEvents(events) {
  const container = document.querySelector("#eventsContainer");
  container.innerHTML = "";

  if (!events.length) {
    container.innerHTML = "<p>No events found</p>";
    return;
  }

  events.forEach(event => {
    const img = getEventImage(event);

    container.innerHTML += `
      <div class="card">
        <img src="${img}" class="card-img" alt="${event.name.fi || event.name.en}">
        <div class="card-body">
          <h3>${event.name.fi || event.name.en || "Untitled Event"}</h3>
          <p>${event.start_time?.substring(0, 10) || "No date"}</p>

          <button onclick="saveFavorite('${event.id}')" class="favorite-btn">
            ❤️ Add to favorites
          </button>
        </div>
      </div>
    `;
  });
}
