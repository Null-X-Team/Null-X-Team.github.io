document.addEventListener("DOMContentLoaded", () => {
    // 1. Find all deployment cards or launch buttons
    // Change '.unblocker-card' to match whatever class your HTML uses for the buttons/cards
    const cards = document.querySelectorAll(".unblocker-card, .deploy-btn");

    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();

            // 2. Get the target link or deployment URL from a data attribute or href
            const targetUrl = card.getAttribute("data-url") || card.getAttribute("href");

            if (!targetUrl || targetUrl === "#") {
                console.warn("No deployment URL found for this instance.");
                alert("This deployment instance is currently offline or missing a configuration link.");
                return;
            }

            console.log(`Launching deployment instance: ${targetUrl}`);

            // 3. Open the instance safely in a new clean tab
            window.open(targetUrl, "_blank");
        });
    });
});
