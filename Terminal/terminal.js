document.addEventListener("DOMContentLoaded", () => {
  const terminalScreen = document.getElementById("terminalScreen");
  const consoleInput = document.getElementById("terminalConsoleInput");

  // State log to track active workspace environment values
  const systemState = {
    currentDir: "~",
    user: "guest",
    host: "system"
  };

  // Static Dictionary Mapping Recognized Core Interface Strings
  const commands = {
    help: () => `Available System Directives:
  help       - Display command structure index configuration
  clear      - Empty interface activity layout
  about      - Display build distribution statistics
  status     - Check current runtime environmental flags
  exit       - Return to main dashboard application view`,
    
    about: () => `Web Console System Interface Shell [Version 2.4.1]
Configured environment pipeline mapping structural parameters via JavaScript runtime.`,
    
    status: () => `[SYSTEM STATUS EXPORT]
Host Status     : Online
Network Link    : Secured
Theme Workspace : Rich Deep Purple Node Configuration`,
    
    exit: () => {
      window.location.href = "index.html";
      return "Navigating out of console...";
    }
  };

  // Event listener to maintain input element focus on clicking empty viewport canvas
  terminalScreen.addEventListener("click", () => {
    consoleInput.focus();
  });

  consoleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inputVal = consoleInput.value.trim();
      if (inputVal === "") return;

      // Parse instruction tokens split away from user args
      const parts = inputVal.split(" ");
      const cmd = parts[0].toLowerCase();

      // Print the user command string back to terminal output
      appendOutputRow(`${systemState.user}@${systemState.host}:${systemState.currentDir}$ ${inputVal}`, "text-muted");

      if (cmd === "clear") {
        clearTerminalCanvas();
      } else if (commands[cmd]) {
        const result = commands[cmd](parts.slice(1));
        appendOutputRow(result);
      } else {
        appendOutputRow(`Command directive not recognized: '${cmd}'. Try typing 'help' to see active operations indices.`, "text-error");
      }

      // Reset text line content and shift window view viewport focus downwards
      consoleInput.value = "";
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  });

  function appendOutputRow(text, className = "") {
    const row = document.createElement("div");
    row.className = `output-line ${className}`;
    row.innerText = text;
    // Insert output item directly ahead of input container layout reference
    terminalScreen.insertBefore(row, consoleInput.closest(".input-line-wrapper"));
  }

  function clearTerminalCanvas() {
    const lines = terminalScreen.querySelectorAll(".output-line");
    lines.forEach(line => line.remove());
  }
});
