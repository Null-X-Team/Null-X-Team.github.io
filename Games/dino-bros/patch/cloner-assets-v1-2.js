(function () {
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    const origFetch = window.fetch;

    const HOSTs= [
        "ubg67.gitlab.io",
        "ubg911.gitlab.io",
        "unblockedgamess3.gitlab.io",
    ];
    let FETCHs= [];
    const CLONER_URL= "https://gamecloner.wp235.workers.dev/";
    const HOST= (document.currentScript.src.split("://")?.[1]?? "").split("/")[0];
    const GROUP= (document.currentScript.src.split("?")?.[1]?? "").split("/")?.[1]?? "";
    const GAME= (document.currentScript.src.split("?")?.[1]?? "").split("/")?.[2]?? "";
    const GAME_SLUG= GAME.split("=")[0];
    const GAME_PATH= window.location.href.split("?")[0].split("&")[0];
    console.log(`cloner-assets HOST--${HOST}-- GROUP--${GROUP}-- GAME--${GAME}-- GAME_SLUG--${GAME_SLUG}--`);

    const AssetsFetch= function(url) {
        const ASSET_URL= url.replace(GAME_PATH, "");
        const FULL_ASSET_URL= `${CLONER_URL}${GROUP}/${GAME}/${ASSET_URL}`;
        if (url!= FULL_ASSET_URL && HOSTs.includes(HOST) && !FETCHs.includes(FULL_ASSET_URL)) {
            FETCHs.push(FULL_ASSET_URL);
            origFetch(FULL_ASSET_URL, {
                method: "GET",
                headers: {
                    "Client": "Cloner Assets"
                },
            }).catch(() => {
            });
            return FULL_ASSET_URL;
        }
        return url;
    }

    // XMLHttpRequest
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this._method = method;
        this._url = url;
        return origOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function(body) {
        const xhr = this;

        this.addEventListener("loadend", function() {
            if (xhr.status === 404) {
                AssetsFetch(xhr._url);
            }
        });
        return origSend.call(this, body);
    };

    // Fetch
    window.fetch = async function(input, init) {
        try {
            const response = await origFetch(input, init);
            if (response.status === 404) {
                const url= typeof input === "string"? input: input.url;
                AssetsFetch(url);
            }
            return response;
        } catch (err) {
            throw err;
        }
    };
})();
