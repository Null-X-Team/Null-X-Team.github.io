(function runTerminalSimulator() {
    const terminalScreen = document.getElementById("terminal-screen");
    const consoleInput = document.getElementById("terminal-console-input");
    const promptLabel = document.getElementById("terminal-prompt-label");

    if (!terminalScreen || !consoleInput) return;

    // Persistent UNIX File System Simulation Tree Object
    const fileSystem = {
        root: {
            type: "dir",
            name: "/",
            contents: {
                "home": {
                    type: "dir",
                    contents: {
                        "guest": {
                            type: "dir",
                            contents: {
                                "readme.txt": { type: "file", content: "Welcome to NxOS Terminal!\nThis custom shell bypasses administration sandbox locks cleanly." },
                                "logs": {
                                    type: "dir",
                                    contents: {
                                        "syslog.log": { type: "file", content: "KERN: Boot sequence completed.\nAUTH: Session opened for user 'guest'." }
                                    }
                                },
                                "about.sh": { type: "file", content: "echo 'NxOS Dashboard Build v2.4.1'" }
                            }
                        }
                    }
                },
                "bin": {
                    type: "dir",
                    contents: {
                        "help": { type: "file", content: "System Core Directive" },
                        "clear": { type: "file", content: "System Core Directive" }
                    }
                }
            }
        }
    };

    // Current State Registry Tracking
    const state = {
        user: "guest",
        host: "nxos",
        currentPath: ["home", "guest"], // Starts natively in user home folder context
        getDirRef: function() {
            let current = fileSystem.root;
            for (const folder of this.currentPath) {
                current = current.contents[folder];
            }
            return current;
        },
        getPathString: function() {
            // Replaces /home/guest path with standard bash ~ shorthand string symbol
            const path = "/" + this.currentPath.join("/");
            return path === "/home/guest" ? "~" : path;
        }
    };

    // Update prompt text string immediately on load
    updatePromptUI();

    function updatePromptUI() {
        promptLabel.innerHTML = `${state.user}@${state.host}:${state.getPathString()}$&nbsp;`;
    }

    // Capture focus onto the input bar automatically on clicks
    document.querySelector(".terminal-view-container").addEventListener("click", () => {
        consoleInput.focus();
    });

    consoleInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const fullRawValue = consoleInput.value;
            const trimmedInput = fullRawValue.trim();
            
            if (trimmedInput === "") {
                appendOutputRow(`${state.user}@${state.host}:${state.getPathString()}$ `, "text-muted");
                consoleInput.value = "";
                return;
            }

            // Print user command entry log back up to terminal window canvas
            appendOutputRow(`${state.user}@${state.host}:${state.getPathString()}$ ${fullRawValue}`);

            // Parse token vectors for routing arguments
            const parts = trimmedInput.split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            executeCommand(cmd, args, trimmedInput);

            consoleInput.value = "";
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
    });

    function executeCommand(cmd, args, rawInput) {
        const currentDir = state.getDirRef();

        switch (cmd) {
            case "help":
                appendOutputRow(`Available GNU Coreutils Core Simulator Commands:
  help       - Print this structural runtime support index
  clear      - Purge activity rows from output interface view
  pwd        - Print working layout system directory positioning
  ls         - List files and sub-folders inside current target path
  cd [path]  - Change tracking workspace trajectory paths (e.g. 'cd logs' or 'cd ..')
  cat [file] - View contents of textual target node files
  mkdir [name]- Create a new sub-directory inside current path
  touch [name]- Initialize a new, blank file structure node
  echo [msg] - Write text data or route contents to files via redirection (e.g. echo 'hello' > test.txt)
  whoami     - Display active session user configuration profile`, "text-info");
                break;

            case "clear":
                terminalScreen.innerHTML = "";
                break;

            case "whoami":
                appendOutputRow(state.user);
                break;

            case "pwd":
                appendOutputRow("/" + state.currentPath.join("/"));
                break;

            case "ls":
                const items = Object.keys(currentDir.contents);
                if (items.length === 0) break;
                
                // Color-code folder nodes blue vs file nodes white
                const formattedItems = items.map(itemName => {
                    const node = currentDir.contents[itemName];
                    return node.type === "dir" 
                        ? `<span style="color: #3366ff; font-weight: bold;">${itemName}/</span>` 
                        : `<span>${itemName}</span>`;
                }).join("    ");
                
                appendOutputRow(formattedItems, "");
                break;

            case "cd":
                const targetPath = args[0];
                if (!targetPath || targetPath === "~") {
                    state.currentPath = ["home", "guest"];
                    updatePromptUI();
                    break;
                }
                if (targetPath === "..") {
                    if (state.currentPath.length > 0) state.currentPath.pop();
                    updatePromptUI();
                    break;
                }
                if (targetPath === ".") break;

                if (currentDir.contents[targetPath]) {
                    if (currentDir.contents[targetPath].type === "dir") {
                        state.currentPath.push(targetPath);
                        updatePromptUI();
                    } else {
                        appendOutputRow(`bash: cd: ${targetPath}: Not a directory`, "text-error");
                    }
                } else {
                    appendOutputRow(`bash: cd: ${targetPath}: No such file or directory`, "text-error");
                }
                break;

            case "cat":
                if (!args[0]) {
                    appendOutputRow("cat: missing file operand", "text-error");
                    break;
                }
                const targetFile = currentDir.contents[args[0]];
                if (!targetFile) {
                    appendOutputRow(`cat: ${args[0]}: No such file or directory`, "text-error");
                } else if (targetFile.type === "dir") {
                    appendOutputRow(`cat: ${args[0]}: Is a directory`, "text-error");
                } else {
                    appendOutputRow(targetFile.content);
                }
                break;

            case "mkdir":
                if (!args[0]) {
                    appendOutputRow("mkdir: missing operand", "text-error");
                    break;
                }
                if (currentDir.contents[args[0]]) {
                    appendOutputRow(`mkdir: cannot create directory '${args[0]}': File exists`, "text-error");
                } else {
                    currentDir.contents[args[0]] = { type: "dir", contents: {} };
                }
                break;

            case "touch":
                if (!args[0]) {
                    appendOutputRow("touch: missing file operand", "text-error");
                    break;
                }
                if (!currentDir.contents[args[0]]) {
                    currentDir.contents[args[0]] = { type: "file", content: "" };
                }
                break;

            case "echo":
                // Handle standard Unix redirection symbol '>' operator
                const redirectIndex = args.indexOf(">");
                if (redirectIndex !== -1 && args[redirectIndex + 1]) {
                    const fileName = args[redirectIndex + 1];
                    const contentString = args.slice(0, redirectIndex).join(" ").replace(/['"]/g, "");
                    currentDir.contents[fileName] = { type: "file", content: contentString };
                } else {
                    appendOutputRow(args.join(" ").replace(/['"]/g, ""));
                }
                break;

            default:
                appendOutputRow(`bash: ${cmd}: command not found`, "text-error");
                break;
        }
    }

    function appendOutputRow(text, className = "") {
        const row = document.createElement("div");
        row.className = `output-line ${className}`;
        row.innerHTML = text; // Keeps inline html formatting blocks running smoothly
        terminalScreen.appendChild(row);
    }
})();
