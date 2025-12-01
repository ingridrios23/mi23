import { fetchEvents } from "./api.js";
import { renderEvents } from "./ui.js";

/**
 * Load favorite events
 */
async function loadFavorites() {
  const favIds = JSON.parse(localStorage.getItem("favorites")) || [];

  // No favorites saved
  if (favIds.length === 0) {
    document.querySelector("#favoritesContainer").innerHTML =
      "<p>No favorites yet ❤️</p>";
    return;
  }

  // Fetch all events from the API
  const events = await fetchEvents("");

  // Filter only favorites
  const favoriteEvents = events.filter(ev => favIds.includes(ev.id));

  // Render them
  renderFavoriteEvents(favoriteEvents);
}

/**
 * Render cards into the favorites container
 */
function renderFavoriteEvents(events) {
  const container = document.querySelector("#favoritesContainer");
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>No favorites found.</p>";
    return;
  }

  events.forEach(event => {
    const img = event.images?.[0]?.url || "./assets/default.jpg";

    container.innerHTML += `
      <div class="card">
        <img src="${img}" class="card-img" alt="${event.name.fi || event.name.en}">
        
        <div class="card-body">
          <h3>${event.name.fi || event.name.en || "Untitled Event"}</h3>
          <p>${event.start_time?.substring(0, 10) || "No date"}</p>

          <button onclick="removeFavorite('${event.id}')" class="favorite-btn">
            ❌ Remove
          </button>
        </div>
      </div>
    `;
  });
}

/**
 * Remove favorite
 */
window.removeFavorite = function (id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs = favs.filter(f => f !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
  location.reload();
};

// Initialize
document.addEventListener("DOMContentLoaded", loadFavorites);
