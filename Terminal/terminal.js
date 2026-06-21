(function initLinuxSubsystem() {
    // 1. Dynamic Injection of the stable WebAssembly v86 Emulation Core Layer via unpkg CDN
    if (!window.V86Starter) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/v86@0.5.359/build/libv86.js";
        script.onload = bootKernelInstance;
        document.head.appendChild(script);
    } else {
        bootKernelInstance();
    }

    function bootKernelInstance() {
        const screenContainer = document.getElementById("linux-terminal-screen");
        if (!screenContainer) return;
        
        screenContainer.innerHTML = "Booting real Linux kernel from image over WASM architecture...\n\n";

        // 2. Initialize the Hardware Emulator State Instance
        const emulator = new V86Starter({
            memory_size: 32 * 1024 * 1024,      // Allocate a light 32MB RAM sandbox environment inside the tab
            vga_memory_size: 2 * 1024 * 1024,
            screen_container: screenContainer,  // Pipes the system output text directly here
            boot_order: 0x312,
            
            // Fetch standard configuration binary system files directly from remote mirrors
            bios: { url: "https://copy.sh/v86/bios/seabios.bin" },
            vga_bios: { url: "https://copy.sh/v86/bios/vgabios.bin" },
            
            // A micro 4.9MB Linux Buildroot Operating System image containing standard busybox tools
            fda: { url: "https://copy.sh/v86/images/linux.img" }, 
            autostart: true,
        });

        // 3. Keep standard UI focus fixed into the console environment 
        screenContainer.addEventListener("click", () => {
            screenContainer.focus();
        });
        
        // Push initial focus immediately upon tab loading sequence completion
        setTimeout(() => screenContainer.focus(), 500);
    }
})();
