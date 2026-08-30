/**
 * Null X site tour (driver.js)
 * - Skip allowed
 * - Robust Games section transition (fixes swap bug)
 * - Includes Communications (chat) + Settings
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

    const driverFactory = window.driver.js.driver;

    function showSection(navId) {
      const el = document.getElementById(navId);
      if (el) el.click();
    }

    function getGameCard() {
      return document.querySelector(
        "#gameGrid .game-card, #gameGrid .game-item, #gameGrid > *:not(#favorites-empty-msg)"
      );
    }

    function closeContextMenu() {
      const menu = document.getElementById("custom-context-menu");
      if (menu) menu.style.display = "none";
    }

    function openContextMenu(card) {
      if (!card) return;
      const rect = card.getBoundingClientRect();
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

    function waitFor(predicate, opts) {
      opts = opts || {};
      var timeout = opts.timeout != null ? opts.timeout : 4000;
      var interval = opts.interval != null ? opts.interval : 100;
      return new Promise(function (resolve) {
        var start = Date.now();
        (function tick() {
          try {
            if (predicate()) return resolve(true);
          } catch (e) {}
          if (Date.now() - start >= timeout) return resolve(false);
          setTimeout(tick, interval);
        })();
      });
    }

    function markTourSeen() {
      try {
        localStorage.setItem("hasSeenNullXTour", "true");
      } catch (e) {}
    }

    const tour = driverFactory({
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
        markTourSeen();
        closeContextMenu();
        if (tour) tour.destroy();
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
            description: "Tap Next to open the Games section.",
            side: "right",
            align: "center",
            showButtons: ["previous", "next", "close"]
          },
          onNextClick: function (element, step, opts) {
            var d = opts.driver;
            showSection("nav-games");
            waitFor(function () {
              var grid = document.getElementById("gameGrid");
              return grid && grid.offsetParent !== null && getGameCard();
            }, { timeout: 5000 }).then(function () {
              d.moveNext();
            });
          }
        },
        {
          element: function () {
            return getGameCard() || document.getElementById("gameGrid");
          },
          popover: {
            title: "Game Cards",
            description:
              "Click a card to play. Right-click a card for Favorite / Delete options.",
            side: "bottom",
            align: "center"
          }
        },
        {
          element: function () {
            return getGameCard() || document.getElementById("gameGrid");
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
      closeContextMenu();
      try {
        tour.drive();
      } catch (err) {
        console.error("[NullX Tour]", err);
      }
    }

    window.startNullXTour = startTour;

    var btn = document.getElementById("start-tour-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        startTour();
      });
    }

    // Auto-start once for new users; mark seen only when tour ends (see onDestroyStarted)
    try {
      if (!localStorage.getItem("hasSeenNullXTour")) {
        setTimeout(startTour, 1600);
      }
    } catch (e) {}
  });
})();
