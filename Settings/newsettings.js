document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // 1. THEME CUSTOMIZATION
    // -------------------------
    const themeButtons = document.querySelectorAll(".theme-option");
    const savedTheme = localStorage.getItem("nxos_theme") || "crimson";
    
    // Apply saved theme locally on settings page
    document.body.setAttribute("data-theme", savedTheme);

    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }

        btn.addEventListener("click", () => {
            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedTheme = btn.dataset.theme;
            localStorage.setItem("nxos_theme", selectedTheme);
            document.body.setAttribute("data-theme", selectedTheme);
        });
    });

    // -------------------------
    // 2. CLOAKING SETTINGS
    // -------------------------
    const cloakSelect = document.getElementById("cloakSelect");
    if (cloakSelect) {
        cloakSelect.value = localStorage.getItem("nxos_cloak") || "none";
        cloakSelect.addEventListener("change", (e) => {
            localStorage.setItem("nxos_cloak", e.target.value);
        });
    }

    // -------------------------
    // 3. PANIC KEY BINDING
    // -------------------------
    const panicKeyInput = document.getElementById("panicKeyInput");
    const panicUrlInput = document.getElementById("panicUrlInput");

    // Load saved settings
    panicKeyInput.value = localStorage.getItem("nxos_panic_key") || "`"; // Default is backtick
    panicUrlInput.value = localStorage.getItem("nxos_panic_url") || "https://classroom.google.com";

    // Listen for custom key bind
    panicKeyInput.addEventListener("keydown", (e) => {
        e.preventDefault(); // Stop default typing
        const key = e.key;
        
        // Don't bind functional keys if alone
        if (key === "Escape" || key === "Shift" || key === "Control" || key === "Alt") {
            panicKeyInput.value = "Invalid Key";
            setTimeout(() => { panicKeyInput.value = localStorage.getItem("nxos_panic_key") || "`"; }, 1000);
            return;
        }

        panicKeyInput.value = key;
        localStorage.setItem("nxos_panic_key", key);
        panicKeyInput.blur(); // Remove focus
    });

    // Save URL when changed
    panicUrlInput.addEventListener("input", (e) => {
        localStorage.setItem("nxos_panic_url", e.target.value);
    });

    // -------------------------
    // 4. PERFORMANCE MODE
    // -------------------------
    const animToggle = document.getElementById("animToggle");
    const savedAnim = localStorage.getItem("nxos_animations");
    
    // Default to true if never set
    animToggle.checked = savedAnim !== "false"; 

    animToggle.addEventListener("change", (e) => {
        localStorage.setItem("nxos_animations", e.target.checked);
    });

    // -------------------------
    // 5. WIPE DATA
    // -------------------------
    const clearDataBtn = document.getElementById("clearDataBtn");
    clearDataBtn.addEventListener("click", () => {
        const confirmWipe = confirm("WARNING: This will delete ALL saved favorites, themes, and settings. Are you sure?");
        if (confirmWipe) {
            localStorage.clear();
            alert("System Data Cleared. Returning to default parameters.");
            window.location.reload();
        }
    });
});
