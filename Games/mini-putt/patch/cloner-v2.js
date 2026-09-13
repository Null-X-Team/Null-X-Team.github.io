const ClonerLog= console.log;

const OriginalWindowOpen= window.open;
window.open= function() {
    ClonerLog(arguments);
}

const OriginalEval= eval;
eval= function() {
    // ClonerLog("fx--eval--", arguments[0]);
    // debugger;
    arguments[0]= arguments[0].replace("aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==", "I3ViZzIzNQ==");
    arguments[0]= arguments[0].replace("'location'", "'xlocation'");
    arguments[0]= arguments[0].replace("document.location=", "document.location==");
    return OriginalEval.apply(this, arguments);
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
