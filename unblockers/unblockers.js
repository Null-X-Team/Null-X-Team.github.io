document.addEventListener("DOMContentLoaded", () => {
    // 1. Find all deploy buttons or cards
    const deployButtons = document.querySelectorAll(".deploy-btn, .unblocker-card");
    const mainChatArea = document.querySelector(".main-chat");

    deployButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // 2. Point this to the local path of your Nautilus folder inside your repository
            // If your file is named index.html inside a 'nautilus' folder, use 'nautilus/index.html'
            const localInstancePath = "unblockers/NautilusOS/index.html"; 

            if (!mainChatArea) {
                console.error("Main content container not found.");
                return;
            }

            // 3. Clear out the current view area to make room for the instance window
            mainChatArea.innerHTML = "";

            // 4. Dynamically generate a fullscreen iframe window to run your repo's proxy code
            const iframe = document.createElement("iframe");
            iframe.src = localInstancePath;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.backgroundColor = "#140f0d"; // Matches your dark theme background
            iframe.allow = "fullscreen";

            // 5. Append it to the page to launch the code instantly!
            mainChatArea.appendChild(iframe);
            console.log("Nautilus instance deployed locally from repository code.");
        });
    });
});
