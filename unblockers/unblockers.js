// Global function to deploy whichever proxy instance path is sent to it
window.launchInstance = function(instancePath) {
    const mainChatArea = document.querySelector(".main-chat");

    if (!mainChatArea) {
        console.error("Main dashboard content area container '.main-chat' not found.");
        return;
    }

    // Clear the center main panel
    mainChatArea.innerHTML = "";

    // Build out the sandbox frame container viewport
    const iframe = document.createElement("iframe");
    iframe.src = instancePath;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.backgroundColor = "#140f0d"; // Perfect match to your custom dark layout theme
    iframe.style.borderRadius = "8px";
    iframe.allow = "fullscreen";

    // Inject instance instantly
    mainChatArea.appendChild(iframe);
    console.log(`Successfully spawned dynamic view layer: ${instancePath}`);
};
