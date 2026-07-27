document.addEventListener("DOMContentLoaded", () => {
    const themeButtons = document.querySelectorAll(".theme-option");
    const cloakSelect = document.getElementById("cloakSelect");

    // 1. Load active theme from localStorage
    const savedTheme = localStorage.getItem("nxos_theme") || "crimson";
    
    // Highlight the saved theme button
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }

        // Handle selection click
        btn.addEventListener("click", () => {
            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedTheme = btn.dataset.theme;
            localStorage.setItem("nxos_theme", selectedTheme);

            // Apply theme dynamically to <body>
            document.body.setAttribute("data-theme", selectedTheme);
        });
    });

    // 2. Cloaking selector setup
    if (cloakSelect) {
        cloakSelect.value = localStorage.getItem("nxos_cloak") || "none";
        
        cloakSelect.addEventListener("change", (e) => {
            localStorage.setItem("nxos_cloak", e.target.value);
        });
    }
});
