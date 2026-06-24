document.addEventListener("DOMContentLoaded", () => {
    // 1. Find all deploy cards containing our unblocker targets
    const deployButtons = document.querySelectorAll(".unblocker-card");
    const mainChatArea = document.querySelector(".main-chat");

    deployButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // 2. Read the dynamic path directly from the card's data attribute
            const localInstancePath = button.getAttribute("data-path"); 

            if (!localInstancePath) {
                console.error("No deployment path specified for this card.");
                return;
            }

            if (!mainChatArea) {
                console.error("Main content container not found.");
                return;
            }

            // 3. Clear out the current view area to make room for the instance window
            mainChatArea.innerHTML = "";

            // 4. Dynamically generate a fullscreen iframe window to run the target code
            const iframe = document.createElement("iframe");
            iframe.src = localInstancePath;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.backgroundColor = "#140f0d"; // Matches your dark theme background
            iframe.allow = "fullscreen";

            // 5. Append it to the page to launch the code instantly!
            mainChatArea.appendChild(iframe);
            console.log(`Instance deployed locally from repository code: ${localInstancePath}`);
        });
    });
});
