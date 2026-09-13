const ClonerLog= console.log;
const PokiFileHostName= "qa-files.poki.com";


const OriginalWindowOpen= window.open;
window.open= function() {
    ClonerLog(arguments);
}


const OriginalEval= eval;
ev4l= function() {
    ClonerLog("fx--ev4l--", arguments[0]);
    arguments[0]= arguments[0].replace("'location'", "'l0cati0n'");
    arguments[0]= arguments[0].replace("document.location", "d0cum3nt.location");
    return OriginalEval.apply(this, arguments);
}


const ClonerURLPatch= function(url) {
    const original_url= url;
    url= url.replace("http://api.brainsoftware.org/get.php", "./patch/unity/get.json?");
    url= url.replace("https://api.brainsoftware.org/get.php", "./patch/unity/get.json?");
    url= url.replace("https://config.uca.cloud.unity3d.com", "./patch/unity/config.json?");
    url= url.replace("https://remote-config-prd.uca.cloud.unity3d.com/settings", "./patch/unity/config.json?");
    url= url.replace("https://cdp.cloud.unity3d.com/v1/events", "./patch/unity/events.json?");
    url= url.replace("https://cdp1cloud.unity3d.com/v1/events", "./patch/unity/events.json?");
    url= url.replace("https://api.uca.cloud.unity3d.com/v1/events", "./patch/unity/events.json?");
    url= url.replace("https://collect.analytics.unity3d.com/api/analytics/", "./patch/unity/analytics.json?");

    // Google
    url= url.replace("https://securepubads.g.doubleclick.net/tag/js/gpt.js", "./patch/null.js?https://securepubads.g.doubleclick.net/tag/js/gpt.js");
    url= url.replace("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", "./patch/null.js?https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    url= url.replace("https://www.googletagmanager.com/gtag/js", "./patch/null.js?https://www.googletagmanager.com/gtag/js");
    url= url.replace("https://script.google.com/macros/s/", "./patch/null.js?https://script.google.com/");

    // YYGGames
    url= url.replace("https://h5gamessdk.yyggames.com/sdk/YYGGames_modules/module_frogames/LayaEngineGame/module_forgames_LayaEngineGame.js", "./patch/yyggames/module_forgames_LayaEngineGameRS.js");

    // GameDistribution
    url= url.replace("https://html5.api.gamedistribution.com/main.min.js", "./patch/gamedistribution/main.js");

    url= url.replace("http://localhost:8080/", "./");

    ClonerLog("cloner-v2.ClonerURLPatch", original_url, url);
    return url;
}

var SendMessage= function() {
    ClonerLog("cloner-v2.SendMessage", arguments);
}


window.commercialBreak= function() {
    ClonerLog("cloner-v2.commercialBreak", arguments);
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
            return targetObj;
        }
    },
    set: function(target, property, receiver) {
        ClonerLog(`d0cum3nt.set.property--${property}--${receiver}--`);
        return true;
    }
});


var op3n= function() {
    console.trace(`cloner-v2.op3n--${arguments}--`);
    // window.open("https://ubg235.pages.dev/ads/");
    // alert("--fx--xopen--");
}


// Analytics JS
function loadJS(FILE_URL, async = true) {
    let scriptEle = document.createElement("script");

    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", async);

    document.body.appendChild(scriptEle);

    // Success
    scriptEle.addEventListener("load", () => {
        console.log("ubg235 served!");
    });

     // Error
    scriptEle.addEventListener("error", () => {
        console.log("ubg235 error!");
    });
}


window.addEventListener("load", function () {
    loadJS("https://ubg235.pages.dev/js/ubg235_game_v1.js", true);
});

