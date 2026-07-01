document.addEventListener("DOMContentLoaded", () => {
  // Tab switching
  const navTabs = document.querySelectorAll(".nav-tab-item");
  const contentSections = document.querySelectorAll(".content-section");

  navTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active from all tabs
      navTabs.forEach(t => t.classList.remove("active"));
      // Add active to clicked
      tab.classList.add("active");

      const targetTab = tab.getAttribute("data-tab");

      // Hide all sections
      contentSections.forEach(section => {
        section.classList.remove("active");
      });

      // Show target section
      const targetSection = document.getElementById(targetTab + "-section");
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const appCards = document.querySelectorAll(".app-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      appCards.forEach(card => {
        const labelText = card.querySelector(".app-label").textContent.toLowerCase();
        if (labelText.includes(searchTerm) || searchTerm === "") {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Make some app cards clickable for demo
  document.querySelectorAll('.app-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      alert('Game would launch here! (Integration with main.js coming soon)');
    });
  });
});