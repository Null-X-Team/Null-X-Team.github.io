(function () {
  const input = document.getElementById("calc-input");
  const output = document.getElementById("terminal-output");
  const status = document.getElementById("status");

  let commandHistory = [];
  let historyIndex = -1;

  const MATH = {
    abs: Math.abs,
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil,
    pow: Math.pow,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt || function (x) { return Math.pow(x, 1 / 3); },
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    atan2: Math.atan2,
    log: Math.log,
    log10: Math.log10 || function (x) { return Math.log(x) / Math.LN10; },
    log2: Math.log2 || function (x) { return Math.log(x) / Math.LN2; },
    exp: Math.exp,
    min: Math.min,
    max: Math.max,
    sign: Math.sign || function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    hypot: Math.hypot || function () {
      var s = 0;
      for (var i = 0; i < arguments.length; i++) s += arguments[i] * arguments[i];
      return Math.sqrt(s);
    },
    pi: Math.PI,
    e: Math.E,
    tau: Math.PI * 2
  };

  function printLine(text, type) {
    const line = document.createElement("div");
    line.className = "line " + (type || "");
    line.innerText = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function notifyParent(type, data) {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          { source: "nullx-calculator", type: type, data: data || {} },
          "*"
        );
      }
    } catch (e) {}
  }

  function safeCalculate(expression) {
    var expr = String(expression).trim();
    if (!expr) return null;

    if (/[^0-9+\-*/().,\s^a-zA-Z_]/.test(expr)) {
      throw new Error("Unsupported characters");
    }
    if (/\b(window|document|Function|eval|globalThis|this|constructor|prototype|__proto__|import|export)\b/i.test(expr)) {
      throw new Error("Blocked identifier");
    }

    var code = expr.replace(/\^/g, "**");
    var keys = Object.keys(MATH);
    var values = keys.map(function (k) { return MATH[k]; });
    var fn = Function.apply(null, keys.concat(["return (" + code + ");"]));
    var result = fn.apply(null, values);

    if (typeof result === "number" && !isFinite(result)) {
      throw new Error("Non-finite result");
    }
    return result;
  }

  function boot() {
    status.innerText = "READY";
    status.className = "status-ready";
    output.innerHTML = "";
    printLine("Null X Calculator Engine online (pure JS).", "system");
    printLine("Ops: + - * / ** ^   Fns: sqrt sin cos tan log abs floor ceil min max", "system");
    printLine("Consts: pi e tau   Commands: clear, help", "system");
    input.placeholder = "Enter expression...";
    input.removeAttribute("disabled");
    input.focus();
    notifyParent("ready");
  }

  function handleCommand() {
    var expr = input.value.trim();
    if (!expr) return;

    commandHistory.push(expr);
    historyIndex = commandHistory.length;

    printLine("calc>> " + expr, "command");
    input.value = "";

    var lower = expr.toLowerCase();
    if (lower === "clear") {
      output.innerHTML = "";
      notifyParent("calculate", { expression: "clear", result: null });
      return;
    }
    if (lower === "help") {
      printLine("Ops: + - * / ** ^", "system");
      printLine("Fns: sqrt sin cos tan asin acos atan log log10 log2 abs floor ceil min max pow exp", "system");
      printLine("Consts: pi e tau", "system");
      notifyParent("calculate", { expression: "help", result: null });
      return;
    }

    try {
      var result = safeCalculate(expr);
      printLine("= " + result, "result");
      notifyParent("calculate", { expression: expr, result: result });
    } catch (err) {
      printLine("[Math Error]: " + (err && err.message ? err.message : String(err)), "error");
      notifyParent("error", { expression: expr });
    }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });

  boot();
})();
