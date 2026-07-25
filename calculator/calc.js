(async function() {
  const input = document.getElementById('calc-input');
  const output = document.getElementById('terminal-output');
  const status = document.getElementById('status');

  let pyodide = null;
  let commandHistory = [];
  let historyIndex = -1;

  function printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `line ${type}`;
    line.innerText = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  try {
    // 1. Initialize Pyodide
    // @ts-ignore
    pyodide = await loadPyodide();

    // 2. Fetch the calc.py script from the same folder
    const response = await fetch('calc.py');
    if (!response.ok) throw new Error("Could not load calc.py");
    const pythonCode = await response.text();

    // 3. Load the Python code into Pyodide
    await pyodide.runPythonAsync(pythonCode);

    // Update state to Ready
    status.innerText = "READY";
    status.className = "status-ready";
    output.innerHTML = '';
    printLine("Python 3.11 Engine Loaded via calc.py!", "system");
    printLine("Enter math expressions (e.g., 2**10, sqrt(144), sin(pi/2)).", "system");
    printLine("Type 'clear' to reset terminal.", "system");

    input.placeholder = "Enter expression...";
    input.removeAttribute('disabled');
    input.focus();
  } catch (err) {
    status.innerText = "ERROR";
    status.className = "status-error";
    printLine(`Failed to initialize calculator: ${err.message}`, "error");
    printLine("Note: If testing locally, open via a local server (like Live Server) so fetch('calc.py') works.", "system");
  }

  // Handle Input Processing
  async function handleCommand() {
    const expr = input.value.trim();
    if (!expr) return;

    commandHistory.push(expr);
    historyIndex = commandHistory.length;

    printLine(`py_calc>> ${expr}`, 'command');
    input.value = '';

    if (expr.toLowerCase() === 'clear') {
      output.innerHTML = '';
      return;
    }

    try {
      // Call the `calculate()` function defined in calc.py!
      const safeExpr = JSON.stringify(expr);
      const result = await pyodide.runPythonAsync(`calculate(${safeExpr})`);
      
      if (result.startsWith('[Math Error]')) {
        printLine(result, 'error');
      } else {
        printLine(result, 'result');
      }
    } catch (err) {
      printLine(`[Execution Error]: ${err.message}`, 'error');
    }
  }

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
      e.preventDefault();
    }
  });
})();
