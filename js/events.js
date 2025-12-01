import { fetchEvents } from "./api.js";
import { getEventImage } from "./ui.js";

async function loadEventDetail() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");

  if (!eventId) return;

  const events = await fetchEvents();
  const event = events.find(e => e.id === eventId);

  const container = document.querySelector("#eventDetail");

  if (!event) {
    container.innerHTML = "<p>Event not found.</p>";
    return;
  }

  const img = getEventImage(event);

  container.innerHTML = `
    <div class="event-detail">
      <img src="${img}" class="detail-img" />

      <h2>${event.name.fi || event.name.en}</h2>
      <p><strong>Date:</strong> ${event.start_time?.substring(0, 10)}</p>
      <p><strong>Description:</strong> ${event.description?.intro || "No description available."}</p>

      <button onclick="saveFavorite('${event.id}')" class="favorite-btn">
        ❤️ Add to favorites
      </button>
    </div>
  `;
}

window.saveFavorite = function (id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Added to favorites!");
  }
};

document.addEventListener("DOMContentLoaded", loadEventDetail);
