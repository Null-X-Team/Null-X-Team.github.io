(function NullXDevTools() {
  "use strict";

  if (window.__NULLX_DEVTOOLS__) {
    window.__NULLX_DEVTOOLS__.toggle();
    return;
  }

  const CONFIG = {
    version: "10.2.0",
    maxLogs: 300,
    maxRequests: 200,
    theme: {
      bgFallback: "rgba(5,5,10,.985)",
      panelFallback: "rgba(20,12,31,.96)",
      borderFallback: "#8b00ff",
      accentFallback: "#00ffcc",
      textFallback: "#eeeeee",
      mutedFallback: "#9691a1",
      danger: "#ff3b63",
      warning: "#ffba49",
      success: "#38e58c"
    }
  };

  const STATE = {
    visible: false,
    activeTab: "overview",
    startTime: Date.now(),
    logs: [],
    requests: [],
    errors: [],
    fps: 0,
    frames: 0,
    lastFpsTime: performance.now(),
    selectedElement: null,
    pickerActive: false,
    pickerHandlers: null,
    networkPatched: false,
    consolePatched: false,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    fun: {
      lagEnabled: false,
      lagMs: 180,
      lagTimer: null,
      cssNuked: false,
      sheetStates: [],
      matrixEnabled: false,
      matrixCanvas: null,
      matrixFrame: null,
      matrixResize: null,
      randomStyle: null
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value ?? "")
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;")
    .replace(/'/g, "&#" + "039;");
  const bytes = (value) => {
    if (!Number.isFinite(value) || value < 0) return "N/A";
    const units = ["B", "KB", "MB", "GB"];
    let amount = value;
    let index = 0;
    while (amount >= 1024 && index < units.length - 1) {
      amount /= 1024;
      index++;
    }
    return `${amount.toFixed(index ? 2 : 0)} ${units[index]}`;
  };
