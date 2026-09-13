window.PokiFileHostName= window.PokiFileHostName || "qa-files.poki.com";
window.CoolMathHostName= window.CoolMathHostName || "www.coolmath-games.com";
window.ClonerLog= window.ClonerLog || console.log;
window.ClonerTrace= window.ClonerTrace || console.trace;
window.ConsoleClear= window.ConsoleClear || console.clear;
window.OriginalWindowOpen= window.OriginalWindowOpen || window.open;
window.OriginalEval= window.OriginalEval || eval;


window.open= function() {
    ClonerTrace(arguments);
}


console.clear= function() {
    return false;
};


ev4l= function() {
    ClonerLog("fx--ev4l--", arguments[0]);
    arguments[0]= arguments[0].replace("'location'", "'l0cati0n'");
    arguments[0]= arguments[0].replace("document.location", "d0cum3nt.location");
    return OriginalEval.apply(this, arguments);
}


var SendMessage= function() {
    ClonerLog("cloner-v3.SendMessage", arguments);
}


window.commercialBreak= function() {
    ClonerLog("cloner-v3.commercialBreak", arguments);
    return true;
}
navigator.sendBeacon= function() {
    ClonerLog("navigator.sendBeacon", arguments);
}


var l0cati0n= new Proxy(location, {
    get: function(target, property, receiver) {
        ClonerLog(`l0cati0n.get.property--${property}--`);
        let targetObj = target[property];
        if (typeof targetObj == "function") {
            return (...args) => target[property].apply(target, args);
        } else {
            if (property== "protocol") {
                return "https:";
            }
            if (property== "host" || property=="hostname") {
                return "localhost";
            }
            if (property== "href") {
                return "https://localhost/";
            }
            if (property== "origin") {
                return "https://localhost/";
            }
            return targetObj;
        }
    },
    set: function(target, property, receiver) {
        ClonerLog(`l0cati0n.set.property--${property}--${receiver}--`);
        return true;
    }
});


w1nd0w = new Proxy(window, {
    get: function(target, property, receiver) {
      // console.log("--fx--xWindow--property--", property, receiver);
      if (typeof target[property] == "function") {
        return (...args) => target[property].apply(target,args);
      } else {
        if (property== "location") {
          return target["l0cati0n"];
        }
        // console.log("--fx--xwindow--targetObj--", targetObj);
        return target[property];
      }
    }
});


var d0cum3nt= new Proxy(document, {
    get: function(target, property, receiver) {
        ClonerLog(`d0cum3nt.get.property--${property}--`);
        let targetObj = target[property];
        if (typeof targetObj == "function") {
            return (...args) => target[property].apply(target, args);
        } else {
            if (property== "URL" || property=="location") {
                return "http://localhost:8080/";
            }
            if (property== "URLPoki") {
                return "https://poki.com/";
            }
            if (property== "URLFreezeNova") {
                return "https://freezenova.com/";
            }
            if (property== "URLCrazyGames") {
                return "https://www.crazygames.com/";
            }
            return targetObj;
        }
    },
    set: function(target, property, receiver) {
        ClonerLog(`d0cum3nt.set.property--${property}--${receiver}--`);
        return true;
    }
});


var op3n= function() {
    console.trace(`cloner-v3.op3n--${arguments}--`);
    // window.open("https://ubg235.pages.dev/ads/");
    // alert("--fx--xopen--");
}


function ClonerLoadJS(FILE_URL, callback) {
    let scriptEle = document.createElement("script");

    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", true);

    document.body.appendChild(scriptEle);

    return new Promise((resolve, reject)=> {
        // Success
        scriptEle.addEventListener("load", () => {
            ClonerLog("ClonerLoadJS Done");
            callback && callback(true);
            resolve(true);
        });

        // Error
        scriptEle.addEventListener("error", () => {
            ClonerLog("ClonerLoadJS Error");
            // callback && callback(false);
            reject(false);
        });
    });
}


function ClonerAd(callback) {
    return ClonerLoadJS("https://ubg235.pages.dev/ads/commercial.js", callback);
}


