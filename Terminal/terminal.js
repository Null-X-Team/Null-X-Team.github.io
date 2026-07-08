(function runRealTerminalIntegration() {
    // Automatically locate the new embedded WebAssembly Linux container frame
    const terminalIframe = document.querySelector(".terminal-body-wrapper iframe");

    if (!terminalIframe) {
        console.log("[NxOS Kernel] WebAssembly container iframe not detected in DOM layout.");
        return;
    }

    console.log("[NxOS Kernel] WebAssembly Sandbox Subsystem linked successfully.");

    // Help the user by automatically focusing on the Linux shell when they click the terminal area
    document.querySelector(".terminal-view-container").addEventListener("click", () => {
        terminalIframe.focus();
    });
})();
