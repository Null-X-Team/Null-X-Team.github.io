document.addEventListener("DOMContentLoaded", () => {
    const THEME_KEY = "nxos_theme";
    const INTERACTIVE_BG_KEY = "nxos_interactive_bg";
    const BG_IMAGE_KEY = "nxos_bg_image";
    const THEME_BG_KEY = "nxos_theme_bg";
    const THEME_ACCENT_KEY = "nxos_theme_accent";

    // 1. THEME CUSTOMIZATION
    const themeButtons = document.querySelectorAll(".theme-option");
    const savedTheme = localStorage.getItem(THEME_KEY) || "crimson";

    document.body.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    themeButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.theme === savedTheme);

        btn.addEventListener("click", () => {
            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedTheme = btn.dataset.theme;
            const bg = btn.dataset.bg || "";
            const accent = btn.dataset.accent || "";

            localStorage.setItem(THEME_KEY, selectedTheme);
            if (bg) localStorage.setItem(THEME_BG_KEY, bg);
            if (accent) localStorage.setItem(THEME_ACCENT_KEY, accent);

            document.body.setAttribute("data-theme", selectedTheme);
            document.documentElement.setAttribute("data-theme", selectedTheme);
            if (bg) document.body.style.setProperty("--nx-page-bg", bg);
            if (accent) document.body.style.setProperty("--nx-accent", accent);
        });
    });

    const storedBg = localStorage.getItem(THEME_BG_KEY);
    const storedAccent = localStorage.getItem(THEME_ACCENT_KEY);
    if (storedBg) document.body.style.setProperty("--nx-page-bg", storedBg);
    if (storedAccent) document.body.style.setProperty("--nx-accent", storedAccent);

    // 2. INTERACTIVE BACKGROUND
    const interactiveToggle = document.getElementById("interactiveBgToggle");
    if (interactiveToggle) {
        const enabled = localStorage.getItem(INTERACTIVE_BG_KEY);
        interactiveToggle.checked = enabled === null ? true : enabled === "true";
        interactiveToggle.addEventListener("change", () => {
            localStorage.setItem(INTERACTIVE_BG_KEY, interactiveToggle.checked ? "true" : "false");
        });
    }

    // 3. CUSTOM BACKGROUND IMAGE
    const bgInput = document.getElementById("bgImageInput");
    const clearBgBtn = document.getElementById("clearBgImageBtn");
    const preview = document.getElementById("bgImagePreview");

    function showPreview(dataUrl) {
        if (!preview) return;
        if (dataUrl) {
            preview.classList.remove("hidden");
            preview.style.backgroundImage = "url(" + dataUrl + ")";
        } else {
            preview.classList.add("hidden");
            preview.style.backgroundImage = "";
        }
    }

    const existingBg = localStorage.getItem(BG_IMAGE_KEY);
    if (existingBg) showPreview(existingBg);

    if (bgInput) {
        bgInput.addEventListener("change", () => {
            const file = bgInput.files && bgInput.files[0];
            if (!file) return;
            if (!file.type.startsWith("image/")) {
                alert("Please choose an image file.");
                return;
            }
            if (file.size > 2.5 * 1024 * 1024) {
                alert("Image is too large (max about 2.5 MB). Try a smaller file.");
                bgInput.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;
                try {
                    localStorage.setItem(BG_IMAGE_KEY, dataUrl);
                    showPreview(dataUrl);
                } catch (err) {
                    alert("Could not save image (storage full). Try a smaller image.");
                }
            };
            reader.readAsDataURL(file);
        });
    }

    if (clearBgBtn) {
        clearBgBtn.addEventListener("click", () => {
            localStorage.removeItem(BG_IMAGE_KEY);
            if (bgInput) bgInput.value = "";
            showPreview(null);
        });
    }

    // 4. CLOAKING
    const cloakSelect = document.getElementById("cloakSelect");
    if (cloakSelect) {
        cloakSelect.value = localStorage.getItem("nxos_cloak") || "none";
        cloakSelect.addEventListener("change", (e) => {
            localStorage.setItem("nxos_cloak", e.target.value);
        });
    }

    // 5. PANIC KEY
    const panicKeyInput = document.getElementById("panicKeyInput");
    const panicUrlInput = document.getElementById("panicUrlInput");

    if (panicKeyInput) {
        panicKeyInput.value = localStorage.getItem("nxos_panic_key") || "`";
        panicKeyInput.addEventListener("keydown", (e) => {
            e.preventDefault();
            const key = e.key;
            if (key === "Escape" || key === "Shift" || key === "Control" || key === "Alt") {
                panicKeyInput.value = "Invalid Key";
                setTimeout(() => {
                    panicKeyInput.value = localStorage.getItem("nxos_panic_key") || "`";
                }, 1000);
                return;
            }
            panicKeyInput.value = key;
            localStorage.setItem("nxos_panic_key", key);
            panicKeyInput.blur();
        });
    }

    if (panicUrlInput) {
        panicUrlInput.value = localStorage.getItem("nxos_panic_url") || "https://classroom.google.com";
        panicUrlInput.addEventListener("change", () => {
            localStorage.setItem("nxos_panic_url", panicUrlInput.value.trim());
        });
    }

    // 6. UI ANIMATIONS
    const animToggle = document.getElementById("animToggle");
    if (animToggle) {
        const anim = localStorage.getItem("nxos_ui_anim");
        animToggle.checked = anim === null ? true : anim === "true";
        animToggle.addEventListener("change", () => {
            localStorage.setItem("nxos_ui_anim", animToggle.checked ? "true" : "false");
            document.body.classList.toggle("no-ui-anim", !animToggle.checked);
        });
        document.body.classList.toggle("no-ui-anim", !animToggle.checked);
    }

    // 7. CLEAR DATA
    const clearBtn = document.getElementById("clearDataBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (!confirm("Wipe ALL local data for this site? This cannot be undone.")) return;
            localStorage.clear();
            sessionStorage.clear();
            alert("Local data cleared. Reloading…");
            location.reload();
        });
    }
});