function ClonerAdReward(callback) {
    return ClonerLoadJS("https://ubg235.pages.dev/ads/rewarded.js", callback);
}


window.addEventListener("load", function () {
    ClonerLoadJS("https://ubg235.pages.dev/js/ubg235_game_v1.js");
});


(function() {
    const HREF= document.currentScript.src;
    const SCHEME= HREF.split("://")[0];
    const HOST= (HREF.split("://")?.[1]?? "").split("/")[0];
    const GAME_PATH= `${HREF.split("?")[0].split("&")[0].split("patch/_cloner-v")[0]}`;
    // ClonerLog(`Cloner HREF--${HREF}-- GAME_PATH--${GAME_PATH}--`);
    const REPLACEs= {
        // poki
        "https://a.poki-cdn.com/prebid/": "./patch/poki/prebid.js",
        "https://api.poki.com/ads/houseads/": "./patch/poki/ads/houseads.json",
        "https://geo.poki.io/": "./patch/poki/geo.json",
        "https://img.poki.com/": "./patch/ubg235/logo_512.png",
        "https://devs-api.poki.com/": "./patch/poki/+",
        "https://api.poki.com/": "./patch/poki/+",
        "https://game-cdn.poki.com/": "./patch/poki/+",
        "https://a.poki.com/": "./patch/poki/+",
        "https://a.poki-cdn.com/": "./patch/poki/+",

        // Famobi
        "https://pro.ip-api.com/json/": "./patch/famobi/pro-ip-api.json",
        "https://data.html5games.com/event/": "./patch/famobi/event/event.json",
        "https://data.html5games.com/": "./patch/famobi/+",
        "https://play.famobi.com/": "./patch/famobi/+",
        "https://games.cdn.famobi.com/": "./patch/famobi/+",
        "https://tools.famobi.com/": "./patch/famobi/+",

        // CoolMathGames
        "https://www.coolmathgames.com/": "./patch/coolmathgames/+",

        // CrazyGames
        "https://sdk.crazygames.com/": "./patch/crazygames/+",

        // GameDistribution
        "https://html5.api.gamedistribution.com/": "./patch/gamedistribution/+",

        // GameMonetize
        "https://api.gamemonetize.com/": "./patch/gamemonetize/+",

        // cutedressup
        "https://cdn.cutedressup.in/games/common/": "./patch/cutedressup/games/common/+",
        "https://games.cutedressup.net/": "./patch/cutedressup/+",
        "https://gamesglue.com/": "./patch/cutedressup/+",
        "https://core.gamerina.io/": "./patch/cutedressup/game_core/+",
        "https://config.gamerina.eu/": "./patch/cutedressup/config/localhost",

        // y8
        "https://scdn.id.net/": "./patch/id/+",
        "https://www.id.net/": "./patch/id/+",
        "https://playtomic.y8.com/": "./patch/y8/+",
        "https://account.y8.com/": "./patch/y8/+",

        "https://www.yiv.com/cdn-cgi/image/quality": "./patch/blocked.png",
        "https://www.babygames.com/thumb/": "./patch/blocked.png",
        "https://www.yiv.com/": "./patch/yyggames/+",
        "https://www.babygames.com/": "./patch/yyggames/+",
        "https://h5gamessdk.yyggames.com/": "./patch/yyggames/+",

        // gamesnacks
        "https://sdks.gamesnacks.com/": "./patch/gamesnacks/+",

        // https://kiz10girls.com/controller/keyasscess/
        "https://kiz10girls.com/controller/keyasscess/": "./patch/kiz10/keyasscess.json",
        "https://cdn.kiz10.com/": "./patch/kiz10/+",

        // createjs
        "https://code.createjs.com/": "./patch/createjs/+",

        // emulatorjs
        "https://www.emulatorjs.com/": "./patch/emulatorjs/+",

        // Google
        "https://pagead2.googlesyndication.com/pagead/gen_204": "./patch/blocked.png",
        "https://imasdk.googleapis.com/js/core/bridge": "./patch/google/js/core/bridge.html",
        "https://pagead2.googlesyndication.com/": "./patch/google/pagead.js",
        "https://www.gstatic.com/": "./patch/google/+",
        "https://imasdk.googleapis.com/": "./patch/google/+",
        "https://pagead2.googlesyndication.com/": "./patch/google/+",
        "https://securepubads.g.doubleclick.net/": "./patch/google/+",
        "https://s0.2mdn.net/": "./patch/google/+",
        "https://adservice.google.com/": "./patch/google/+",
        "https://www.googletagmanager.com/": "./patch/google/+",
        "https://www.google-analytics.com/": "./patch/google/+",
        "https://ssl.google-analytics.com/": "./patch/google/+",
        "https://script.google.com/": "./patch/google/+",
        "https://ajax.googleapis.com/": "./patch/google/+",

        // jsdelivr
        "https://cdn.jsdelivr.net/": "./patch/jsdelivr/+",
        "https://cdn.fbrq.io/": "./patch/fbrq/+",

        // Unity
        "https://config.uca.cloud.unity3d.com": "./patch/unity/config.json",
        "https://perf-events.cloud.unity3d.com/api/v2/": "./patch/unity/events.json",
        "https://remote-config-prd.uca.cloud.unity3d.com/": "./patch/unity/config.json",
        "http://api.brainsoftware.org/": "./patch/unity/+",
        "https://api.brainsoftware.org/": "./patch/unity/+",
        "https://cdp.cloud.unity3d.com/": "./patch/unity/+",
        "https://cdp1cloud.unity3d.com/": "./patch/unity/+",
        "https://api.uca.cloud.unity3d.com/": "./patch/unity/+",
        "https://collect.analytics.unity3d.com/": "./patch/unity/+",

        // Socials
        "https://connect.facebook.net/": "./patch/facebook/+",

        // wgplayer
        "https://universal.wgplayer.com/tag/": "./patch/wgplayer/tag.js",

        // gameanalytics
        "https://api.gameanalytics.com/v2/": "./patch/gameanalytics/v2.json",
        "https://rubick.gameanalytics.com/v2/": "./patch/gameanalytics/v2.json",
        "https://api.gameanalytics.com/remote_configs/v1/": "./patch/gameanalytics/v1.json",

        // martiangames
        "https://martiangames.com/": "./patch/_runtime/martiangames/+",

        // Other
        "https://games-api.ysocorp.com/v6/analytics/session": "./patch/null.json",
        "https://c.amazon-adsystem.com/": "./patch/adsystem/+",
        "https://rubick.gameanalytics.com/": "./patch/gameanalytics/+",
    }

    const ALLOWEDs= [
        "https://gamecloner.wp235.workers.dev/",
        "https://ubg235.pages.dev/",
        "https://www.ubg235.com/",
        "https://ubg235.com/",
        "https://cdn.cutedressup.in/games/",
        "https://www.emulatorjs.com",
        "https://fonts.googleapis.com/",
        "https://ipwho.is/",
    ];

    const URLPatch= function(url, note= "", type= "") {
        if (typeof url!== "string") {
            return url;
        }
        if (url.startsWith("//")) {
            url= `https:${url}`;
        }
        if (url.startsWith(GAME_PATH)) {
            return url;
        }
        if (!url.startsWith("http")) {
            return url;
        }

        for (const [matchUrl, replaceUrl] of Object.entries(REPLACEs)) {
            if (url.startsWith(matchUrl)) {
                let replace_url= `${replaceUrl}?${matchUrl}`;
                if (replaceUrl.endsWith("+")) {
                    replace_url= `${replaceUrl.replace("+", "")}${url.replace(matchUrl, "")}`;
                }
                if (replace_url.startsWith("./patch/")) {
                    replace_url= `${GAME_PATH}${replace_url}`.replace("/./", "/");
                }
                ClonerLog("URLPatch", note, url, "→", replace_url);
                return replace_url;
            }
        }
        if (ALLOWEDs.some(prefix => url.startsWith(prefix))) {
            // console.log("URLPatch ALLOWED", url);
            return url;
        }

        ClonerLog("URLPatch BLOCKED", note, url);
        if (url.startsWith(`${SCHEME}://${HOST}/cdn-cgi/`)) {
            return `${GAME_PATH}patch/blocked.json`;
        }
        if (type== "JS") {
            return `${GAME_PATH}patch/blocked.js`;
        }
        if (type== "JSON") {
            return `${GAME_PATH}patch/blocked.json`;
        }
        if (type== "IMG") {
            return `${GAME_PATH}patch/blocked.png`;
        }
        return `${GAME_PATH}patch/blocked.html`;
    }

    // XHR Override
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, async = true, user, pass) {
        return origOpen.call(this, method, URLPatch(url, "XHR"), async, user, pass);
    };

    XMLHttpRequest.prototype.send = function(body) {
        return origSend.call(this, body);
    };

    // HTML Script Element Src
    const origHTMLScriptElementSrc = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, "src");
    Object.defineProperty(HTMLScriptElement.prototype, "src", {
        get() {
            return origHTMLScriptElementSrc.get.call(this);
        },
        set(value) {
            origHTMLScriptElementSrc.set.call(this, URLPatch(value, "SCRIPT-TAG-SRC-SET", "JS"));
        }
    });

    // HTML Image Element Src
    const origHTMLImageElementSrc= Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
        get() {
            return origHTMLImageElementSrc.get.call(this);
        },
        set(v) {
            return origHTMLImageElementSrc.set.call(this, URLPatch(v, "IMG-OBJ-SRC-SET", "IMG"));
        },
        configurable: true,
        enumerable: true
    });

    // Element Set Att
    const origElementSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
        if (this.tagName === "SCRIPT" && name.toLowerCase() === "src" && typeof value === "string") {
            return origElementSetAttribute.call(this, name, URLPatch(value, "SCRIPT-SRC-SET-ATT", "JS"));
        }
        return origElementSetAttribute.apply(this, arguments);
    };

    // Element
    const originalCreate = document.createElement;
    document.createElement = function(tagName, ...args) {
        const el = originalCreate.call(this, tagName, ...args);
        const _setAttribute = el.setAttribute;
        if (tagName.toLowerCase() === 'link') {
            el.setAttribute = function(name, value) {
                if (name === 'href') {
                    value = URLPatch(value, "LINK-TAG-HREF-ATT");
                }
                return _setAttribute.call(this, name, value);
            };
            Object.defineProperty(el, "href", {
                configurable: true,
                enumerable: true,
                get() {
                    return this.getAttribute("href");
                },
                set(value) {
                    _setAttribute.call(this, "href", URLPatch(value, "LINK-TAG-HREF-SET"));
                }
            });
        }
        if (tagName.toLowerCase() === 'img') {
            const origSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
            Object.defineProperty(HTMLImageElement.prototype, "src", {
                configurable: true,
                enumerable: origSrc.enumerable,
                get: function() {
                    return origSrc.get.call(this);
                },
                set: function(value) {
                    return origSrc.set.call(this, URLPatch(value, "IMG-TAG-SRC-SET", "IMG"));
                }
            });
        }
        if (tagName.toLowerCase() === 'iframe') {
            Object.defineProperty(el, "src", {
                configurable: true,
                enumerable: true,
                get() {
                    return this.getAttribute("src");
                },
                set(value) {
                    _setAttribute.call(this, "src", URLPatch(value, "IFRAME-TAG-SRC-SET"));
                }
            });
        }
        return el;
    };

    // Fetch
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        let url = input;
        if (input instanceof Request) {
            url = input.url;
        }
        url = URLPatch(url, "FETCH");
        if (input instanceof Request) {
            input = new Request(url, input);
        } else {
            input = url;
        }
        return originalFetch.call(this, input, init);
    };
})();


(function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register= async function() {
            return Promise.reject(new Error("Cloner.serviceWorker.register blocked!"));
        }
    }
})();


(function() {
    Object.defineProperty(window, "debugger", {
        get() { return undefined; },
        set() {},
        configurable: true
    });
    window.debugger = function(){};
})();
