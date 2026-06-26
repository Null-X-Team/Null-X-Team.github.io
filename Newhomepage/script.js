document.addEventListener("DOMContentLoaded", () => {
  // 1. NAVIGATION TAB SWITCHING
  const navTabs = document.querySelectorAll(".nav-tab-item");

  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      // Prevent default jump behavior if href is "#"
      if (tab.getAttribute("href") === "#") {
        e.preventDefault();
      }

      // Remove the active class from whichever tab currently has it
      document.querySelector(".nav-tab-item.active")?.classList.remove("active");

      // Add the active class to the clicked tab
      tab.classList.add("active");
    });
  });

  // 2. LIVE SEARCH FILTER FOR THE GAMES GRID
  const searchInput = document.querySelector(".search-container input");
  const appCards = document.querySelectorAll(".app-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      appCards.forEach(card => {
        const labelText = card.querySelector(".app-label").textContent.toLowerCase();

        // If the card label matches the search term (or search is empty), show it. Otherwise, hide it.
        if (labelText.includes(searchTerm)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});
