import { fetchEvents } from "./api.js";
import { renderEvents } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();

  document.querySelector("#searchBtn").addEventListener("click", () => {
    const keyword = document.querySelector("#searchInput").value.trim();
    loadEvents(keyword);
  });
});

/**
 * Load and display events
 */
async function loadEvents(keyword = "") {
  const events = await fetchEvents(keyword);
  renderEvents(events);
}

/**
 * Save event to favorites
 */
window.saveFavorite = function (id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Added to favorites!");
  }
};
