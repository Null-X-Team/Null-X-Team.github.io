/**
 * Null X site tour (driver.js)
 * - Skip allowed
 * - Games step: one real click on Games advances tour
 * - Other UI locked via CSS pointer-events (cleared on tour end)
 */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    if (!window.driver || !window.driver.js || !window.driver.js.driver) {
      console.warn("[NullX Tour] driver.js not loaded");
      return;
    }

    var driverFactory = window.driver.js.driver;
    var gamesClickHandler = null;
    var waitingForGamesClick = false;
    var advanceTimer = null;

    function showSection(navId) {
      var el = document.getElementById(navId);
      if (el) el.click();
    }

    function getGameCard() {
      return document.querySelector(
        "#gameGrid .game-card, #gameGrid .game-item, #gameGrid > *:not(#favorites-empty-msg)"
      );
    }

    function closeContextMenu() {
      var menu = document.getElementById("custom-context-menu");
      if (menu) menu.style.display = "none";
    }

    function openContextMenu(card) {
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: rect.left + Math.min(30, rect.width / 2),
          clientY: rect.top + Math.min(30, rect.height / 2)
        })
      );
    }

    function markTourSeen() {
      try {
        localStorage.setItem("hasSeenNullXTour", "true");
      } catch (e) {}
    }

    function ensureLockStyle() {
      if (document.getElementById("nullx-tour-lock-style")) return;
      var style = document.createElement("style");
      style.id = "nullx-tour-lock-style";
      style.textContent = [
        "/* Lock everything except Games + tour UI */",
        "body.nullx-tour-games-lock .dashboard,",
        "body.nullx-tour-games-lock .dashboard * {",
        "  pointer-events: none !important;",
        "}",
        "body.nullx-tour-games-lock #nav-games,",
        "body.nullx-tour-games-lock #nav-games * {",
        "  pointer-events: auto !important;",
        "  cursor: pointer !important;",
        "}",
        "body.nullx-tour-games-lock .driver-popover,",
        "body.nullx-tour-games-lock .driver-popover *,",
        "body.nullx-tour-games-lock .driver-overlay,",
        "body.nullx-tour-games-lock .driver-active-element,",
        "body.nullx-tour-games-lock .driver-active-element * {",
        "  pointer-events: auto !important;",
        "}"
      ].join("\n");
      document.head.appendChild(style);
    }

    function enableGamesOnlyLock() {
      ensureLockStyle();
      document.body.classList.add("nullx-tour-games-lock");
    }

    function clearGamesOnlyLock() {
      waitingForGamesClick = false;
      if (advanceTimer) {
        clearTimeout(advanceTimer);
        advanceTimer = null;
      }
      if (gamesClickHandler) {
        var g = document.getElementById("nav-games");
        if (g) {
          g.removeEventListener("click", gamesClickHandler, false);
          g.removeEventListener("click", gamesClickHandler, true);
        }
        gamesClickHandler = null;
      }
      document.body.classList.remove("nullx-tour-games-lock");
      var style = document.getElementById("nullx-tour-lock-style");
      if (style && style.parentNode) style.parentNode.removeChild(style);
      var oldBarrier = document.getElementById("nullx-tour-barrier");
      if (oldBarrier && oldBarrier.parentNode) oldBarrier.parentNode.removeChild(oldBarrier);
      var oldStyle = document.getElementById("nullx-tour-barrier-style");
      if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle);
    }

    function armGamesUserClick(driverInstance) {
      clearGamesOnlyLock();
      waitingForGamesClick = true;
      enableGamesOnlyLock();

      var games = document.getElementById("nav-games");
      if (!games) return;

      // Bubble phase so the site's own nav handler runs first
      gamesClickHandler = function () {
        if (!waitingForGamesClick) return;
        waitingForGamesClick = false;

        // Unlock UI immediately so the section can render / respond
        document.body.classList.remove("nullx-tour-games-lock");

        // Advance tour after a short beat so Games section can settle
        advanceTimer = setTimeout(function () {
          advanceTimer = null;
          clearGamesOnlyLock();
          try {
            if (driverInstance && typeof driverInstance.moveNext === "function") {
              driverInstance.moveNext();
            }
          } catch (err) {
            console.warn("[NullX Tour] moveNext failed", err);
            clearGamesOnlyLock();
          }
        }, 450);
      };

      games.addEventListener("click", gamesClickHandler, false);
    }

    var tour = driverFactory({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      overlayOpacity: 0.72,
      allowClose: true,
      stagePadding: 6,
      popoverClass: "nullx-tour-popover",
      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Finish",
      progressText: "{{current}} / {{total}}",
      onDestroyStarted: function () {
        clearGamesOnlyLock();
        markTourSeen();
        closeContextMenu();
        if (tour) tour.destroy();
      },
      onDestroyed: function () {
        clearGamesOnlyLock();
      },
      steps: [
        {
          element: ".left-nav",
          popover: {
            title: "Navigation",
            description:
              "This sidebar is how you move around Null X — Home, Games, Favorites, Unblockers, Profile, Chat, and more. You can Skip anytime.",
            side: "right",
            align: "start"
          }
        },
        {
          element: "#nav-games",
          popover: {
            title: "Games",
            description:
              "Click Games once in the sidebar to open the library. Everything else is locked until you do.",
            side: "right",
            align: "center",
            showButtons: ["previous", "close"]
          },
          onHighlighted: function (element, step, opts) {
            armGamesUserClick(opts.driver);
          },
          onDeselected: function () {
            clearGamesOnlyLock();
          }
        },
        {
          element: function () {
            return getGameCard() || document.getElementById("gameGrid") || document.body;
          },
          popover: {
            title: "Game Cards",
            description:
              "Click a card to play. Right-click a card for Favorite / Delete options.",
            side: "bottom",
            align: "center"
          },
          onHighlightStarted: function () {
            clearGamesOnlyLock();
          }
        },
        {
          element: function () {
            return getGameCard() || document.getElementById("gameGrid") || document.body;
          },
          popover: {
            title: "Game Menu",
            description: "Press Next to preview the right-click menu on a game.",
            side: "bottom",
            align: "center",
            showButtons: ["previous", "next", "close"]
          },
          onNextClick: function (element, step, opts) {
            var d = opts.driver;
            var card = getGameCard();
            if (card) openContextMenu(card);
            setTimeout(function () {
              d.moveNext();
            }, 200);
          }
        },
        {
          element: "#ctx-favorite",
          popover: {
            title: "Favorite Game",
            description: "Use this to save a game to your Favorites list.",
            side: "right",
            align: "center"
          }
        },
        {
          element: "#nav-favorites",
          popover: {
            title: "Favorites",
            description: "Press Next to open your Favorites.",
            side: "right",
            align: "center",
            showButtons: ["previous", "next", "close"]
          },
          onNextClick: function (element, step, opts) {
            var d = opts.driver;
            closeContextMenu();
            showSection("nav-favorites");
            setTimeout(function () {
              d.moveNext();
            }, 400);
          }
        },
        {
          element: "#favoritesGrid",
          popover: {
            title: "Saved Games",
            description: "Favorited games show up here for quick access.",
            side: "top",
            align: "center"
          }
        },
        {
          element: "#searchBar",
          popover: {
            title: "Search",
            description: "Search the game library by name.",
            side: "bottom",
            align: "center"
          }
        },
        {
          element: "#randomBtn",
          popover: {
            title: "Random Game",
            description: "Feeling lucky? Pick a random title instantly.",
            side: "bottom",
            align: "center"
          }
        },
        {
          element: "#nav-communications",
          popover: {
            title: "Communications (Chat)",
            description:
              "Open chat and community features here — messages, friends, and more.",
            side: "right",
            align: "center",
            showButtons: ["previous", "next", "close"]
          },
          onNextClick: function (element, step, opts) {
            var d = opts.driver;
            showSection("nav-communications");
            setTimeout(function () {
              d.moveNext();
            }, 350);
          }
        },
        {
          element: "#nav-profile",
          popover: {
            title: "Profile",
            description: "Update your avatar, bio, and account details.",
            side: "right",
            align: "center"
          }
        },
        {
          element: "#nav-unblockers",
          popover: {
            title: "Unblockers",
            description: "Proxy tools and private browsing helpers live here.",
            side: "right",
            align: "center"
          }
        },
        {
          element: "#signInBtn",
          popover: {
            title: "Sign In",
            description: "Sign in to sync saves, chat, and profile features.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#settingsBtn",
          popover: {
            title: "Settings",
            description:
              "Themes, cloaks, panic key, music, and homescreen preference. Open this anytime from the sidebar.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#stealthOpener",
          popover: {
            title: "Stealth Mode",
            description: "Quick cloak / stealth tools for a safer tab presence.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#start-tour-btn",
          popover: {
            title: "Tour complete",
            description:
              "You can replay this guide anytime with Site Tour. Press Finish or Skip to close.",
            side: "left",
            align: "center"
          }
        }
      ]
    });

    function startTour() {
      clearGamesOnlyLock();
      closeContextMenu();
      try {
        tour.drive();
      } catch (err) {
        clearGamesOnlyLock();
        console.error("[NullX Tour]", err);
      }
    }

    window.startNullXTour = startTour;
    window.clearNullXTourBarrier = clearGamesOnlyLock;

    var btn = document.getElementById("start-tour-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        startTour();
      });
    }

    window.addEventListener("beforeunload", clearGamesOnlyLock);

    try {
      if (!localStorage.getItem("hasSeenNullXTour")) {
        setTimeout(startTour, 1600);
      }
    } catch (e) {}
  });
})();
