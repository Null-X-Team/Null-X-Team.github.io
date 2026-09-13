(function() {
    const ClonerMonitorLog= console.log;
    const HOSTs= [
        "ubg9999.gitlab.io",
        "ubg1024.gitlab.io",
        "ubg66ez.gitlab.io",
        "ubg69.gitlab.io",
        "ubg1000.gitlab.io",
        "ubg6.gitlab.io",
        "ubg77.gitlab.io",
        "ubg76.gitlab.io",
        "ubg66.gitlab.io",
        "ubg6969.gitlab.io",
        "ubg67.gitlab.io",
        "ubg911.gitlab.io",
        "tyronegames.gitlab.io",
        "geometrygames.gitlab.io",
        "gameswtf.gitlab.io",
        "ubgmom.gitlab.io",
        "ubgw.gitlab.io",
        "class6x.gitlab.io",
        "cmug.gitlab.io",
        "unblockedgamess3.gitlab.io",
        "puzzlegames.gitlab.io",
        "cargames.gitlab.io",
        "2playergames.gitlab.io",
        "sportsgames.gitlab.io",
        "dressupgames.gitlab.io",
        "localhost:3000",
    ];
    const CLONER_URL= "https://gamecloner.wp235.workers.dev/";
    const HREF= document.currentScript.src;
    const SCHEME= HREF.split("://")[0];
    const HOST= (HREF.split("://")?.[1]?? "").split("/")[0];
    const GROUP= (HREF.split("?")?.[1]?? "").split("/")?.[1]?? "";
    const GAME= (HREF.split("?")?.[1]?? "").split("/")?.[2]?? "";
    const GAME_SLUG= GAME.split("=")[0];
    const GAME_PATH= `${HREF.split("?")[0].split("&")[0].split("patch/_cloner-monitor-v")[0]}`;
    let FETCHs= [];
    // ClonerMonitorLog(`ClonerMonitor HREF--${HREF}-- SCHEME--${SCHEME}-- HOST--${HOST}-- GROUP--${GROUP}-- GAME--${GAME}-- GAME_SLUG--${GAME_SLUG}-- GAME_PATH--${GAME_PATH}--`);

    new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // ClonerMonitorLog("PerformanceObserver", entry.name, entry);
            if (["fetch", "xmlhttprequest", "script", "img", "link", "audio", "video", "resource", "css"].includes(entry.initiatorType)) {
                if (entry.responseStatus== 404 || entry.responseStatus== 0) {
                    const url= entry.name;

                    const SCREENSHOTs= Array.from({ length: 9 }, (_, i) => [
                        `/screenshots/${i+1}-small.jpg`,
                        `/screenshots/${i+1}.jpg`,
                        `/screenshots/${i+1}.png`])
                        .flat();
                    if (SCREENSHOTs.some(s => url.endsWith(s))) {
                        ClonerMonitorLog("ClonerMonitor 404 SKIP SCREENSHOTs", entry.initiatorType, url);
                        break;
                    }

                    const SPECIALs= [
                        "/undefined",
                        "/null",
                    ];
                    if (SPECIALs.some(s => url.endsWith(s))) {
                        ClonerMonitorLog("ClonerMonitor 404 SKIP SPECIALs", entry.initiatorType, url);
                        break;
                    }

                    if (url.startsWith(CLONER_URL)) {
                        // ClonerMonitorLog("ClonerMonitor 404 SKIP", entry.initiatorType, url);
                        break;
                    }
                    const ASSET_URL= url.replace(GAME_PATH, "");
                    if (HOSTs.includes(HOST) && !ASSET_URL.startsWith("http://") && !ASSET_URL.startsWith("https://")) {
                        const FULL_ASSET_URL= `${CLONER_URL}${GROUP}/${GAME}/${ASSET_URL}`;
                        if (url!= FULL_ASSET_URL && !FETCHs.includes(FULL_ASSET_URL)) {
                            FETCHs.push(FULL_ASSET_URL);
                            ClonerMonitorLog("ClonerMonitor 404 Report", entry.initiatorType, FULL_ASSET_URL);
                            fetch(FULL_ASSET_URL, {
                                method: "GET",
                                headers: {
                                    "Client": "Cloner Assets"
                                },
                            });
                        }
                    }
                }
            }
        }
    }).observe({ type: "resource", buffered: true });
})();
