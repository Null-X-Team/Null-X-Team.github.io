(async function launchNativeLinuxWasm() {
    const statusMsg = document.getElementById("boot-status-msg");
    const container = document.getElementById("linux-terminal-container");
    const preElement = container ? container.querySelector("pre") : null;

    if (!container || !preElement) return;

    // Dynamically inject the v86 emulator engine script into the page without using an iframe
    if (typeof V86Starter === "undefined") {
        await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://copy.sh/v86/build/v86character.js";
            script.onload = resolve;
            script.onerror = () => {
                statusMsg.innerText = "Error: School network blocked the emulator engine file download.";
                reject();
            };
            document.head.appendChild(script);
        });
    }

    statusMsg.innerText = "Booting Linux kernel directly in tab memory... (This takes about 5 seconds)";

    try {
        // Initialize a real x86 emulation system container mapped right onto your HTML text block
        const emulator = new V86Starter({
            wasm_path: "https://copy.sh/v86/build/v86.wasm",
            memory_size: 32 * 1024 * 1024, // Allocate 32MB of local RAM inside the browser tab
            vga_as_text_mode: true,
            screen_element: preElement,
            autostart: true,
            // Fetch a minimal, real Linux OS image file
            bios: { url: "https://copy.sh/v86/bios/seabios.bin" },
            linux_elf: { url: "https://copy.sh/v86/images/linux3.iso" }
        });

        // Clear out the temporary status message once the real OS console screen initializes
        emulator.add_listener("serial0-output-char", () => {
            if (statusMsg) {
                statusMsg.remove();
            }
        });

        // Automatically pass keyboard keystrokes straight into the virtual operating system machine 
        container.addEventListener("click", () => {
            preElement.focus();
        });
        
        preElement.focus();

    } catch (err) {
        console.error("OS Failed to compile inside WebAssembly:", err);
        statusMsg.innerText = "Wasm Boot Failure. Your device might be out of allocatable browser RAM memory blocks.";
    }
})();
