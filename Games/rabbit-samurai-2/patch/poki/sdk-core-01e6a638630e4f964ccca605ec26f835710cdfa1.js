( () => {
    var e = {
        721: () => {
            Promise.allSettled = Promise.allSettled || function(e) {
                return Promise.all(e.map((function(e) {
                    return e.then((function(e) {
                        return {
                            status: "fulfilled",
                            value: e
                        }
                    }
                    )).catch((function(e) {
                        return {
                            status: "rejected",
                            reason: e
                        }
                    }
                    ))
                }
                )))
            }
        }
        ,
        871: () => {
            var e = document.createElement("style");
            e.innerHTML = "\n\t".concat("\n\tcanvas{\n\t\ttouch-action: none;\n\t\t-webkit-touch-callout: none;\n\t\t-webkit-user-select: none;\n\t\t-moz-user-select: none;\n\t\t-ms-user-select: none;\n\t\tuser-select: none;\n\t}\n", "\n"),
            document.head.appendChild(e)
        }
    }
      , t = {};
    function n(i) {
        var o = t[i];
        if (void 0 !== o)
            return o.exports;
        var r = t[i] = {
            exports: {}
        };
        return e[i](r, r.exports, n),
        r.exports
    }
    ( () => {
        "use strict";
        const e = {
            ready: "pokiAppReady",
            adblocked: "pokiAppAdblocked",
            startLoading: "pokiAppStartLoading",
            ads: {
                startTimer: "pokiStartTimer",
                completed: "pokiAdsCompleted",
                error: "pokiAdsError",
                impression: "pokiAdsImpression",
                durationChange: "pokiAdsDurationChange",
                limit: "pokiAdsLimit",
                ready: "pokiAdsReady",
                requested: "pokiAdsRequested",
                prebidRequested: "pokiAdsPrebidRequested",
                skipped: "pokiAdsSkipped",
                started: "pokiAdsStarted",
                stopped: "pokiAdsStopped",
                busy: "pokiAdsBusy",
                loaded: "pokiAdsLoaded",
                position: {
                    preroll: "PP",
                    midroll: "PM",
                    rewarded: "PR",
                    display: "DP"
                },
                video: {
                    clicked: "pokiVideoAdsClicked",
                    firstQuartile: "pokiVideoAdsFirstQuartile",
                    midPoint: "pokiVideoAdsMidPoint",
                    thirdQuartile: "pokiVideoAdsThirdQuartile",
                    error: "pokiVideoAdsError",
                    loaderError: "pokiVideoAdsLoaderError",
                    paused: "pokiVideoAdsPauseTriggered",
                    resumed: "pokiVideoAdsResumedTriggered",
                    progress: "pokiVideoAdsProgress",
                    buffering: "pokiVideoAdsBuffering",
                    startHouseAdFlow: "pokiVideoAdsStartHouseAdFlow"
                },
                display: {
                    error: "pokiDisplayAdsError"
                },
                extendedVideoError: "pokiAdsExtendedVideoError"
            },
            info: {
                messages: {
                    timeLimit: "The ad-request was not processed, because of a time constraint",
                    prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll (PokiSDK.commercialBreak before PokiSDK.gameplayStart)",
                    disabled: "The ad-request was cancelled, because we've disabled this format for this specific configuration"
                }
            },
            playtest: {
                startVideo: "pokiPlaytestStartVideo",
                stopVideo: "pokiPlaytestStopVideo"
            },
            message: {
                event: "pokiMessageEvent",
                sdkDetails: "pokiMessageSdkDetails",
                setPokiURLParams: "pokiMessageSetPokiURLParams",
                sendGameScreenshot: "pokiMessageSendScreenshot",
                sendGameRawScreenshot: "pokiMessageSendRawScreenshot",
                sendUploadScreenshot: "pokiMessageSendUploadScreenshot",
                sendCommand: "pokiMessageSendCommand",
                sendInspectorEvent: "pokiMessageInspectorEvent",
                sendInspectorCookies: "pokiMessageSendInspectorCookies",
                sendInspectorConsole: "pokiMessageSendInspectorConsole",
                sendInspectorBadBehavior: "pokiMessageSendInspectorBadBehavior"
            },
            tracking: {
                custom: "pokiTrackingCustom",
                debugTrueInProduction: "pokiMessageDebugTrueProduction",
                screen: {
                    gameplayStart: "pokiTrackingScreenGameplayStart",
                    gameplayStop: "pokiTrackingScreenGameplayStop",
                    gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                    commercialBreak: "pokiTrackingScreenCommercialBreak",
                    rewardedBreak: "pokiTrackingScreenRewardedBreak",
                    firstRound: "pokiTrackingScreenFirstRound",
                    displayAd: "pokiTrackingScreenDisplayAdRequest",
                    destroyAd: "pokiTrackingScreenDisplayAdDestroy",
                    playerActive: "pokiTrackingScreenPlayerActive"
                },
                playtest: {
                    showModal: "pokiTrackingPlaytestShowModal",
                    accepted: "pokiTrackingPlaytestAccepted",
                    rejected: "pokiTrackingPlaytestRejected",
                    noCanvas: "pokiTrackingPlaytestNoCanvas",
                    notLoaded: "pokiTrackingPlaytestNotLoaded",
                    starting: "pokiTrackingPlaytestStarting",
                    closed: "pokiTrackingPlaytestClosed",
                    error: "pokiTrackingPlaytestError"
                },
                sdk: {
                    status: {
                        initialized: "pokiTrackingSdkStatusInitialized",
                        failed: "pokiTrackingSdkStatusFailed"
                    }
                },
                ads: {
                    ay: {
                        failed: "pokiTrackingAdsAYFailed"
                    },
                    status: {
                        busy: "pokiTrackingAdsStatusBusy",
                        completed: "pokiTrackingAdsStatusCompleted",
                        error: "pokiTrackingAdsStatusError",
                        impression: "pokiTrackingAdsStatusImpression",
                        limit: "pokiTrackingAdsStatusLimit",
                        ready: "pokiTrackingAdsStatusReady",
                        requested: "pokiTrackingAdsStatusRequested",
                        prebidRequested: "pokiTrackingAdsStatusPrebidRequested",
                        skipped: "pokiTrackingAdsStatusSkipped",
                        started: "pokiTrackingAdsStatusStarted",
                        buffering: "pokiTrackingAdsStatusBuffering"
                    },
                    video: {
                        clicked: "pokiTrackingAdsVideoClicked",
                        error: "pokiTrackingAdsVideoError",
                        loaderError: "pokiTrackingAdsVideoLoaderError",
                        progress: "pokiTrackingAdsVideoProgress",
                        paused: "pokiTrackingAdsVideoPaused",
                        resumed: "pokiTrackingAdsVideoResumed",
                        extendedVideoError: "pokiTrackingAdsVideoExtendedVideoError"
                    },
                    display: {
                        requested: "pokiTrackingScreenDisplayAdRequested",
                        impression: "pokiTrackingScreenDisplayAdImpression",
                        notFilled: "pokiTrackingAdsDisplayNotFilled"
                    },
                    rewardedWeb: {
                        request: "pokiTrackingRewardedWebRequest",
                        ready: "pokiTrackingRewardedWebReady",
                        impression: "pokiTrackingRewardedWebImpression",
                        closedGranted: "pokiTrackingRewardedWebClosedGranted",
                        closedDeclined: "pokiTrackingRewardedWebclosedDeclined",
                        empty: "pokiTrackingRewardedWebEmpty"
                    }
                }
            },
            accounts: {
                openAuthPanel: "pokiAccountsOpenAuthPanel",
                authPanelClosed: "pokiAccountsAuthPanelClosed"
            }
        };
        function t(e) {
            var t = new RegExp("".concat(e, "=([^;]+)(?:;|$)")).exec(document.cookie);
            return t ? t[1] : ""
        }
        function i(e, t, n) {
            document.cookie = "".concat(e, "=").concat(t, "; path=/; samesite=lax; max-age=").concat(Math.min(n || 15552e3, 15552e3))
        }
        function o() {
            for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
                t = String.fromCharCode(255 & e) + t,
                e >>= 8;
            if (window.crypto && crypto.getRandomValues && Uint32Array) {
                var i = new Uint32Array(12);
                crypto.getRandomValues(i);
                for (var o = 0; o < 12; o++)
                    t += String.fromCharCode(255 & i[o])
            } else
                for (var r = 0; r < 12; r++)
                    t += String.fromCharCode(Math.floor(256 * Math.random()));
            return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        }
        function r(e, t, n) {
            console.error(e);
            var i = [{
                k: "where",
                v: t
            }, {
                k: "error",
                v: e.name && e.message ? "".concat(e.name, ": ").concat(e.message) : JSON.stringify(e)
            }];
            if (void 0 !== n) {
                var o = n;
                "string" != typeof e && (o = JSON.stringify(e)),
                i.push({
                    k: "extra",
                    v: o
                })
            }
            !function(e, t) {
                fetch(e, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: t,
                    mode: "no-cors",
                    keepalive: !0,
                    credentials: "omit"
                }).catch((function(n) {
                    console.error(n);
                    try {
                        var i = "XMLHttpRequest"in window ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                        i.open("POST", e, !0),
                        i.setRequestHeader("Content-Type", "text/plain"),
                        i.send(t)
                    } catch (e) {}
                }
                ))
            }("https://t.poki.io/l", JSON.stringify({
                c: "observer-error",
                ve: 7,
                d: i
            }))
        }
        window._pokiUserGlobalName = window._pokiUserGlobalName || "user";
        var a = "poki_session";
        window._pokiSessionGlobalName = window._pokiSessionGlobalName || "session";
        var s = ["poki.at", "poki.be", "poki.by", "poki.ch", "poki.cn", "poki.co.id", "poki.co.il", "poki.com.br", "poki.com", "poki.cz", "poki.de", "poki.dk", "poki.fi", "poki.it", "poki.jp", "poki.nl", "poki.pl", "poki.pt", "poki.se", "www.trochoi.net"];
        function d() {
            try {
                var e = new URL(document.referrer).hostname;
                return s.indexOf(e) > -1 ? "poki" : e
            } catch (e) {}
            return ""
        }
        function c(e, t) {
            if (!e)
                return !1;
            if (!(e && e.page && e.landing_page && e.previous_page))
                return !1;
            if (!e.tab_id)
                return !1;
            if (!e.expire || Date.now() > e.expire)
                return !1;
            if (e.expire > Date.now() + 18e5)
                return !1;
            if (t) {
                if (void 0 !== e.referrer_domain) {
                    var n = d();
                    if ("poki" !== n && "authorize.roblox.com" !== n && "accounts.google.com" !== n && n !== e.referrer_domain)
                        return !1
                }
                var i = new URLSearchParams(window.location.search);
                if (["gclid", "msclkid", "yclid", "ttclid", "fbclid", "utm_campaign", "campaign", "adgroup", "creative", "utm_term"].some((function(e) {
                    return i.has(e)
                }
                )) || "web_app_manifest" === i.get("utm_source") || "bing" === i.get("utm_source") || "cpc" === i.get("utm_medium") || "rtb-cpm" === i.get("utm_medium"))
                    return !1
            }
            return !0
        }
        function l() {
            var e = null;
            c(window[window._pokiSessionGlobalName], !1) && (e = window[window._pokiSessionGlobalName]);
            try {
                var t = sessionStorage.getItem(a);
                if (t) {
                    var n = JSON.parse(t);
                    c(n, !0) && (!e || n.depth > e.depth) && (e = n)
                }
            } catch (e) {
                try {
                    r(e, "getSession", sessionStorage.getItem(a))
                } catch (t) {
                    r(e, "getSession", t)
                }
            }
            return e
        }
        function u() {
            var e = 0;
            window[window._pokiSessionGlobalName] && window[window._pokiSessionGlobalName].count && (e = window[window._pokiSessionGlobalName].count);
            try {
                var n = sessionStorage.getItem(a);
                if (n) {
                    var i = JSON.parse(n);
                    i && i.count && i.count > e && (e = i.count)
                }
            } catch (e) {
                try {
                    r(e, "getPreviousSessionCount", sessionStorage.getItem(a))
                } catch (t) {
                    r(e, "getPreviousSessionCount", t)
                }
            }
            try {
                var o = t(a);
                if (o) {
                    var s = JSON.parse(o);
                    s && s.count && s.count > e && (e = s.count)
                }
            } catch (e) {
                try {
                    r(e, "getPreviousSessionCount", t(a))
                } catch (t) {
                    r(e, "getPreviousSessionCount", t)
                }
            }
            return e
        }
        function p() {
            if (window[window._pokiSessionGlobalName] && window[window._pokiSessionGlobalName].tab_id)
                return window[window._pokiSessionGlobalName].tab_id;
            try {
                var e = sessionStorage.getItem(a);
                if (e) {
                    var t = JSON.parse(e);
                    if (t && t.tab_id)
                        return t.tab_id
                }
            } catch (e) {}
            return o()
        }
        function A() {
            var e = 0
              , n = l();
            n && (e = n.depth);
            try {
                var i = t(a);
                if (i) {
                    var o = JSON.parse(i);
                    !c(o, !0) || n && o.id !== n.id || (e = Math.max(e, o.depth))
                }
            } catch (e) {
                var s = null;
                try {
                    s = t(a) || null
                } catch (e) {}
                r(e, "getSessionDepth", s)
            }
            return e
        }
        const h = function(e, t) {
            var n = !1;
            return Object.keys(t).forEach((function(i) {
                t[i] === e && (n = !0)
            }
            )),
            n
        };
        var m = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "GB", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO"];
        function f(e) {
            return m.includes(e)
        }
        const v = function(e, t) {
            var n;
            if ("undefined" == typeof window && !t)
                return "";
            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var i = new RegExp("(?:[\\?&]|^)".concat(e, "=([^&#]*)")).exec(t || (null === (n = null === window || void 0 === window ? void 0 : window.location) || void 0 === n ? void 0 : n.search) || "");
            return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
        }
          , g = function() {
            return "undefined" != typeof navigator && /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera mini|avantgo|mobilesafari|docomo|kaios)/i.test(navigator.userAgent)
        }
          , b = function() {
            return "undefined" != typeof navigator && /(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))/i.test(navigator.userAgent)
        }
          , w = function() {
            return g() ? "mobile" : b() ? "tablet" : "desktop"
        };
        const y = function(e, t) {
            return void 0 === t && (t = !1),
            new Promise((function(n, i) {
                var o = document.createElement("script");
                o.type = t ? "module" : "text/javascript",
                o.async = !0,
                o.src = e;
                var r = function() {
                    o.readyState && "loaded" !== o.readyState && "complete" !== o.readyState || (n(),
                    o.onload = null,
                    o.onreadystatechange = null)
                };
                o.onload = r,
                o.onreadystatechange = r,
                o.onerror = i,
                document.head.appendChild(o)
            }
            ))
        };
        var k, x = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }, _ = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        !function(e) {
            e.ON = "on",
            e.NOT_APPLICABLE = "not_applicable",
            e.DISABLED = "disabled",
            e.PBS_ONLY = "pbs_only",
            e.DPF_ONLY = "dpf_only",
            e.CSTS_ONLY = "csts_only",
            e.PBS_DPF_CSTS = "pbs_dpf_csts"
        }(k || (k = {}));
        var I, S;
        function E() {
            var e;
            return [k.ON, k.PBS_DPF_CSTS, k.DPF_ONLY].includes(D.AYMode) && (null === (e = null === window || void 0 === window ? void 0 : window.assertive) || void 0 === e ? void 0 : e.addAmazonFloors)
        }
        function C() {
            return D.AYMode === k.PBS_ONLY || [k.ON, k.PBS_DPF_CSTS].includes(D.AYMode) && D.isPlayground && ["US", "CA", "DE", "BR", "FR", "AU", "MX", "JP", "ES", "CH", "PL", "KR", "GB", "BE", "IT", "AE", "NL", "SE", "DK", "SA", "NZ", "RO", "ZA", "TH", "AT", "NO", "MY", "CL", "SG", "CZ", "IL", "HU", "FI", "SK", "IE", "HK", "BG", "PT", "UY", "TW", "CR", "GR", "OM", "PR", "JO", "PA", "HR", "UZ", "KE", "KW", "LV", "LU", "SI", "EE", "MM", "QA", "LT", "BH", "IS", "JM", "TT", "NA", "MT", "BS", "MO", "AW", "AS", "VI", "KY", "LI", "BQ", "JE", "BM", "PW", "VG", "GG", "MP", "MC", "NU", "NF", "TV"].includes(D.country)
        }
        var P = v("url_referrer") || ""
          , T = {
            bot: "1" === v("bot"),
            categories: v("categories") || "",
            device: w(),
            experiment: v("experiment") || "",
            forceAd: v("force_ad") || !1,
            isPokiIframe: (parseInt(v("site_id"), 10) || 0) > 0,
            siteID: parseInt(v("site_id"), 10) || 3,
            tag: v("tag") || "",
            versionID: v("game_version_id"),
            debugMode: "true" === v("pokiDebug"),
            logMode: "" !== v("pokiLogging"),
            testVideos: "true" === v("testVideos"),
            referrer: P,
            isPlayground: !!window.isPokiPlayground,
            isInspector: "inspector-uploads.poki-user-content.com" === (null === (I = null === window || void 0 === window ? void 0 : window.location) || void 0 === I ? void 0 : I.host) || (null === (S = null === document || void 0 === document ? void 0 : document.referrer) || void 0 === S ? void 0 : S.includes("inspector.poki.dev")) || "1" === v("inspector"),
            houseAdsOnly: !1,
            ccpaApplies: v("ccpaApplies"),
            country: (v("country") || "").toUpperCase(),
            gameID: v("game_id"),
            gdprApplies: f((v("country") || "").toUpperCase()),
            contentGameID: void 0,
            specialCondition: v("special_condition"),
            iabcat: void 0,
            nonPersonalized: "y" === v("nonPersonalized"),
            familyFriendly: "y" === v("familyFriendly"),
            kioskMode: "y" === v("kioskMode") || !!(null === window || void 0 === window ? void 0 : window.kioskMode),
            forceBidder: v("force_bidder") || "",
            cloudSaveGames: "y" === v("cloudsavegames"),
            AYMode: k.ON,
            sourceChannelLP: "null|null|null"
        }
          , B = function(e, t) {
            T[e] = t
        };
        const D = T;
        const M = function() {
            function t() {}
            return t.sendMessage = function(t, n, i) {
                if (void 0 === i && (i = window.parent),
                !h(t, e.message)) {
                    var o = Object.keys(e.message).map((function(e) {
                        return "poki.message.".concat(e)
                    }
                    ));
                    throw new TypeError("Argument 'type' must be one of ".concat(o.join(", ")))
                }
                var r = n || {};
                D.gameID && D.versionID && (r.pokifordevs = {
                    game_id: D.gameID,
                    game_version_id: D.versionID
                }),
                null == i || i.postMessage({
                    type: t,
                    content: r
                }, "*")
            }
            ,
            t
        }();
        var O = function() {
            function e() {}
            return e.debug = !1,
            e.log = !1,
            e.init = function(t, n) {
                var i, o, r = window.location.hostname;
                void 0 === t && ("test" === (null === (o = null === (i = null === window || void 0 === window ? void 0 : window.process) || void 0 === i ? void 0 : i.env) || void 0 === o ? void 0 : o.NODE_ENV) ? (t = !1,
                void 0 === n && (n = !1)) : "localhost" === r || "127.0.0.1" === r || "[::1]" === r || "launch.playcanvas.com" === r ? (t = !0,
                void 0 === n && (n = !1)) : (t = !1,
                void 0 === n && (n = !1))),
                D.isInspector ? (t = !0,
                n = !0) : r.endsWith(".poki-gdn.com") && (t = !1,
                n = !1),
                D.debugMode && (t = !0),
                D.logMode && (n = !0),
                void 0 === n && (n = t),
                e.debug = t,
                e.log = n
            }
            ,
            e
        }();
        const L = O;
        var N = function(e) {
            var t = [];
            return Object.keys(e).forEach((function(n) {
                "object" == typeof e[n] ? t = t.concat(N(e[n])) : t.push(e[n])
            }
            )),
            t
        };
        const R = N;
        var z = function() {
            return z = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            z.apply(this, arguments)
        }
          , j = function() {
            function e() {}
            return e.clearEventListeners = function() {
                this.listeners = {}
            }
            ,
            e.removeEventListener = function(e, t) {
                if (Object.prototype.hasOwnProperty.call(this.listeners, e)) {
                    var n = this.listeners[e].indexOf(t);
                    -1 !== n && this.listeners[e].splice(n, 1)
                }
            }
            ,
            e.addEventListener = function(e, t, n) {
                var i = this;
                if (void 0 === n && (n = !1),
                n = !!n,
                Object.prototype.hasOwnProperty.call(this.listeners, e) || (this.listeners[e] = []),
                n) {
                    var o = function(n) {
                        i.removeEventListener.bind(i)(e, o),
                        t(n)
                    };
                    this.listeners[e].push(o)
                } else
                    this.listeners[e].push(t)
            }
            ,
            e.dispatchEvent = function(e, t) {
                var n, i;
                void 0 === t && (t = {}),
                L.debug && "test" !== (null === (i = null === (n = null === window || void 0 === window ? void 0 : window.process) || void 0 === n ? void 0 : n.env) || void 0 === i ? void 0 : i.NODE_ENV) && console.info("%cPOKI:%c", "font-weight: bold", "", e, t);
                for (var o = Object.keys(this.listeners), r = 0; r < o.length; r++) {
                    var a = o[r];
                    if (e === a)
                        for (var s = this.listeners[a], d = 0; d < s.length; d++)
                            s[d](z(z({}, this.videoDataAnnotations), t))
                }
            }
            ,
            e.addVideoDataAnnotations = function(e) {
                this.videoDataAnnotations = z(z({}, this.videoDataAnnotations), e)
            }
            ,
            e.getVideoDataAnnotations = function() {
                return this.videoDataAnnotations
            }
            ,
            e.clearVideoDataAnnotations = function() {
                this.videoDataAnnotations = {}
            }
            ,
            e.listeners = {},
            e.videoDataAnnotations = {},
            e
        }();
        const U = j;
        var F = function() {
            return F = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            F.apply(this, arguments)
        };
        const G = function(e) {
            var t;
            if ("undefined" != typeof window && "undefined" != typeof fetch) {
                var n = U.getVideoDataAnnotations()
                  , i = e.size;
                (null === (t = e.event) || void 0 === t ? void 0 : t.startsWith("video-")) && (i = "640x360v");
                var o = F(F({}, e), {
                    size: i,
                    adBreakId: e.adBreakId || n.adBreakId,
                    currentAdNumber: e.currentAdNumber || n.currentAdNumber,
                    totalAdAmount: e.totalAdAmount || n.totalAdAmount,
                    opportunity_id: e.opportunityId || n.opportunityId,
                    ad_unit_path: e.adUnitPath || n.adUnitPath,
                    p4d_game_id: D.gameID,
                    p4d_version_id: D.versionID,
                    bidder: e.bidder || n.bidder,
                    bid: e.bid || n.bid || 0,
                    error_code: e.errorCode,
                    creative_id: e.creativeId || n.creativeId,
                    experiment: D.experiment
                });
                L.debug ? console.info("%cPOKI:%c tracking", "font-weight: bold", "", o) : fetch("https://t.poki.io/adserver", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(o)
                })
            }
        };
        function V(e) {
            switch (Object.prototype.toString.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return e instanceof Error
            }
        }
        function H(e) {
            try {
                var t = new WeakSet;
                return JSON.stringify(e, (function(e, n) {
                    if ("object" == typeof n && null !== n) {
                        if (t.has(n))
                            return "[Circular]";
                        t.add(n)
                    }
                    return n
                }
                ))
            } catch (t) {
                try {
                    return e.toString()
                } catch (e) {
                    return "[Object]"
                }
            }
        }
        var q, Q = [], K = function(e) {
            var t = !1
              , n = 0;
            return function(i) {
                if (t)
                    n++;
                else {
                    t = !0,
                    setTimeout((function() {
                        t = !1
                    }
                    ), e);
                    var o = n;
                    n = 0,
                    i(o)
                }
            }
        }(100), W = console.error, Z = ["Audio callback had starved sending audio by"], X = !1, Y = Math.random().toString(36).substring(2);
        function J() {
            var e, t, n, i, o = window;
            return (null === (e = o.config) || void 0 === e ? void 0 : e.unityVersion) ? o.config.unityVersion : (null === (t = o.Phaser) || void 0 === t ? void 0 : t.VERSION) ? o.Phaser.VERSION : (null === (n = o.pc) || void 0 === n ? void 0 : n.version) ? o.pc.version : (null === (i = o.Module) || void 0 === i ? void 0 : i.engineVersion) ? o.Module.engineVersion : fi.__godotVersion ? fi.__godotVersion : void 0
        }
        function $(e, t) {
            void 0 === t && (t = !0),
            D.gameID && !D.isPlayground ? K((function(t) {
                try {
                    var n = e.message || H(e);
                    Q.push({
                        n: e.name,
                        m: n,
                        s: JSON.stringify(e.stack)
                    }),
                    q && q({
                        name: e.name,
                        message: n,
                        stack: e.stack
                    });
                    var i = JSON.stringify({
                        gid: D.gameID,
                        vid: D.versionID,
                        ve: 7,
                        n: e.name,
                        m: n + (t ? " (skipped ".concat(t, " errors)") : ""),
                        s: JSON.stringify(e.stack),
                        ui: Y,
                        ev: J()
                    })
                      , o = "https://t.poki.io/ge";
                    if (navigator.sendBeacon)
                        navigator.sendBeacon(o, i);
                    else {
                        var r = new XMLHttpRequest;
                        r.open("POST", o, !0),
                        r.send(i)
                    }
                } catch (e) {
                    W("%cPOKI:%c failed to log error", "font-weight: bold", "", e)
                }
            }
            )) : t && console.error("%cPOKI:%c game error", "font-weight: bold", "", e)
        }
        function ee(e) {
            V(e.reason) ? $(e.reason) : $({
                name: "unhandledrejection",
                message: JSON.stringify(e.reason) || H(e)
            })
        }
        function te(e) {
            V(e.error) ? $(e.error) : $(e)
        }
        function ne() {
            if (!X) {
                X = !0,
                window.addEventListener("unhandledrejection", ee),
                window.addEventListener("error", te);
                try {
                    console.error = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        var n = H(e);
                        Z.some((function(e) {
                            return n.includes(e)
                        }
                        )) || $({
                            name: "console.error",
                            message: n
                        }, !1),
                        W.apply(console, e)
                    }
                } catch (e) {}
            }
        }
        function ie() {
            if (X) {
                X = !1,
                window.removeEventListener("unhandledrejection", ee),
                window.removeEventListener("error", te);
                try {
                    console.error = W
                } catch (e) {}
            }
        }
        "undefined" == typeof window || D.isPlayground || ne();
        const oe = function() {
            for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
                t = String.fromCharCode(255 & e) + t,
                e >>= 8;
            if (window.crypto && crypto.getRandomValues && Uint32Array) {
                var i = new Uint32Array(12);
                crypto.getRandomValues(i);
                for (n = 0; n < 12; n++)
                    t += String.fromCharCode(255 & i[n])
            } else
                for (n = 0; n < 12; n++)
                    t += String.fromCharCode(Math.floor(256 * Math.random()));
            return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        };
        var re;
        !function(e) {
            e.SMALL = "small",
            e.MEDIUM = "medium",
            e.LARGE = "large"
        }(re || (re = {}));
        var ae = window.requestAnimationFrame;
        function se(e) {
            return Math.round(100 * e) / 100
        }
        var de = function() {
            function e(e) {
                var t = this;
                this.seconds = [],
                this.frameCounter = 0,
                Math.random() > e || (this.nextSecond = performance.now() + 1e3,
                ae((function() {
                    t.frame()
                }
                )))
            }
            return e.prototype.frame = function() {
                for (var e = this, t = performance.now(); t >= this.nextSecond; )
                    this.seconds.unshift(this.frameCounter),
                    this.seconds.length > 10 && this.seconds.pop(),
                    this.frameCounter = 0,
                    this.nextSecond += 1e3;
                this.frameCounter++,
                ae((function() {
                    e.frame()
                }
                ))
            }
            ,
            e.prototype.stats = function() {
                var e = this;
                if (0 !== this.seconds.length) {
                    var t = Math.min.apply(Math, this.seconds)
                      , n = Math.max.apply(Math, this.seconds)
                      , i = se(this.seconds.reduce((function(e, t) {
                        return e + t
                    }
                    ), 0) / this.seconds.length)
                      , o = se(this.seconds.slice(1).map((function(t, n) {
                        return Math.abs(t - e.seconds[n])
                    }
                    )).reduce((function(e, t) {
                        return e + t
                    }
                    ), 0) / (this.seconds.length - 1));
                    return Number.isNaN(o) && (o = 0),
                    "".concat(t, "|").concat(n, "|").concat(i, "|").concat(o)
                }
            }
            ,
            e
        }()
          , ce = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , le = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , ue = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , pe = Math.random().toString(36).substring(2);
        function Ae() {
            return ce(this, void 0, void 0, (function() {
                var e, t, n;
                return le(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        return [4, window.cookieStore.getAll()];
                    case 1:
                        return e = i.sent(),
                        window.indexedDB.databases ? [4, window.indexedDB.databases()] : [3, 3];
                    case 2:
                        return n = i.sent(),
                        [3, 4];
                    case 3:
                        n = [],
                        i.label = 4;
                    case 4:
                        return t = n,
                        [2, ue(ue(ue([], e.map((function(e) {
                            return {
                                name: e.name,
                                expire_seconds: Math.round((e.expires - Date.now()) / 1e3),
                                type: "cookie",
                                domain: e.domain
                            }
                        }
                        )), !0), Object.keys(window.localStorage).map((function(e) {
                            return {
                                name: e,
                                expire_seconds: 15552e3,
                                type: "localStorage"
                            }
                        }
                        )), !0), t.map((function(e) {
                            return {
                                name: e.name,
                                expire_seconds: 0,
                                type: "idb"
                            }
                        }
                        )), !0)]
                    }
                }
                ))
            }
            ))
        }
        var he = function() {
            function e() {}
            return e.collectAndLog = function() {
                return ce(this, void 0, void 0, (function() {
                    var e, t;
                    return le(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return n.trys.push([0, 2, , 3]),
                            t = {},
                            [4, Ae()];
                        case 1:
                            return t.cookies = n.sent(),
                            t.p4d_game_id = D.gameID,
                            t.user_id = pe,
                            e = t,
                            window.fetch("https://t.poki.io/game-cookies", {
                                method: "post",
                                body: JSON.stringify(e)
                            }).catch(),
                            [3, 3];
                        case 2:
                            return n.sent(),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.trackSavegames = function() {
                window.cookieStore && window.cookieStore.getAll && D.gameID && (Math.random() > .01 || navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1 || (e.collectAndLog(),
                setInterval(e.collectAndLog, 12e4)))
            }
            ,
            e
        }();
        const me = he;
        var fe = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , ve = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , ge = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        };
        var be, we = (be = 0,
        function() {
            return be += 1,
            "u".concat("0000".concat((0 | Math.pow(36 * Math.random(), 4)).toString(36)).slice(-4)).concat(be)
        }
        );
        function ye(e) {
            for (var t = [], n = 0, i = e.length; n < i; n++)
                t.push(e[n]);
            return t
        }
        function ke(e) {
            return "style"in e
        }
        var xe = function(e, t) {
            if (e instanceof t)
                return !0;
            var n = Object.getPrototypeOf(e);
            return null !== n && (n.constructor.name === t.name || xe(n, t))
        }
          , _e = new Set(["cx", "cy", "x", "y", "r", "rx", "ry", "d", "fill", "alignment-baseline", "baseline-shift", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-rendering", "dominant-baseline", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "glyph-orientation-horizontal", "glyph-orientation-vertical", "lighting-color", "marker-end", "marker-mid", "marker-start", "paint-order", "shape-rendering", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "vector-effect"])
          , Ie = {
            html: void 0,
            svg: void 0
        };
        function Se(e, t) {
            var n;
            void 0 === t && (t = {});
            var i = xe(e, SVGElement) ? "svg" : "html"
              , o = Ie[i];
            if (o)
                return o;
            var r = null !== (n = t.includeStyleProperties) && void 0 !== n ? n : ye(window.getComputedStyle(document.documentElement))
              , a = "html" === i ? r.filter((function(e) {
                return !_e.has(e)
            }
            )) : ge([], r, !0);
            return Ie[i] = a,
            a
        }
        function Ee(e, t) {
            var n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
            return n ? parseFloat(n.replace("px", "")) : 0
        }
        function Ce(e, t) {
            void 0 === t && (t = {});
            var n, i, o, r = t.width || (i = Ee(n = e, "border-left-width"),
            o = Ee(n, "border-right-width"),
            n.clientWidth + i + o), a = t.height || function(e) {
                var t = Ee(e, "border-top-width")
                  , n = Ee(e, "border-bottom-width");
                return e.clientHeight + t + n
            }(e);
            return {
                width: r,
                height: a
            }
        }
        var Pe = 16384;
        function Te(e) {
            return new Promise((function(t, n) {
                var i = new Image;
                i.decode = function() {
                    return t(i)
                }
                ,
                i.onload = function() {
                    return t(i)
                }
                ,
                i.onerror = n,
                i.crossOrigin = "anonymous",
                i.decoding = "async",
                i.src = e
            }
            ))
        }
        function Be(e) {
            return fe(this, void 0, void 0, (function() {
                return ve(this, (function(t) {
                    return [2, Promise.resolve().then((function() {
                        return (new XMLSerializer).serializeToString(e)
                    }
                    )).then(encodeURIComponent).then((function(e) {
                        return "data:image/svg+xml;charset=utf-8,".concat(e)
                    }
                    ))]
                }
                ))
            }
            ))
        }
        function De(e, t, n) {
            return fe(this, void 0, void 0, (function() {
                var i, o, r;
                return ve(this, (function(a) {
                    return i = "http://www.w3.org/2000/svg",
                    o = document.createElementNS(i, "svg"),
                    r = document.createElementNS(i, "foreignObject"),
                    o.setAttribute("width", "".concat(t)),
                    o.setAttribute("height", "".concat(n)),
                    o.setAttribute("viewBox", "0 0 ".concat(t, " ").concat(n)),
                    r.setAttribute("width", "100%"),
                    r.setAttribute("height", "100%"),
                    r.setAttribute("x", "0"),
                    r.setAttribute("y", "0"),
                    r.setAttribute("externalResourcesRequired", "true"),
                    o.appendChild(r),
                    r.appendChild(e),
                    [2, Be(o)]
                }
                ))
            }
            ))
        }
        function Me(e, t, n, i) {
            var o = ".".concat(e, ":").concat(t)
              , r = n.cssText ? function(e) {
                var t = e.getPropertyValue("content");
                return "".concat(e.cssText, " content: '").concat(t.replace(/'|"/g, ""), "';")
            }(n) : function(e, t) {
                return Se(document.documentElement, t).map((function(t) {
                    var n = e.getPropertyValue(t)
                      , i = e.getPropertyPriority(t);
                    return "".concat(t, ": ").concat(n).concat(i ? " !important" : "", ";")
                }
                )).join(" ")
            }(n, i);
            return document.createTextNode("".concat(o, "{").concat(r, "}"))
        }
        function Oe(e, t, n, i) {
            var o = window.getComputedStyle(e, n)
              , r = o.getPropertyValue("content");
            if ("" !== r && "none" !== r) {
                var a = we();
                try {
                    t.className = "".concat(t.className, " ").concat(a)
                } catch (e) {
                    return
                }
                var s = document.createElement("style");
                s.appendChild(Me(a, n, o, i)),
                t.appendChild(s)
            }
        }
        var Le = "application/font-woff"
          , Ne = "image/jpeg"
          , Re = {
            woff: Le,
            woff2: Le,
            ttf: "application/font-truetype",
            eot: "application/vnd.ms-fontobject",
            png: "image/png",
            jpg: Ne,
            jpeg: Ne,
            gif: "image/gif",
            tiff: "image/tiff",
            svg: "image/svg+xml",
            webp: "image/webp"
        };
        function ze(e) {
            var t = function(e) {
                var t = /\.([^./]*?)$/g.exec(e);
                return t ? t[1] : ""
            }(e).toLowerCase();
            return Re[t] || ""
        }
        var je = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Ue = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function Fe(e) {
            return -1 !== e.search(/^(data:)/)
        }
        function Ge(e, t) {
            return "data:".concat(t, ";base64,").concat(e)
        }
        function Ve(e, t, n) {
            return je(this, void 0, void 0, (function() {
                var i, o;
                return Ue(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return [4, fetch(e, t)];
                    case 1:
                        if (404 === (i = r.sent()).status)
                            throw new Error('Resource "'.concat(i.url, '" not found'));
                        return [4, i.blob()];
                    case 2:
                        return o = r.sent(),
                        [2, new Promise((function(e, t) {
                            var r = new FileReader;
                            r.onerror = t,
                            r.onloadend = function() {
                                try {
                                    e(n({
                                        res: i,
                                        result: r.result
                                    }))
                                } catch (e) {
                                    t(e)
                                }
                            }
                            ,
                            r.readAsDataURL(o)
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        var He = {};
        function qe(e, t, n) {
            return je(this, void 0, void 0, (function() {
                var i, o, r, a, s;
                return Ue(this, (function(d) {
                    switch (d.label) {
                    case 0:
                        if (i = function(e, t, n) {
                            var i = e.replace(/\?.*/, "");
                            return n && (i = e),
                            /ttf|otf|eot|woff2?/i.test(i) && (i = i.replace(/.*\//, "")),
                            t ? "[".concat(t, "]").concat(i) : i
                        }(e, t, n.includeQueryParams),
                        null != He[i])
                            return [2, He[i]];
                        n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (new Date).getTime()),
                        d.label = 1;
                    case 1:
                        return d.trys.push([1, 3, , 4]),
                        [4, Ve(e, n.fetchRequestInit, (function(e) {
                            var n = e.res
                              , i = e.result;
                            return t || (t = n.headers.get("Content-Type") || ""),
                            function(e) {
                                return e.split(/,/)[1]
                            }(i)
                        }
                        ))];
                    case 2:
                        return r = d.sent(),
                        o = Ge(r, t),
                        [3, 4];
                    case 3:
                        return a = d.sent(),
                        o = n.imagePlaceholder || "",
                        s = "Failed to fetch resource: ".concat(e),
                        a && (s = "string" == typeof a ? a : a.message),
                        s && console.warn("%cPOKI:%c failed to fetch resource", "font-weight: bold", "", s),
                        [3, 4];
                    case 4:
                        return He[i] = o,
                        [2, o]
                    }
                }
                ))
            }
            ))
        }
        var Qe = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Ke = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function We(e) {
            return Qe(this, void 0, void 0, (function() {
                var t, n;
                return Ke(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        try {
                            if (e.getContext("2d"))
                                return [2, Te(e.toDataURL())]
                        } catch (e) {}
                        return 0 === e.width || 0 === e.height ? [2, Te("data:,")] : ((t = document.createElement("canvas").getContext("2d", {
                            alpha: !0
                        })).canvas.width = e.width,
                        t.canvas.height = e.height,
                        n = t.getImageData(0, 0, t.canvas.width, t.canvas.height),
                        [4, new Promise((function(i) {
                            try {
                                requestAnimationFrame((function() {
                                    var o = document.createElement("canvas").getContext("webgl2")
                                      , r = o.createTexture()
                                      , a = o.createFramebuffer();
                                    o.bindTexture(o.TEXTURE_2D, r),
                                    o.bindFramebuffer(o.FRAMEBUFFER, a),
                                    o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, e),
                                    o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, r, 0),
                                    o.readPixels(0, 0, e.width, e.height, o.RGBA, o.UNSIGNED_BYTE, new Uint8Array(n.data.buffer)),
                                    t.putImageData(n, 0, 0),
                                    o.deleteTexture(r),
                                    o.deleteFramebuffer(a);
                                    var s = o.getExtension("WEBGL_lose_context");
                                    s && s.loseContext(),
                                    i(t.canvas.toDataURL())
                                }
                                ))
                            } catch (e) {
                                i("data:,")
                            }
                        }
                        ))]);
                    case 1:
                        return [2, Te(i.sent())]
                    }
                }
                ))
            }
            ))
        }
        function Ze(e, t) {
            return Qe(this, void 0, void 0, (function() {
                var n, i, o, r;
                return Ke(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return e.currentSrc ? (n = document.createElement("canvas"),
                        i = n.getContext("2d"),
                        n.width = e.clientWidth,
                        n.height = e.clientHeight,
                        null == i || i.drawImage(e, 0, 0, n.width, n.height),
                        [2, Te(n.toDataURL())]) : (o = e.poster,
                        r = ze(o),
                        [4, qe(o, r, t)]);
                    case 1:
                        return [2, Te(a.sent())]
                    }
                }
                ))
            }
            ))
        }
        function Xe(e, t) {
            return Qe(this, void 0, void 0, (function() {
                var n;
                return Ke(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        return i.trys.push([0, 3, , 4]),
                        (null === (n = null == e ? void 0 : e.contentDocument) || void 0 === n ? void 0 : n.body) ? [4, et(e.contentDocument.body, t, !0)] : [3, 2];
                    case 1:
                        return [2, i.sent()];
                    case 2:
                        return [3, 4];
                    case 3:
                        return i.sent(),
                        [3, 4];
                    case 4:
                        return [2, e.cloneNode(!1)]
                    }
                }
                ))
            }
            ))
        }
        var Ye = function(e) {
            var t;
            return "SLOT" === (null === (t = e.tagName) || void 0 === t ? void 0 : t.toUpperCase())
        }
          , Je = function(e) {
            return null != e.tagName && "SVG" === e.tagName.toUpperCase()
        };
        function $e(e, t, n) {
            return function(e, t, n) {
                var i = t.style;
                if (i) {
                    var o = window.getComputedStyle(e);
                    o.cssText ? (i.cssText = o.cssText,
                    i.transformOrigin = o.transformOrigin) : Se(e, n).forEach((function(n) {
                        var r = o.getPropertyValue(n);
                        if ("font-size" === n && r.endsWith("px")) {
                            var a = Math.floor(parseFloat(r.substring(0, r.length - 2))) - .1;
                            r = "".concat(a, "px")
                        }
                        xe(e, HTMLIFrameElement) && "display" === n && "inline" === r && (r = "block"),
                        "d" === n && t.getAttribute("d") && (r = "path(".concat(t.getAttribute("d"), ")")),
                        i.setProperty(n, r, o.getPropertyPriority(n))
                    }
                    ))
                }
            }(e, t, n),
            xe(e, HTMLElement) && xe(t, HTMLElement) && (function(e, t) {
                xe(e, HTMLTextAreaElement) && (t.innerHTML = e.value),
                xe(e, HTMLInputElement) && t.setAttribute("value", e.value)
            }(e, t),
            function(e, t) {
                if (xe(e, HTMLSelectElement)) {
                    var n = t
                      , i = Array.from(n.children).find((function(t) {
                        return e.value === t.getAttribute("value")
                    }
                    ));
                    i && i.setAttribute("selected", "")
                }
            }(e, t),
            function(e, t, n) {
                Oe(e, t, ":before", n),
                Oe(e, t, ":after", n)
            }(e, t, n),
            n.patchScroll) ? function(e, t) {
                if (0 === e.scrollTop && 0 === e.scrollLeft || !t.children)
                    return t;
                for (var n = 0; n < t.children.length; n += 1) {
                    var i = t.children[n];
                    if (i.children) {
                        var o = i.style.transform
                          , r = new DOMMatrix(o)
                          , a = r.a
                          , s = r.b
                          , d = r.c
                          , c = r.d;
                        r.a = 1,
                        r.b = 0,
                        r.c = 0,
                        r.d = 1,
                        r.translateSelf(-e.scrollLeft, -e.scrollTop),
                        r.a = a,
                        r.b = s,
                        r.c = d,
                        r.d = c,
                        i.style.transform = r.toString()
                    }
                }
                return t
            }(e, t) : t
        }
        function et(e, t, n) {
            return Qe(this, void 0, void 0, (function() {
                return Ke(this, (function(i) {
                    return n || !t.filter || t.filter(e) ? ke(e) ? [2, Promise.resolve(e).then((function(e) {
                        return function(e, t) {
                            return Qe(this, void 0, void 0, (function() {
                                return Ke(this, (function(n) {
                                    return xe(e, HTMLCanvasElement) ? [2, We(e)] : xe(e, HTMLVideoElement) ? [2, Ze(e, t)] : xe(e, HTMLIFrameElement) ? [2, Xe(e, t)] : [2, e.cloneNode(Je(e))]
                                }
                                ))
                            }
                            ))
                        }(e, t)
                    }
                    )).then((function(n) {
                        return function(e, t, n) {
                            return Qe(this, void 0, void 0, (function() {
                                var i, o, r;
                                return Ke(this, (function(a) {
                                    switch (a.label) {
                                    case 0:
                                        return Je(t) ? [2, t] : (i = [],
                                        0 === (i = Ye(e) && e.assignedNodes ? ye(e.assignedNodes()) : xe(e, HTMLIFrameElement) && (null === (o = e.contentDocument) || void 0 === o ? void 0 : o.body) ? ye(e.contentDocument.body.childNodes) : ye(("shadowRoot"in e && null !== (r = e.shadowRoot) && void 0 !== r ? r : e).childNodes)).length || xe(e, HTMLVideoElement) ? [2, t] : [4, i.reduce((function(e, i) {
                                            return e.then((function() {
                                                return et(i, n)
                                            }
                                            )).then((function(e) {
                                                e && t.appendChild(e)
                                            }
                                            ))
                                        }
                                        ), Promise.resolve())]);
                                    case 1:
                                        return a.sent(),
                                        [2, t]
                                    }
                                }
                                ))
                            }
                            ))
                        }(e, n, t)
                    }
                    )).then((function(n) {
                        return $e(e, n, t)
                    }
                    )).then((function(e) {
                        return function(e, t) {
                            return Qe(this, void 0, void 0, (function() {
                                var n, i, o, r, a, s, d, c, l, u, p, A, h;
                                return Ke(this, (function(m) {
                                    switch (m.label) {
                                    case 0:
                                        if (0 === (n = e.querySelectorAll ? e.querySelectorAll("use") : []).length)
                                            return [2, e];
                                        i = {},
                                        h = 0,
                                        m.label = 1;
                                    case 1:
                                        return h < n.length ? (o = n[h],
                                        (r = o.getAttribute("xlink:href")) ? (a = e.querySelector(r),
                                        s = document.querySelector(r),
                                        a || !s || i[r] ? [3, 3] : (d = i,
                                        c = r,
                                        [4, et(s, t, !0)])) : [3, 3]) : [3, 4];
                                    case 2:
                                        d[c] = m.sent(),
                                        m.label = 3;
                                    case 3:
                                        return h++,
                                        [3, 1];
                                    case 4:
                                        if ((l = Object.values(i)).length) {
                                            for (u = "http://www.w3.org/1999/xhtml",
                                            (p = document.createElementNS(u, "svg")).setAttribute("xmlns", u),
                                            p.style.position = "absolute",
                                            p.style.width = "0",
                                            p.style.height = "0",
                                            p.style.overflow = "hidden",
                                            p.style.display = "none",
                                            A = document.createElementNS(u, "defs"),
                                            p.appendChild(A),
                                            h = 0; h < l.length; h++)
                                                A.appendChild(l[h]);
                                            e.appendChild(p)
                                        }
                                        return [2, e]
                                    }
                                }
                                ))
                            }
                            ))
                        }(e, t)
                    }
                    ))] : [2, e.cloneNode(!1)] : [2, null]
                }
                ))
            }
            ))
        }
        var tt = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , nt = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , it = /url\((['"]?)([^'"]+?)\1\)/g
          , ot = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g
          , rt = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
        function at(e, t, n, i, o) {
            return tt(this, void 0, void 0, (function() {
                var r, a, s, d;
                return nt(this, (function(c) {
                    switch (c.label) {
                    case 0:
                        return c.trys.push([0, 5, , 6]),
                        r = n ? function(e, t) {
                            if (e.match(/^[a-z]+:\/\//i))
                                return e;
                            if (e.match(/^\/\//))
                                return window.location.protocol + e;
                            if (e.match(/^[a-z]+:/i))
                                return e;
                            var n = document.implementation.createHTMLDocument()
                              , i = n.createElement("base")
                              , o = n.createElement("a");
                            return n.head.appendChild(i),
                            n.body.appendChild(o),
                            t && (i.href = t),
                            o.href = e,
                            o.href
                        }(t, n) : t,
                        a = ze(t),
                        s = void 0,
                        o ? [4, o(r)] : [3, 2];
                    case 1:
                        return d = c.sent(),
                        s = Ge(d, a),
                        [3, 4];
                    case 2:
                        return [4, qe(r, a, i)];
                    case 3:
                        s = c.sent(),
                        c.label = 4;
                    case 4:
                        return [2, e.replace((l = t,
                        u = l.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
                        new RegExp("(url\\(['\"]?)(".concat(u, ")(['\"]?\\))"),"g")), "$1".concat(s, "$3"))];
                    case 5:
                        return c.sent(),
                        [3, 6];
                    case 6:
                        return [2, e]
                    }
                    var l, u
                }
                ))
            }
            ))
        }
        function st(e) {
            return -1 !== e.search(it)
        }
        function dt(e, t, n) {
            return tt(this, void 0, void 0, (function() {
                var i, o;
                return nt(this, (function(r) {
                    return st(e) ? (i = function(e, t) {
                        var n = t.preferredFontFormat;
                        return n ? e.replace(rt, (function(e) {
                            for (; ; ) {
                                var t = ot.exec(e) || []
                                  , i = t[0]
                                  , o = t[2];
                                if (!o)
                                    return "";
                                if (o === n)
                                    return "src: ".concat(i, ";")
                            }
                        }
                        )) : e
                    }(e, n),
                    o = function(e) {
                        var t = [];
                        return e.replace(it, (function(e, n, i) {
                            return t.push(i),
                            e
                        }
                        )),
                        t.filter((function(e) {
                            return !Fe(e)
                        }
                        ))
                    }(i),
                    [2, o.reduce((function(e, i) {
                        return e.then((function(e) {
                            return at(e, i, t, n)
                        }
                        ))
                    }
                    ), Promise.resolve(i))]) : [2, e]
                }
                ))
            }
            ))
        }
        var ct = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , lt = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function ut(e, t, n) {
            return ct(this, void 0, void 0, (function() {
                var i, o, r;
                return lt(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return (i = null === (r = t.style) || void 0 === r ? void 0 : r.getPropertyValue(e)) ? [4, dt(i, null, n)] : [3, 2];
                    case 1:
                        return o = a.sent(),
                        t.style.setProperty(e, o, t.style.getPropertyPriority(e)),
                        [2, !0];
                    case 2:
                        return [2, !1]
                    }
                }
                ))
            }
            ))
        }
        function pt(e, t) {
            return ct(this, void 0, void 0, (function() {
                return lt(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, ut("background", e, t)];
                    case 1:
                        return n.sent() ? [3, 3] : [4, ut("background-image", e, t)];
                    case 2:
                        n.sent(),
                        n.label = 3;
                    case 3:
                        return [4, ut("mask", e, t)];
                    case 4:
                        return n.sent() ? [3, 6] : [4, ut("mask-image", e, t)];
                    case 5:
                        n.sent(),
                        n.label = 6;
                    case 6:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        function At(e, t) {
            return ct(this, void 0, void 0, (function() {
                var n, i, o, r;
                return lt(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return n = xe(e, HTMLImageElement),
                        i = xe(e, SVGImageElement),
                        n && !Fe(e.src) || i && !Fe(e.href.baseVal) ? [4, qe(o = n ? e.src : e.href.baseVal, ze(o), t)] : [2];
                    case 1:
                        return r = a.sent(),
                        [4, new Promise((function(t, i) {
                            e.onload = t,
                            e.onerror = i;
                            var o = e;
                            o.decode && (o.decode = t),
                            "lazy" === o.loading && (o.loading = "eager"),
                            n ? (e.srcset = "",
                            e.src = r) : e.href.baseVal = r
                        }
                        ))];
                    case 2:
                        return a.sent(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        function ht(e, t) {
            return ct(this, void 0, void 0, (function() {
                var n, i;
                return lt(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return n = ye(e.childNodes),
                        i = n.map((function(e) {
                            return mt(e, t)
                        }
                        )),
                        [4, Promise.all(i).then((function() {
                            return e
                        }
                        ))];
                    case 1:
                        return o.sent(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        function mt(e, t) {
            return ct(this, void 0, void 0, (function() {
                return lt(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return ke(e) ? [4, pt(e, t)] : [3, 4];
                    case 1:
                        return n.sent(),
                        [4, At(e, t)];
                    case 2:
                        return n.sent(),
                        [4, ht(e, t)];
                    case 3:
                        n.sent(),
                        n.label = 4;
                    case 4:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var ft = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , vt = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , gt = {};
        function bt(e) {
            return ft(this, void 0, void 0, (function() {
                var t, n;
                return vt(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        return null != (t = gt[e]) ? [2, t] : [4, fetch(e)];
                    case 1:
                        return [4, i.sent().text()];
                    case 2:
                        return n = i.sent(),
                        t = {
                            url: e,
                            cssText: n
                        },
                        gt[e] = t,
                        [2, t]
                    }
                }
                ))
            }
            ))
        }
        function wt(e, t) {
            return ft(this, void 0, void 0, (function() {
                var n, i, o, r, a = this;
                return vt(this, (function(s) {
                    return n = e.cssText,
                    i = /url\(["']?([^"')]+)["']?\)/g,
                    o = n.match(/url\([^)]+\)/g) || [],
                    r = o.map((function(o) {
                        return ft(a, void 0, void 0, (function() {
                            var r;
                            return vt(this, (function(a) {
                                return (r = o.replace(i, "$1")).startsWith("https://") || (r = new URL(r,e.url).href),
                                [2, Ve(r, t.fetchRequestInit, (function(e) {
                                    var t = e.result;
                                    return n = n.replace(o, "url(".concat(t, ")")),
                                    [o, t]
                                }
                                ))]
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    [2, Promise.all(r).then((function() {
                        return n
                    }
                    ))]
                }
                ))
            }
            ))
        }
        function yt(e) {
            if (null == e)
                return [];
            for (var t = [], n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, ""), i = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi"); ; ) {
                if (null === (a = i.exec(n)))
                    break;
                t.push(a[0])
            }
            n = n.replace(i, "");
            for (var o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, r = new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi"); ; ) {
                var a;
                if (null === (a = o.exec(n))) {
                    if (null === (a = r.exec(n)))
                        break;
                    o.lastIndex = r.lastIndex
                } else
                    r.lastIndex = o.lastIndex;
                t.push(a[0])
            }
            return t
        }
        function kt(e, t) {
            return ft(this, void 0, void 0, (function() {
                var n, i;
                return vt(this, (function(o) {
                    return n = [],
                    i = [],
                    e.forEach((function(n) {
                        if ("cssRules"in n)
                            try {
                                ye(n.cssRules || []).forEach((function(e, o) {
                                    if (e instanceof CSSImportRule) {
                                        var r = o + 1
                                          , a = bt(e.href).then((function(e) {
                                            return wt(e, t)
                                        }
                                        )).then((function(e) {
                                            return yt(e).forEach((function(e) {
                                                try {
                                                    n.insertRule(e, e.startsWith("@import") ? r += 1 : n.cssRules.length)
                                                } catch (t) {
                                                    console.error("Error inserting rule from remote css", {
                                                        rule2: e,
                                                        err: t
                                                    })
                                                }
                                            }
                                            ))
                                        }
                                        )).catch((function(e) {
                                            console.error("Error loading remote css", e.toString())
                                        }
                                        ));
                                        i.push(a)
                                    }
                                }
                                ))
                            } catch (r) {
                                var o = e.find((function(e) {
                                    return null == e.href
                                }
                                )) || document.styleSheets[0];
                                null != n.href && i.push(bt(n.href).then((function(e) {
                                    return wt(e, t)
                                }
                                )).then((function(e) {
                                    return yt(e).forEach((function(e) {
                                        o.insertRule(e, o.cssRules.length)
                                    }
                                    ))
                                }
                                )).catch((function(e) {
                                    console.error("Error loading remote stylesheet", e)
                                }
                                ))),
                                console.error("Error inlining remote css file", r)
                            }
                    }
                    )),
                    [2, Promise.all(i).then((function() {
                        return e.forEach((function(e) {
                            if ("cssRules"in e)
                                try {
                                    ye(e.cssRules || []).forEach((function(e) {
                                        n.push(e)
                                    }
                                    ))
                                } catch (t) {
                                    console.error("Error while reading CSS rules from ".concat(e.href), t)
                                }
                        }
                        )),
                        n
                    }
                    ))]
                }
                ))
            }
            ))
        }
        function xt(e) {
            return e.filter((function(e) {
                return e instanceof CSSFontFaceRule
            }
            )).filter((function(e) {
                return st(e.style.getPropertyValue("src"))
            }
            ))
        }
        function _t(e, t) {
            return ft(this, void 0, void 0, (function() {
                return vt(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        if (null == e.ownerDocument)
                            throw new Error("Provided element is not within a Document");
                        return [4, kt(ye(e.ownerDocument.styleSheets), t)];
                    case 1:
                        return [2, xt(n.sent())]
                    }
                }
                ))
            }
            ))
        }
        function It(e, t) {
            return ft(this, void 0, void 0, (function() {
                var n;
                return vt(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        return [4, _t(e, t)];
                    case 1:
                        return n = i.sent(),
                        [4, Promise.all(n.map((function(e) {
                            var n = e.parentStyleSheet ? e.parentStyleSheet.href : null;
                            return dt(e.cssText, n, t)
                        }
                        )))];
                    case 2:
                        return [2, i.sent().join("\n")]
                    }
                }
                ))
            }
            ))
        }
        function St(e, t) {
            return ft(this, void 0, void 0, (function() {
                var n, i, o, r, a;
                return vt(this, (function(s) {
                    switch (s.label) {
                    case 0:
                        return null == t.fontEmbedCSS ? [3, 1] : (i = t.fontEmbedCSS,
                        [3, 5]);
                    case 1:
                        return t.skipFonts ? (o = null,
                        [3, 4]) : [3, 2];
                    case 2:
                        return [4, It(e, t)];
                    case 3:
                        o = s.sent(),
                        s.label = 4;
                    case 4:
                        i = o,
                        s.label = 5;
                    case 5:
                        return (n = i) && (r = document.createElement("style"),
                        a = document.createTextNode(n),
                        r.appendChild(a),
                        e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r)),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        var Et = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Ct = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function Pt(e) {
            return Et(this, arguments, void 0, (function(e, t) {
                var n, i, o, r;
                return void 0 === t && (t = {}),
                Ct(this, (function(a) {
                    switch (a.label) {
                    case 0:
                        return n = Ce(e, t),
                        i = n.width,
                        o = n.height,
                        [4, et(e, t, !0)];
                    case 1:
                        return [4, St(r = a.sent(), t)];
                    case 2:
                        return a.sent(),
                        [4, mt(r, t)];
                    case 3:
                        return a.sent(),
                        function(e, t) {
                            var n = e.style;
                            t.backgroundColor && (n.backgroundColor = t.backgroundColor),
                            t.width && (n.width = "".concat(t.width, "px")),
                            t.height && (n.height = "".concat(t.height, "px"));
                            var i = t.style;
                            null != i && Object.keys(i).forEach((function(e) {
                                n[e] = i[e]
                            }
                            ))
                        }(r, t),
                        [4, De(r, i, o)];
                    case 4:
                        return [2, a.sent()]
                    }
                }
                ))
            }
            ))
        }
        function Tt(e) {
            return Et(this, arguments, void 0, (function(e, t) {
                var n, i, o, r, a, s, d, c, l;
                return void 0 === t && (t = {}),
                Ct(this, (function(u) {
                    switch (u.label) {
                    case 0:
                        return n = Ce(e, t),
                        i = n.width,
                        o = n.height,
                        [4, Pt(e, t)];
                    case 1:
                        return [4, Te(u.sent())];
                    case 2:
                        return r = u.sent(),
                        a = document.createElement("canvas"),
                        s = a.getContext("2d"),
                        d = window.devicePixelRatio || 1,
                        c = t.canvasWidth || i,
                        l = t.canvasHeight || o,
                        a.width = c * d,
                        a.height = l * d,
                        t.skipAutoScale || function(e) {
                            (e.width > Pe || e.height > Pe) && (e.width > Pe && e.height > Pe ? e.width > e.height ? (e.height *= Pe / e.width,
                            e.width = Pe) : (e.width *= Pe / e.height,
                            e.height = Pe) : e.width > Pe ? (e.height *= Pe / e.width,
                            e.width = Pe) : (e.width *= Pe / e.height,
                            e.height = Pe))
                        }(a),
                        a.style.width = "".concat(c),
                        a.style.height = "".concat(l),
                        t.backgroundColor && (s.fillStyle = t.backgroundColor,
                        s.fillRect(0, 0, a.width, a.height)),
                        s.drawImage(r, 0, 0, a.width, a.height),
                        [2, a]
                    }
                }
                ))
            }
            ))
        }
        function Bt(e) {
            return Et(this, arguments, void 0, (function(e, t) {
                return void 0 === t && (t = {}),
                Ct(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, Tt(e, t)];
                    case 1:
                        return [2, n.sent().toDataURL()]
                    }
                }
                ))
            }
            ))
        }
        var Dt = "pokiSdkContainer"
          , Mt = "pokiSdkFixed"
          , Ot = "pokiSdkOverlay"
          , Lt = "pokiSdkHidden"
          , Nt = "pokiSdkInsideContainer"
          , Rt = "pokiSdkPauseButtonContainer"
          , zt = "pokiSdkPauseButton"
          , jt = "pokiSdkPauseButtonBG"
          , Ut = "pokiSdkStartAdButton"
          , Ft = "pokiSdkProgressBar"
          , Gt = "pokiSdkProgressContainer"
          , Vt = "pokiSdkSpinnerContainer"
          , Ht = "pokiSdkVideoContainer"
          , qt = "pokiSdkVisible"
          , Qt = "pokiSDKAdContainer"
          , Kt = "pokiSDKHouseAdContainer"
          , Wt = "pokiSDKNrAdsContainer"
          , Zt = "\n.".concat(Dt, " {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.").concat(Dt, ".").concat(Mt, " {\n\tposition: fixed;\n}\n\n.").concat(Dt, ".").concat(qt, " {\n\tdisplay: block;\n}\n\n.").concat(Dt, ".").concat(Lt, ",\n.").concat(Vt, ".").concat(Lt, " {\n\tdisplay: none;\n}\n\n.").concat(Dt, ".").concat(Lt, ",\n.").concat(Vt, " {\n\tpointer-events: none;\n}\n\n.").concat(Vt, " {\n\tz-index: 10;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url('https://a.poki-cdn.com/images/thumb_anim_2x.gif') 50% 50% no-repeat;\n\tuser-select: none;\n}\n\n.").concat(Nt, " {\n\tbackground: #000;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\n\topacity: 0;\n\t-webkit-transition: opacity 0.5s ease-in-out;\n\t-moz-transition: opacity 0.5s ease-in-out;\n\t-ms-transition: opacity 0.5s ease-in-out;\n\t-o-transition: opacity 0.5s ease-in-out;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.").concat(Dt, ".").concat(qt, " .").concat(Nt, " {\n\topacity: 1;\n}\n\n.").concat(Qt, ", .").concat(Ht, " {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.").concat(Ut, " {\n\tposition: absolute;\n\tz-index: 9999;\n\ttop: 0;\n\n\tpadding-top: 10%;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tcolor: #FFF;\n\n\tfont: 700 15pt 'Arial', sans-serif;\n\tfont-weight: bold;\n\tletter-spacing: 1px;\n\ttransition: 0.1s ease-in-out;\n\tline-height: 1em;\n}\n\n.").concat(Rt, " {\n\tcursor:pointer;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 10;\n}\n\n.").concat(jt, " {\n    content: '';\n    background: rgba(0, 43, 80, 0.5);\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\tz-index: 11;\n}\n\n.").concat(Rt, ":hover .").concat(jt, " {\n\tbackground: rgba(0, 43, 80, 0.7);\n}\n\n.").concat(zt, " {\n\tposition: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 12;\n}\n\n.").concat(zt, ":before {\n\tcontent: '';\n\tposition: absolute;\n\twidth: 100px;\n\theight: 100px;\n\tdisplay: block;\n\tborder: 2px solid #fff;\n\tborder-radius: 50%;\n\tuser-select: none;\n\tbackground-color: rgba(0, 0, 0, 0.6);\n\ttransition: background-color 0.5s ease;\n\tanimation: 1s linear infinite pokiPulse;\n\tz-index: 12;\n}\n\n.").concat(zt, ":after {\n\tcontent: '';\n\tposition: absolute;\n\tdisplay: block;\n\tbox-sizing: border-box;\n\tborder-color: transparent transparent transparent #fff;\n\tborder-style: solid;\n\tborder-width: 26px 0 26px 40px;\n\tpointer-events: none;\n\tanimation: 1s linear infinite pokiPulse;\n\tleft: 6px;\n\tz-index: 12;\n}\n\n@keyframes pokiPulse {\n\t0% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n\t70% {\n\t\ttransform: translate(-50%, -50%) scale(1.1);\n\t}\n\t100% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n}\n\n.").concat(Gt, " {\n\tbackground: #B8C7DD;\n\twidth: 100%;\n\theight: 5px;\n\tposition: absolute;\n\tbottom: 0;\n\tz-index: 9999;\n}\n\n.").concat(Ft, " {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #FFDC00;\n\theight: 100%;\n\twidth: 0%;\n\ttransition: width 0.5s;\n\ttransition-timing-function: linear;\n}\n\n.").concat(Ft, ".").concat(qt, ", .").concat(Rt, ".").concat(qt, ", .").concat(Ut, ".").concat(qt, " {\n\tdisplay: block;\n\tpointer-events: auto;\n}\n\n.").concat(Ft, ".").concat(Lt, ", .").concat(Rt, ".").concat(Lt, ", .").concat(Ut, ".").concat(Lt, ", .").concat(Wt, ".").concat(Lt, " {\n\tdisplay: none;\n\tpointer-events: none;\n}\n\n.").concat(Qt, " .").concat(Kt, " {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 99999;\n\tcursor: pointer;\n}\n\n.").concat(Wt, " {\n\tbottom: 10px;\n\tposition: absolute;\n\tleft: 10px;\n\tz-index: 9999;\n\tcolor: #FFF;\n\tfont: 700 9pt 'Arial', sans-serif;\n\tfilter: drop-shadow(0 0 0.2rem black);\n}\n\n")
          , Xt = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Yt = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , Jt = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , $t = function(e) {
            return Xt(void 0, void 0, void 0, (function() {
                var t, n, i, o;
                return Yt(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return t = e.screenshot,
                        n = "https://poki-user-content.com/",
                        [4, fetch("https://api.poki.io/screenshot", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                data: t,
                                p4d_game_id: D.gameID,
                                p4d_version_id: D.versionID
                            })
                        })];
                    case 1:
                        i = r.sent(),
                        r.label = 2;
                    case 2:
                        return r.trys.push([2, 5, , 6]),
                        200 !== i.status ? [3, 4] : [4, i.json()];
                    case 3:
                        return o = r.sent(),
                        [2, n + o.source];
                    case 4:
                        return [3, 6];
                    case 5:
                        return r.sent(),
                        [3, 6];
                    case 6:
                        return [2, null]
                    }
                }
                ))
            }
            ))
        }
          , en = function() {
            return Xt(void 0, void 0, void 0, (function() {
                var e, t, n, i, o;
                return Yt(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return e = function(e) {
                            var t;
                            return !["VIDEO", "TEXTAREA", "SCRIPT", "NOSCRIPT", "INPUT", "IFRAME"].includes(e.nodeName) && (!("IMG" === e.nodeName && !e.getAttribute("src")) && !(null === (t = e.classList) || void 0 === t ? void 0 : t.contains(Dt)))
                        }
                        ,
                        t = document.body.style.minWidth,
                        n = document.body.style.minHeight,
                        document.body.style.minWidth = "100%",
                        document.body.style.minHeight = "100%",
                        [4, Bt(document.body, {
                            filter: e,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            backgroundColor: "#fff"
                        })];
                    case 1:
                        return (i = r.sent()) && i.length < 10 ? (o = document.body.style.position,
                        document.body.style.position = "fixed",
                        [4, Bt(document.body, {
                            filter: e,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            backgroundColor: "#fff"
                        })]) : [3, 3];
                    case 2:
                        i = r.sent(),
                        document.body.style.position = o,
                        r.label = 3;
                    case 3:
                        return document.body.style.minWidth = t,
                        document.body.style.minHeight = n,
                        [2, i]
                    }
                }
                ))
            }
            ))
        }
          , tn = function(e, t) {
            return Xt(void 0, void 0, void 0, (function() {
                var n, i, o, r, a, s, d, c, l, u, p, A, h, m, f, v, g, b, w, y, k, x, _;
                return Yt(this, (function(I) {
                    switch (I.label) {
                    case 0:
                        return n = t.title,
                        i = t.thumbnail,
                        (o = new Image).crossOrigin = "Anonymous",
                        r = new Promise((function(e) {
                            o.onload = function() {
                                return e(o)
                            }
                        }
                        )),
                        o.src = e,
                        (a = new Image).crossOrigin = "Anonymous",
                        s = new Promise((function(e) {
                            a.onload = function() {
                                return e(a)
                            }
                        }
                        )),
                        a.src = "https://a.poki-cdn.com/images/screenshot-frame.png",
                        (d = new Image).crossOrigin = "Anonymous",
                        c = new Promise((function(e) {
                            d.onload = function() {
                                return e(d)
                            }
                        }
                        )),
                        d.src = "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=".concat(128, ",height=").concat(128, ",fit=cover,f=auto/").concat(i),
                        l = new FontFace("TorusBold","url(https://a.poki-cdn.com/fonts/torus-bold-latin.woff2)"),
                        u = l.load(),
                        [4, Promise.all([r, s, c, u])];
                    case 1:
                        return p = I.sent(),
                        A = p[0],
                        h = p[1],
                        m = p[2],
                        f = p[3],
                        (v = document.createElement("canvas")).width = A.width,
                        v.height = A.height,
                        (g = v.getContext("2d")).drawImage(A, 0, 0),
                        b = v.width / h.width,
                        w = h.height * b,
                        y = v.height - w,
                        g.drawImage(h, 0, y, v.width, w),
                        k = m.height * b,
                        function(e, t, n, i, o, r, a) {
                            e.save(),
                            e.beginPath();
                            var s = n + o
                              , d = i + r;
                            e.moveTo(n + a, i),
                            e.lineTo(s - a, i),
                            e.quadraticCurveTo(s, i, s, i + a),
                            e.lineTo(s, d - a),
                            e.quadraticCurveTo(s, d, s - a, d),
                            e.lineTo(n + a, d),
                            e.quadraticCurveTo(n, d, n, d - a),
                            e.lineTo(n, i + a),
                            e.quadraticCurveTo(n, i, n + a, i),
                            e.closePath(),
                            e.clip(),
                            e.drawImage(t, n, i, o, r),
                            e.restore()
                        }(g, m, 64 * b, y + 20 * b, k, k, 24 * b),
                        document.fonts.add(f),
                        x = 226 * b,
                        _ = y + 68 * b,
                        g.textAlign = "left",
                        g.textBaseline = "top",
                        g.fillStyle = "#002b50",
                        g.font = "700 ".concat(56 * b, "px TorusBold,sans-serif"),
                        g.fillText(n, x, _),
                        [2, v.toDataURL()]
                    }
                }
                ))
            }
            ))
        }
          , nn = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return Xt(void 0, Jt([], e, !0), void 0, (function(e) {
                var t;
                return void 0 === e && (e = null),
                Yt(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return [4, en()];
                    case 1:
                        return (t = n.sent()) && t.length > 10 ? e ? [4, tn(t, e)] : [3, 3] : [3, 5];
                    case 2:
                        t = n.sent(),
                        n.label = 3;
                    case 3:
                        return [4, $t({
                            screenshot: t
                        })];
                    case 4:
                        return [2, n.sent()];
                    case 5:
                        return [2, null]
                    }
                }
                ))
            }
            ))
        }
          , on = function(e) {
            return Xt(void 0, void 0, void 0, (function() {
                var t, n, i, o, r, a, s;
                return Yt(this, (function(d) {
                    switch (d.label) {
                    case 0:
                        t = ["VIDEO", "TEXTAREA", "SCRIPT", "NOSCRIPT", "INPUT", "IFRAME"],
                        e || t.push("CANVAS"),
                        n = function(e) {
                            var n, i;
                            return !t.includes(e.nodeName) && (!("IMG" === e.nodeName && !e.getAttribute("src")) && (!(null === (n = e.classList) || void 0 === n ? void 0 : n.contains(Dt)) && "true" !== (null === (i = e.getAttribute) || void 0 === i ? void 0 : i.call(e, "data-poki-playtest-skip"))))
                        }
                        ,
                        i = document.body.style.minWidth,
                        o = document.body.style.minHeight,
                        r = document.body.style.backgroundColor,
                        document.body.style.minWidth = "100%",
                        document.body.style.minHeight = "100%",
                        e || (document.body.style.backgroundColor = "transparent"),
                        d.label = 1;
                    case 1:
                        return d.trys.push([1, 3, , 4]),
                        [4, Pt(document.body, {
                            filter: n,
                            width: window.innerWidth,
                            height: window.innerHeight
                        })];
                    case 2:
                        return a = d.sent(),
                        [3, 4];
                    case 3:
                        return s = d.sent(),
                        console.warn("%cPOKI:%c failed to generate svg", "font-weight: bold", "", s),
                        [3, 4];
                    case 4:
                        return document.body.style.minWidth = i,
                        document.body.style.minHeight = o,
                        document.body.style.backgroundColor = r,
                        [2, a]
                    }
                }
                ))
            }
            ))
        };
        function rn() {
            var e;
            try {
                e = performance.getEntriesByType("resource").map((function(e) {
                    return e.encodedBodySize
                }
                )).reduce((function(e, t) {
                    return e + t
                }
                )),
                e += performance.getEntriesByType("navigation")[0].encodedBodySize
            } catch (e) {}
            return e
        }
        const an = function() {
            return "undefined" != typeof navigator && /(iPad|iPhone|iPod)/gi.test(navigator.userAgent)
        };
        var sn = "MacIntel" === window.navigator.platform && void 0 !== window.navigator.standalone && navigator.maxTouchPoints > 1
          , dn = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var cn = g() || b() || sn
          , ln = !1
          , un = new Image;
        un.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAdCAYAAACqhkzFAAADE2lDQ1BJQ0MgcHJvZmlsZQAAeNp9kk9s21Qcxz+2X92qCh4qYRqoqnIAKqoNma6gbkAhadI/tOuyJB1t4IDrOHUSx7ZsZyw9IuAIk+AAJ1BXCQ4cOMDWgZDQDttlEoi/EkIc0DQuO1ExTYIqHOKsOfEu7/s++r7v7/d+eiB2DN93BNB0o6Awn0mtrZdTg38i8TAjPMghwwz9dD6/DNDb+5YEd35GAvjhmOH7zpWvPt3rnJoYe2f/8/GxV3N3+f81XLFCE/gX5C9NP4hA2QXyr0V+BGIISAZr62UQo0Bys6t1ILnR1VkgGZQKsyDWgJRpGxUQ54GjG318s083nZYZ9zAGJIJWYRXQQDofNopLsX7LNHJF4H6Q3rOtxWVAgLTjR5lC7PmkGsytxp5Ldmuhl3OtFi2WYv1jw1sqAMMg/WGGs+XeXXdj5TSQAOl2q7GajvndipXN9TyBV4g9srpll14CVJBHwnPFHDAC8pEte3Yl5hN148V87NctZz6uKz/rR/nT9+o6K8vAYZDnrPDgjZFdWuhq+ZUoKPXuOtXa3GKcec4OFgqxft138su9TCPIzQNJkN+23NVil8vbFSO7FOd8JkbFjHhOTIuMmBEvkKVGiI+DRZ08Bi4RBg4OxsCtge85hYdLjQiPoO9k0SJgiRp1LBy2pDMUMbGxCGjifZG8uvNTYnfoekSRBvUuF0kxLdLiefGMeEqcIE2VmvwQBvX3vfbJszYZajhUCGlwk4BmdaZ98qytX9cv6lf0X/Tb+o7yobKr3FC+Vi6TwcKK/fdqa0PaMS2tTWhJbVAb1R4lR4MAA5cVbtImIuIOZQxCHDxcdUodV6fUx0mp42pWPaE+qT7dNxuDNkUa3CKgCX1/VwIS8ayngFFm8fBpE1BjE5uIFGn8eMYpFnExeYKjpJhEZ5Lja+vlVDdu7wwSIB2+ccC8bZj+G5QLB2zjA7j8Jhz59YA98hEcegMufesbgQGAAsjVKvz1Mdy3Dg98B8Mvh9Xjk93uExkY+L3T2XsMBt+F/Qudzj/bnc7+RVB+g2/c/wD2jOYIAU+O+QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQpSURBVHjapFZLLFx9FD9z74x2COod72eQUCLSSGhrPOoRFhY23xcaYtdWx6O0lSbNJxQpY6ZtpG2w6aIWFgRhiIVHLBoiLLxJBB2PIMSMx2B6zr+9k2lSH6Mnubn/3HPv75zzO68rSklJKQoPD1fs7u6CwWCAs7MzEIlExvv5+Tl7TufT09PfdPSc9CR6vR54ngd+YWFhxMrK6lZgYKBaq9UaPza9kwjgpjoSQU86juOAx/PLxcXFu9bW1qd+fn5DBwcHfw0ox8tyfn4+3tLSUu/v7z+k0+n+CvA5AdJD9DQBPT1B0GFTT80B5PAsIWVcXBxT9PT0vJmYmHjh5OQE1xEC5MlKU1MTtLa2sofd3d1Vk5OT1wJlScHLIicnB+Lj45nrg4ODFH6ira2tztvbe4Q4NYfDMgJMS0uDoKAgFvrx8TEMDw8DJuqBjY2NlkAPDw+vxqHol0YsFhvdrqqqguLiYnZWq9Vvp6ennzk4OFwpZPFFitraWmakpqaGEvWWnMDiV+zs7FyalAuluroaioqKhOzXzczMFF/mKXdZCHV1dcbwe3t7a+fm5uT/B8pdhRcKv6CgQCgp5ezsbAGBCgkxG5Ckvr4eCgsL2bmvr68eh0r+nzzlzClahUIBcrlc8PQdltVTe3v73zzlzO0EpVIJZWVlAqeqpaWlJ6aectfp18rKSmhoaBDq9D2CPrazs2Oeii/7mKY01SMNX+qWlZUV2NzcBBx1gF0E+/v7BPohNjZWjFNKJaZO+VO2BNne3obk5GRYX1/Xb2xsSC56b2BgQImGpRd6mJeXB1lZWay3iSMcaQxMKpVuHx0d6XASLXt6eq7iLllFL1fRO42Hh8eeEVBYNjQYSktLobm5Gdra2piH7e3tgIOXNT/2eTb2dndXVxckJSXByckJ0Nnd3R0QEHiM+BWGLFGpVGBhYQGRkZFnHR0dLFnEGYWL1mFtbQ3GxsaIT9uKioqvBI4UgEajgeXlZXB1dWW8klUt0djS0mJITEzU0UTCLaiJiIhQ0xmtGkhwJRDR7GpsbJRRcvAbyM/PBy8vL2a4pKSEVin/HN+/QdMa0y9BS98x5HsxMTHv+vv7X+N0EaWmpoKvry84OjpSQdPwvY27/DNFEBAQwAAp20QbhVyKBymFiB98y8jIuB8VFbVKSxvJd8a+vYOh6mUyGd/Z2Qmjo6OwtbXlhpwthYWFTe7t7TFKcAX/nIf4F8DA0tPTW3De/Yt8GMgaJSchIeE/9OjR+Pi4JDg42FgBPj4+A7gevru4uBj/LJydnRmPRP5NtP6xvLz8H+KSwCg5tEcwlE38VWkQgHBFDGVnZydlZmbK3Nzc+smoRCJh7wuVIs7NzX2IJfEFC5d1A2WPSoE2A/3vREdHv5+amgoPCQn5FBoa+oWooMzSu6blJsgPAQYACgtfMJolu7EAAAAASUVORK5CYII=",
        un.onload = function() {
            ln = !0
        }
        ;
        var pn = function() {
            function e(e) {
                var t = this;
                this.image = null,
                this.ready = !1,
                this.drawSize = 0,
                this.previousMouseDown = !1,
                this.mouseDrawSizeClickIncrease = 20,
                this.minimumClickSize = 60,
                this.maximumClickSize = 100,
                this.holdMouseSize = 40,
                this.sizeDecrease = 2,
                this.image = new Image,
                this.image.src = e,
                this.image.onload = function() {
                    t.ready = !0
                }
            }
            return e.prototype.update = function(e) {
                e && !this.previousMouseDown && (this.drawSize += this.mouseDrawSizeClickIncrease,
                this.drawSize = Math.min(Math.max(this.drawSize, this.minimumClickSize), this.maximumClickSize)),
                this.drawSize -= this.sizeDecrease,
                this.drawSize = e ? Math.max(this.drawSize, this.holdMouseSize) : Math.max(this.drawSize, 0),
                this.previousMouseDown = e
            }
            ,
            e.prototype.draw = function(e, t, n) {
                var i = this.drawSize / 2
                  , o = t - i
                  , r = n - i;
                e.drawImage(this.image, 0, 0, this.image.width, this.image.height, o, r, this.drawSize, this.drawSize)
            }
            ,
            e.prototype.destroy = function() {
                this.image = null,
                this.ready = !1
            }
            ,
            e
        }()
          , An = new pn("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAtCAYAAADV2ImkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAArGSURBVHgBvVlbbFxHGZ451z273rXXsWt7k5RESpwoJqQpqdI2hTiNeQDaB0COoAIkHgolECQuEpc+eA0SD6ihBKrmIU+FloK3SJFIoWpDurmASy5qIbEJJaI0TryRb3vzXs5lZpg5O7N79vTs2gkVRxrP8dkzM9988/3/P/MfCN6HixACxwGA6fFxaXB2AGYTGRgfGCCJTIak6e/DY2N4jL4GISTgf7wguMPLBTk+rloj39srK+TDsqrvkSD4kARAlyTBGHsHYVKg1bsIo+sEgb+Zjnk69NpT6bGxMftOwd8uYDg6OiGte2Rdf2zLzq+rmv7VkAI7dRkAnSJVaJFpjxDWOsYUEqLFocVEAFRpMR0yYznOmepy/kfvHD14LZVKodsCsNoXk8mkZO38Yq/Wn0jquv5EhwpAWAHAoGBDtGgcsMTBuoABB0xvLFpMWioOAGValmkxbfRCaak0/pOPxa6tlvFVAR4dHZW3fOdX3zI07cmYBjujFGwHBRumdYiC1ChglQGGNcCssNEJqRXGsM0BM5ZLTq0ULQAKJpkplys/3jH78rEDBw6wObYFLq+AFY4mk9rWL/z0F7Gw/v3eEAytCQHQrQMQp6VTqxXGdkSpMS5Yd5mn9zpfAVYb/H+2GkxC7qrIsBMo6iMzxqa7doTzr50/fx7dMcMHJ6b6ezZseSluyHsYyC4OMMLlwICotAdVrmlXsCs6xi7NVBagJgvBNJMFY5rJokBZztGyWAUga5LL5euXR5769I550ILplgx//NAhffPw5891h+VdvQYAPXqNWQY6ptZYDQewyKShcj2L2r3nE2OyYc9lLiGhe9mdKOxD4Z4HNtrSr996K+2sGvBwMqk8+JkfHuky1E/2UgkIGXTREuXLz5aXgW3Sr0fHopa55xC1EgBWGCq7MJDu1u55oGertP7VS5dO4BUBM2/QP/Ltx2ORcJKB7WaAuV5jQgqcVTG4cGWilribgJ7/pdqjOpveNl4ZMR04UNklDW0v7V+vTKbT6SZpSH7A5d1f2xwNh5+Mc8NiEohyw3KXXeHG4mERegYVF/QVwbbCQbJVMbiBshWLcfvo4mNGdPUHc9tG72rLMIteZ7Pqkbih7OkJNQAzZusS4Iyy5YewMePV+EfxjggsQRMl9WADdWB0Rfete/iVdPo5HMjwd19ZGDQ09TGmU1Ei3BsIrfo1J4Bwh9A8OAgA7fEmjC3GuM7dYJgbc5TXRkj9SnnnQBPLdYZZcOjf/9jPug15O9Nt3OMNDG5cXgmIpfaChh6g0PM88PL2ARvtGLuI8mkTHh2VCHp4vXpKaLnOcGRoSA2p8kfrzt/HrOwDKwZYiVHiK8A3QcmjaTegcFfJXCbDoemhJ2ZnQUi0cwEz7fbu/+awpkjrhCGISCTACqtuB84Lxg/MvyLiR2EHwuUJ0AKHocJY52e/MSyau4BpDJc0Rd/nuivJEwA8EQy2AbaaXUugnnkteXy3CDgMeIgTF1LVe9kusQ44Hh+hgOXtutTQapMMQINdYWBwFYDagfdKRLDslYcqN4DLurYHgJRcB2xZGVmSpbvr4RQ2bxWF028FFraZAPG1IZ42TX1AT1AB3INwPJKifDA+NKQIwLAUpr9BuF4WeuKmKGbNem9lUN77dtolvucAtJ64N6TzQ0Gnc92oMUwNDkQ7DLp/hjExQxjQcdAgQfekRd3Kvb1nHNh8X6ulKI4xsQLocqlAIonO60voj0ABdStDCvLDrdqRoPehry17IefucyBVAqRGF2cPC6wl9rzkB+kH1I61Vs/aaZk9E3voZsPERTleI9WVxI3LGYIIKSB+pMEcuDjigIBBVvIK7TTvBS2eYX5D+NiYRzy28ScI3SyULPck4jKsrzUItsyr7EebnwzYy8g361ZAVgIV9E5QMHHDMmicThx+gLVtdCPqQHfxXYaL9i3HqZYnTX66tXkRcd0rj1aurRW4VvJo0jRp7CNEaoDxyQrDhBxryrYlTPMZhDFMPrJxIzaXly9XnVr+wEaN8xebsVgiQIINxg+ulYG289WINFICgjA3j0FLeSn35677hhymBlfIV65cwfN/+O3ZKiIFdkCs8KQHA25zHQWdv4MMDwYw6H/WBJo0ki0if8HGrojioNm5l58/t2bpPDUzUrO8kZER3KWp1Uoh/8syT3SwRlVcWxaHNJaLkGbWWmnar9GgwFI3cB9YttIlm+Oomn9VwnZlamobqTNM98L4JlxrLr155liRJzlYA3EcdyWCm0G3c2sk4N4vF+zVqwDryQq5iRaKIf/23w+jxWV7aGjUbeoCZsiHOqfR8tU3b5XzhefzVu1l0bDMDUB4EOxjO4jdoPv6JDyuU2zUKx6i2NgFNn5x+bhz5dy/jIc2WzRmNACzPijlCKugeuPsH58uWKSYt2tJDgG6ghryEKD9xuVn2c+0mCTyMGsKCXBm2biMsEIFZUrvTB2WOsLl7MmTdROqnzhSqQO4e3O36czM3MgvLjyTM2kmxuKN+azLvHObH2H8bo+A1qHXm2dzSLMEirx/NibLArE6v3DrmcKFU/+UF5FNM5z1Q2jTqfkTu3eTTNkG5uULU/qmnX1QD233bobYwFLAqYPwP36JEM/yuwHBA9bkXsCbrlriKaulbO6F2d8ffTrioOLc3EVreno6GHA6/ToY2nAawA6dZKcuToa37dpDZCUBAxgTGhQ+2vvMGwAcn8uyUEOvQqtsJZcoqwsMbMW+OvObZ7/s2FK+uICqqdSzTclBX+ZnHExNvY5PXPwTcYhBUG7+jDQwuJemj3oIbA0Ke4Ah3ABqc6AmB1oVYBH3ABYHW60xu1iqXpw7ffxLShXMgUKuPDgIbH/mJ9AzTUxMyJOTQFuQ342qNo4PfOrxsc7u+Ofco7/G8wbisKo0En1iww89Pgx5tO5Pahc8oPNUBjd/d2y8RJxc3FxTymbjJrWr96Re5RaAwRtvvESyloZVrOH8Py5Mgrs+sOBoka0OkKLu8nIGhbsTcd/yhlSnsfxMq0WnIYGsWZPBYoUUc/PzR/59/OhhyVYLSlguL9/qDwTbkmFxDQ8nlegg0DpoigCqSiR+z0ODXVvvPRSJRh+N8sRgmKda6+cv2JyBr8sDNyYh/G0pl31x8dyrP89nrmWIHSo5EakEbqyzJiZGcatPCG0Bs50cTQHILMlCd/whyTHCCFpGdNv9m2Lb7z8YNoz7dFUeMDzfOLzZSKZ1sVW0kPAMpFjJzr84/5dTz+HZ/8zZGFUcKJcH+8wKfZ0GiCRuh6ktYHGxFOzs7ICsKI5ekfOGBSxdMWXdArLat//RB8Nr+ncrhrFFUZS1sqr2Q0nqcAFjvEwwKdpm9W2rlL9YzeamF0+fmEQEm1CRLGsZmdFeuarkuqqJRAatBHbVgNlVYzsl9/ffUkpGRSPzuZDd2aE4FlEMIqsEO7Ij0f21ItOUgUwwYlxbQCUAOxg6qgYwItDBFWRLKrSUSJ+F52bsDRv2OsnkPnFWWPFaNWAPcjiaSknxk1kqgIyapXkZQ8UKMVSZFCzXiE2JSPQrA7AUh4QwBYojGMo2QpJlR0zgZBPAAXQrkEqNUkZv7wPj7QOu46ZeezwppdNAGhychYnECLw0O+0mO7oqkVq/ffTbCJKx4yjYNK/gRCLhWj5den8E//9fLKHI2Gd6Z4U+ce8BK+y39+n6L5YV4ArrvzyVAAAAAElFTkSuQmCC")
          , hn = new pn("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADBSURBVHgBvdZdEcIwDAfwZAqQgAQs4AAHIAEHzAlSWgfMARZAQUjZ9rDbR5M22f+uzdaX30OvaREUIaIDlxuPVCMiRrAOIw+a5zngrsiYlwmWQWwwIVKHKZEyrBDRYZWIDDNCtjFjZBlzQsaEZCB/HLm+wTfnhqcT+OfawD75Jijy+IBvuv/M+3Qnv4QJyQst2Wf1LFli2e5ggYn7XQ2m7uAlWPGdpMGqb1kJZvZuaN2RDBakCIIi1Hf6y/DbaR6QP+1P5pe98AyNAAAAAElFTkSuQmCC");
        function mn(e, t, n, i, o, r) {
            if (ln && r && un) {
                var a = Math.max(i, o);
                if (function(e, t, n, i, o, r) {
                    [An, hn].forEach((function(a) {
                        if (a.ready && r) {
                            var s = a === An ? t : n;
                            a.update(s);
                            var d = e.x * i
                              , c = e.y * o;
                            a.draw(r, d, c)
                        }
                    }
                    ))
                }(e, t, n, i, o, r),
                !cn) {
                    var s = .5 * a;
                    r.drawImage(un, 0, 0, un.width, un.height, e.x * i, e.y * o, un.width * s, un.height * s)
                }
            }
        }
        var fn = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , vn = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , gn = "Game tab in background"
          , bn = !0
          , wn = []
          , yn = null
          , kn = document.createElement("canvas")
          , xn = null
          , _n = null
          , In = null
          , Sn = 0
          , En = []
          , Cn = []
          , Pn = []
          , Tn = []
          , Bn = 24;
        (g() || b() || sn) && (Bn = 12),
        kn.setAttribute("data-poki-no-playtest", "true"),
        kn.addEventListener("webglcontextlost", (function() {
            console.info("%cPOKI_PLAYTEST:%c streamCanvas context lost", "font-weight: bold", ""),
            kn = document.createElement("canvas"),
            xn = null
        }
        ));
        var Dn = {
            x: 0,
            y: 0
        }
          , Mn = !1
          , On = !1
          , Ln = !1
          , Nn = !1
          , Rn = ""
          , zn = 1
          , jn = 1
          , Un = -1
          , Fn = -1;
        function Gn(e) {
            if (null !== yn && wn.length) {
                var t = wn[0]
                  , n = t.width / yn.width
                  , i = t.height / yn.height
                  , o = (e.clientX - yn.left) * n
                  , r = (e.clientY - yn.top) * i;
                Dn.x = Math.max(0, Math.min(o, t.width)),
                Dn.y = Math.max(0, Math.min(r, t.height))
            }
        }
        var Vn = function(e) {
            wn.length && kn && Gn(e)
        }
          , Hn = function(e) {
            wn.length && kn && (0 === e.button ? (Mn = !0,
            On = !1) : 2 === e.button ? (Ln = !0,
            Nn = !1) : 1 === e.button && (Mn = !0,
            On = !1,
            Ln = !0,
            Nn = !1),
            Gn(e))
        }
          , qn = function(e) {
            0 === e.button ? On = !0 : 2 === e.button ? Nn = !0 : 1 === e.button && (On = !0,
            Nn = !0)
        };
        function Qn() {
            var e = Rn;
            e && kn && xn && (xn.fillStyle = "rgba(255, 255, 255, 0.5)",
            xn.fillRect(0, 0, kn.width, kn.height),
            xn.font = "48px Arial",
            xn.fillStyle = "#009cff",
            xn.textAlign = "center",
            xn.fillText(e, kn.width / 2, kn.height / 2))
        }
        function Kn(e) {
            if (kn && wn.length) {
                var t = wn[0]
                  , n = t.width
                  , i = t.height;
                if (n !== Un || i !== Fn || e) {
                    Un = n,
                    Fn = i;
                    var o = (yn = t.getBoundingClientRect()).width
                      , r = yn.height;
                    0 !== o && 0 !== r || (o = n,
                    r = i);
                    var a = g() || b()
                      , s = sn ? 1024 : a ? 640 : 1280
                      , d = Math.min(s / o, s / r, 1);
                    o = Math.round(o * d),
                    r = Math.round(r * d),
                    zn = o / n,
                    jn = r / i,
                    e || kn.width !== o || kn.height !== r ? (kn.width = o,
                    kn.height = r,
                    console.info("%cPOKI_PLAYTEST:%c capturing at ".concat(o, "x").concat(r, " (").concat(n, "x").concat(i, ")"), "font-weight: bold", "")) : console.info("%cPOKI_PLAYTEST:%c resize but video unchanged ".concat(o, "x").concat(r, " (").concat(n, "x").concat(i, ")"), "font-weight: bold", "")
                }
            }
        }
        function Wn(e) {
            for (var t, n = null, i = 0; i < e.length; i++)
                if (!document.body.contains(e[i])) {
                    if (e[i].pokiHtmlDummyCanvas)
                        continue;
                    if (n || (n = document.getElementsByTagName("flt-glass-pane")),
                    n) {
                        for (var o = !1, r = 0; r < n.length; r++)
                            (null === (t = n[r].shadowRoot) || void 0 === t ? void 0 : t.contains(e[i])) && (o = !0);
                        if (o)
                            continue
                    }
                    return !1
                }
            return !0
        }
        function Zn(e) {
            return fn(this, void 0, void 0, (function() {
                var t, n, i;
                return vn(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        if (!kn)
                            return [2];
                        if (_n || (_n = document.createElement("canvas"),
                        0 === wn.length ? (_n.width = kn.width,
                        _n.height = kn.height) : (_n.width = wn[0].width,
                        _n.height = wn[0].height),
                        _n.addEventListener("contextlost", (function() {
                            _n = null,
                            In = null
                        }
                        ))),
                        !In && !(In = _n.getContext("2d")))
                            return [2];
                        o.label = 1;
                    case 1:
                        return o.trys.push([1, 5, , 6]),
                        performance.now(),
                        [4, on(e)];
                    case 2:
                        return (t = o.sent()) && t.length > 10 ? [4, new Promise((function(e, n) {
                            var i = new Image;
                            i.decode = function() {
                                return e(i)
                            }
                            ,
                            i.onload = function() {
                                return e(i)
                            }
                            ,
                            i.onerror = n,
                            i.crossOrigin = "anonymous",
                            i.decoding = "async",
                            i.src = t
                        }
                        ))] : [3, 4];
                    case 3:
                        n = o.sent(),
                        requestAnimationFrame((function() {
                            _n && In && (In.clearRect(0, 0, _n.width, _n.height),
                            In.drawImage(n, 0, 0, n.width, n.height, 0, 0, _n.width, _n.height),
                            Sn = 0)
                        }
                        )),
                        o.label = 4;
                    case 4:
                        return [3, 6];
                    case 5:
                        return i = o.sent(),
                        console.warn("%cPOKI_PLAYTEST:%c ui canvas error", "font-weight: bold", "", i.name, i.message, i.stack),
                        Sn++,
                        (fi.__playtestCaptureHTML === Ai || fi.__playtestCaptureHTML === pi) && Sn > 10 && (bn = !0),
                        [3, 6];
                    case 6:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        function Xn(e) {
            Rn = e
        }
        function Yn(e) {
            return fn(this, void 0, void 0, (function() {
                var t, n, i;
                return vn(this, (function(o) {
                    if (bn)
                        return [2];
                    for (wn = e,
                    i = 0; i < En.length; i++)
                        En[i].stop();
                    for (i = 0; i < Cn.length; i++)
                        Cn[i].readable.cancel();
                    for (i = 0; i < Pn.length; i++)
                        Pn[i].cancel();
                    for (i = 0; i < Tn.length; i++)
                        Tn[i].close();
                    En = [],
                    Cn = [],
                    Pn = [],
                    Tn = [];
                    try {
                        if (dn)
                            for (t = function(e) {
                                if (wn[e].pokiHtmlDummyCanvas)
                                    return "continue";
                                var t = wn[e].captureStream(Bn).getVideoTracks()[0];
                                En.push(t),
                                Tn.push(null);
                                var n = new Blob(["self.onmessage=(async({data:{track:e}})=>{if(!e)return;const a=new MediaStreamTrackProcessor({track:e}).readable.getReader(),s=()=>{a.read().then(({done:e,value:a})=>{e?a.close():(postMessage(a),a.close(),s())})};s()});"],{
                                    type: "application/javascript"
                                })
                                  , i = new Worker(URL.createObjectURL(n));
                                i.onmessage = function(t) {
                                    var n = t.data;
                                    Tn.length <= e || (null !== Tn[e] && Tn[e].close(),
                                    Tn[e] = n)
                                }
                                ;
                                try {
                                    i.postMessage({
                                        track: t
                                    })
                                } catch (e) {
                                    console.warn("%cPOKI_PLAYTEST:%c worker error", "font-weight: bold", "", e),
                                    bn = !0
                                }
                            }
                            ,
                            i = 0; i < wn.length; i++)
                                t(i);
                        else
                            for (n = function(e) {
                                if (wn[e].pokiHtmlDummyCanvas)
                                    return "continue";
                                var t = wn[e].captureStream(Bn).getVideoTracks()[0]
                                  , n = new window.MediaStreamTrackProcessor(t)
                                  , i = n.readable.getReader();
                                En.push(t),
                                Cn.push(n),
                                Pn.push(i),
                                Tn.push(null);
                                var o = function() {
                                    i.read().then((function(t) {
                                        var n = t.done
                                          , i = t.value;
                                        n ? bn = !0 : Tn.length <= e ? i.close() : (null !== Tn[e] && Tn[e].close(),
                                        Tn[e] = i,
                                        o())
                                    }
                                    ))
                                };
                                o()
                            }
                            ,
                            i = 0; i < wn.length; i++)
                                n(i);
                        Kn(!0)
                    } catch (e) {
                        console.warn("%cPOKI_PLAYTEST:%c setPlaytestSoureCanvasses error", "font-weight: bold", "", e),
                        bn = !0
                    }
                    return [2]
                }
                ))
            }
            ))
        }
        function Jn() {
            var e = fi.__playtestCanvas;
            if ((null == e ? void 0 : e.length) && Wn(e))
                return e;
            if (fi.__playtestCaptureHTML === pi)
                return (a = document.createElement("canvas")).width = window.innerWidth,
                a.height = window.innerHeight,
                a.setAttribute("data-poki-html-canvas", "true"),
                a.pokiHtmlDummyCanvas = !0,
                [a];
            var t = 0
              , n = Array.from(document.getElementsByTagName("canvas"));
            if (0 === n.length)
                for (var i = document.getElementsByTagName("flt-glass-pane"), o = 0; o < i.length; o++) {
                    var r = i[o].shadowRoot;
                    r && (n = n.concat(Array.from(r.querySelectorAll("canvas"))))
                }
            var a, s = [];
            return n.forEach((function(e) {
                if ("true" !== e.getAttribute("data-poki-no-playtest")) {
                    var n = getComputedStyle(e)
                      , i = n.width
                      , o = n.height
                      , r = parseInt(i, 10) * parseInt(o, 10);
                    r >= t && function(e) {
                        if (!e)
                            return !1;
                        for (var t = e, n = !0; t && t !== document.body; ) {
                            var i = window.getComputedStyle(t);
                            if ("none" === i.display)
                                return !1;
                            if ("hidden" === i.visibility)
                                return !1;
                            if (n && (0 === t.offsetWidth || 0 === t.offsetHeight))
                                return !1;
                            "absolute" === i.position && (n = !1),
                            t = t.parentElement
                        }
                        var o = e.getBoundingClientRect()
                          , r = window.innerHeight || document.documentElement.clientHeight
                          , a = window.innerWidth || document.documentElement.clientWidth;
                        return !(o.right < 0 || o.bottom < 0 || o.left > a || o.top > r)
                    }(e) && (r > t && (s = []),
                    s.push({
                        canvas: e,
                        style: n,
                        index: s.length
                    }),
                    t = r)
                }
            }
            )),
            0 === s.length ? fi.__playtestCaptureHTML === Ai ? ((a = document.createElement("canvas")).width = window.innerWidth,
            a.height = window.innerHeight,
            a.setAttribute("data-poki-html-canvas", "true"),
            a.pokiHtmlDummyCanvas = !0,
            [a]) : [] : (s.sort((function(e, t) {
                var n = parseInt(e.style.zIndex, 10) || 0
                  , i = parseInt(t.style.zIndex, 10) || 0;
                return n < i ? -1 : n > i ? 1 : e.index - t.index
            }
            )),
            s.map((function(e) {
                return e.canvas
            }
            )))
        }
        function $n(e) {
            if (!kn)
                return null;
            bn = !1,
            Yn(e),
            Kn(!0);
            var t, n = kn.captureStream(Bn);
            window.addEventListener("pointermove", Vn, {
                capture: !0,
                passive: !0
            }),
            window.addEventListener("pointerdown", Hn, {
                capture: !0,
                passive: !0
            }),
            window.addEventListener("pointerup", qn, {
                capture: !0,
                passive: !0
            }),
            window.addEventListener("contextmenu", qn, {
                capture: !0,
                passive: !0
            });
            var i, o = 0;
            if (fi.__playtestCaptureHTML === Ai || fi.__playtestCaptureHTML === pi) {
                var r = 0;
                t = setInterval((function() {
                    if (kn) {
                        if ("a5f10c5a-c471-4b30-9c4f-e00ae3c4322e" === D.gameID && Tn.length > 0)
                            return clearInterval(t),
                            _n = null,
                            void (In = null);
                        var e = !!wn[0].pokiHtmlDummyCanvas;
                        !e || wn[0].width === window.innerWidth && wn[0].height === window.innerHeight || (wn[0].width = window.innerWidth,
                        wn[0].height = window.innerHeight);
                        var n = !1;
                        if (e && document.getElementsByTagName("canvas").length > 0 && (n = !0),
                        !n) {
                            var i = function(e) {
                                for (var t = 3 & e.length, n = e.length - t, i = 3432918353, o = 461845907, r = 0, a = 0, s = 0; s < n; )
                                    a = 255 & e.charCodeAt(s) | (255 & e.charCodeAt(++s)) << 8 | (255 & e.charCodeAt(++s)) << 16 | (255 & e.charCodeAt(++s)) << 24,
                                    ++s,
                                    r = 5 * (r = (r ^= a = (65535 & (a = (a = (65535 & a) * i + (((a >>> 16) * i & 65535) << 16) & 4294967295) << 15 | a >>> 17)) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295) << 13 | r >>> 19) + 3864292196 & 4294967295;
                                switch (a = 0,
                                t) {
                                case 3:
                                    a ^= (255 & e.charCodeAt(s + 2)) << 16;
                                case 2:
                                    a ^= (255 & e.charCodeAt(s + 1)) << 8;
                                case 1:
                                    r ^= a = (65535 & (a = (a = (65535 & (a ^= 255 & e.charCodeAt(s))) * i + (((a >>> 16) * i & 65535) << 16) & 4294967295) << 15 | a >>> 17)) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295
                                }
                                return r ^= e.length,
                                r = 2246822507 * (65535 & (r ^= r >>> 16)) + ((2246822507 * (r >>> 16) & 65535) << 16) & 4294967295,
                                r = 3266489909 * (65535 & (r ^= r >>> 13)) + ((3266489909 * (r >>> 16) & 65535) << 16) & 4294967295,
                                (r ^= r >>> 16) >>> 0
                            }(document.body.innerHTML);
                            r !== i && (r = i,
                            n = !0)
                        }
                        n && Zn(e)
                    }
                }
                ), 1e3)
            }
            var a = function() {
                if (bn || !kn || !wn.length || o > 10)
                    return console.info("%cPOKI_PLAYTEST:%c crashed", "font-weight: bold", "", bn, !kn, !wn.length, o),
                    window.removeEventListener("pointermove", Vn),
                    window.removeEventListener("pointerdown", Hn),
                    window.removeEventListener("pointerup", qn),
                    window.removeEventListener("contextmenu", qn),
                    clearInterval(t),
                    fi.__playtestCaptureHTML = "",
                    kn = null,
                    xn = null,
                    _n = null,
                    In = null,
                    Yn([]),
                    An.destroy(),
                    hn.destroy(),
                    void clearInterval(i);
                if (Wn(wn)) {
                    if (!xn && !(xn = kn.getContext("2d")))
                        return console.info("%cPOKI_PLAYTEST:%c streamCanvas context creation failed", "font-weight: bold", ""),
                        o++,
                        void setTimeout(a, 100);
                    o = 0,
                    Kn(!1),
                    fi.__playtestCaptureHTML === ui ? (fi.__playtestCaptureHTML = "",
                    Zn(!1)) : fi.__playtestCaptureHTML === hi && (fi.__playtestCaptureHTML = "",
                    _n = null,
                    In = null),
                    xn.clearRect(0, 0, kn.width, kn.height);
                    for (var e = 0; e < Tn.length; e++) {
                        var n = Tn[e];
                        null !== n && xn.drawImage(n, 0, 0, n.displayWidth, n.displayHeight, 0, 0, kn.width, kn.height)
                    }
                    _n && xn.drawImage(_n, 0, 0, _n.width, _n.height, 0, 0, kn.width, kn.height),
                    mn(Dn, Mn, Ln, zn, jn, xn),
                    Mn && On && (Mn = !1,
                    On = !1),
                    Ln && Nn && (Ln = !1,
                    Nn = !1),
                    Qn()
                } else {
                    console.info("%cPOKI_PLAYTEST:%c source canvasses not in DOM", "font-weight: bold", "");
                    var r = Jn();
                    r.length ? Yn(r) : (console.info("%cPOKI_PLAYTEST:%c no source canvasses found", "font-weight: bold", ""),
                    o++,
                    setTimeout(a, 100))
                }
            };
            return i = setInterval(a, 1e3 / Bn),
            window.addEventListener("visibilitychange", (function() {
                console.info("%cPOKI_PLAYTEST:%c visibility change", "font-weight: bold", "", document.visibilityState),
                "visible" === document.visibilityState ? Rn === gn && (Rn = "") : (Rn = gn,
                Qn())
            }
            )),
            window.addEventListener("resize", (function() {
                console.info("%cPOKI_PLAYTEST:%c resize", "font-weight: bold", "", window.innerWidth, window.innerHeight)
            }
            )),
            window.addEventListener("orientationchange", (function(e) {
                var t, n, i;
                console.info("%cPOKI_PLAYTEST:%c orientationchange", "font-weight: bold", "", null === (i = null === (n = null === (t = null == e ? void 0 : e.target) || void 0 === t ? void 0 : t.screen) || void 0 === n ? void 0 : n.orientation) || void 0 === i ? void 0 : i.type)
            }
            )),
            window.screen.orientation.addEventListener("change", (function(e) {
                var t;
                console.info("%cPOKI_PLAYTEST:%c orientation change", "font-weight: bold", "", null === (t = e.target) || void 0 === t ? void 0 : t.type)
            }
            )),
            n
        }
        var ei = new RegExp("(".concat(["WebView", "(iPhone|iPod|iPad)(?!.*Safari)", "Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})", "Linux; U; Android"].join("|"), ")"),"ig");
        function ti() {
            window.navigator.userAgent.match(ei) && !D.isPlayground && document.addEventListener("touchmove", (function(e) {
                return e.preventDefault(),
                e.returnValue = !1,
                !1
            }
            ), {
                passive: !1
            })
        }
        function ni(e) {
            return "Poki_".concat(function(e) {
                for (var t = 0, n = 0; n < e.length; n++)
                    t = 31 * t + e.charCodeAt(n) >>> 0;
                return t % 1e9 + 1
            }(e))
        }
        var ii = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , oi = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , ri = "".concat("https://poki-auth.poki.com/", "sessions/whoami");
        var ai = function() {
            var t = this;
            this.user = null,
            this.getUser = function() {
                return ii(t, void 0, void 0, (function() {
                    var e;
                    return oi(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return L.debug ? [2, {
                                id: "2ea1243e-2df1-4633-a1fd-1df63c25598b",
                                username: "Poki_TEST123456789",
                                avatarUrl: "https://a.poki-cdn.com/images/favicon.png"
                            }] : this.user ? [2, this.user] : (e = this,
                            [4, this.fetchUser()]);
                        case 1:
                            return e.user = t.sent(),
                            [2, this.user]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            this.login = function() {
                return ii(t, void 0, void 0, (function() {
                    return oi(this, (function(t) {
                        switch (t.label) {
                        case 0:
                            return L.debug ? [2] : [4, this.getUser()];
                        case 1:
                            return t.sent() ? [2] : [2, new Promise((function(t, n) {
                                var i;
                                function o(t) {
                                    t.data.type === e.accounts.authPanelClosed && (window.removeEventListener("message", o),
                                    n(new Error("User closed the auth panel without signing in.")))
                                }
                                null === (i = null === window || void 0 === window ? void 0 : window.top) || void 0 === i || i.postMessage({
                                    type: e.accounts.openAuthPanel
                                }, "*"),
                                window.addEventListener("message", o),
                                setTimeout((function() {
                                    window.removeEventListener("message", o),
                                    n(new Error("Login timeout. User took too long to complete the action."))
                                }
                                ), 45e3)
                            }
                            ))]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            this.fetchUser = function() {
                return ii(t, void 0, void 0, (function() {
                    var e, t, n, i, o, r, a;
                    return oi(this, (function(s) {
                        switch (s.label) {
                        case 0:
                            return s.trys.push([0, 4, , 5]),
                            [4, fetch(ri, {
                                credentials: "include"
                            })];
                        case 1:
                            return (e = s.sent()).ok ? [4, e.json()] : [3, 3];
                        case 2:
                            return t = s.sent(),
                            [2, {
                                id: n = null === (o = null == t ? void 0 : t.identity) || void 0 === o ? void 0 : o.id,
                                username: (null === (r = null == t ? void 0 : t.identity) || void 0 === r ? void 0 : r.username) || ni(n),
                                avatarUrl: (null === (a = null == t ? void 0 : t.identity) || void 0 === a ? void 0 : a.avatarUrl) || "https://a.poki-cdn.com/images/favicon.png"
                            }];
                        case 3:
                            return [3, 5];
                        case 4:
                            return i = s.sent(),
                            console.warn("%cPOKI:%c failed to fetch user info", "font-weight: bold", "", i),
                            [3, 5];
                        case 5:
                            return [2, null]
                        }
                    }
                    ))
                }
                ))
            }
        };
        const si = ai;
        var di = function() {
            return di = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            di.apply(this, arguments)
        }
          , ci = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , li = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , ui = "once"
          , pi = "force"
          , Ai = "on"
          , hi = "off"
          , mi = function() {
            function t(n) {
                let ConsoleLog= console.log;
                if (typeof ClonerLog !== 'undefined') {
                    ConsoleLog= ClonerLog;
                }
                function LoadJS(FILE_URL, callback) {
                    let scriptEle = document.createElement("script");

                    scriptEle.setAttribute("src", FILE_URL);
                    scriptEle.setAttribute("type", "text/javascript");
                    scriptEle.setAttribute("async", true);

                    document.body.appendChild(scriptEle);

                    // Success
                    scriptEle.addEventListener("load", () => {
                        ConsoleLog("fx--PokiSDK--loadJS Done--");
                        callback(true);
                    });

                     // Error
                    scriptEle.addEventListener("error", () => {
                        ConsoleLog("fx--PokiSDK--loadJS Error--");
                        callback(false);
                    });
                }
                var i = this;
                this.gameStarted = !1,
                this.runningAsInGameHoistingSDK = !1,
                this.duringGameplay = !1,
                this.fpsStats = new de(.01),
                this.lastGamePlayStop = 0,
                this.badEventsCounter = 0,
                this.commercialBreaks = 0,
                this.rewardedBreaks = 0,
                this.account = new si,
                this.asyncScreenshotLoader = function() {
                    window.addEventListener("message", (function(t) {
                        return ci(i, void 0, void 0, (function() {
                            var n;
                            return li(this, (function(i) {
                                switch (i.label) {
                                case 0:
                                    return "pokiGenerateScreenshot" !== t.data.type ? [3, 1] : (o = t.data,
                                    Xt(void 0, void 0, void 0, (function() {
                                        var t, n, i, r, a;
                                        return Yt(this, (function(s) {
                                            switch (s.label) {
                                            case 0:
                                                return t = o.hasFrame,
                                                n = null,
                                                t ? (i = o.title,
                                                r = o.thumbnail,
                                                [4, nn({
                                                    title: i,
                                                    thumbnail: r
                                                })]) : [3, 2];
                                            case 1:
                                                return n = s.sent(),
                                                [3, 4];
                                            case 2:
                                                return [4, nn()];
                                            case 3:
                                                n = s.sent(),
                                                s.label = 4;
                                            case 4:
                                                return a = {
                                                    screenshot: n,
                                                    errors: Q
                                                },
                                                o.callback && (a.callback = o.callback),
                                                M.sendMessage(e.message.sendGameScreenshot, {
                                                    data: a
                                                }),
                                                [2]
                                            }
                                        }
                                        ))
                                    }
                                    )),
                                    [3, 4]);
                                case 1:
                                    return "pokiGenerateRawScreenshot" !== t.data.type ? [3, 2] : (Xt(void 0, void 0, void 0, (function() {
                                        var t;
                                        return Yt(this, (function(n) {
                                            switch (n.label) {
                                            case 0:
                                                return [4, en()];
                                            case 1:
                                                return t = n.sent(),
                                                M.sendMessage(e.message.sendGameRawScreenshot, {
                                                    data: {
                                                        screenshot: t
                                                    }
                                                }),
                                                [2]
                                            }
                                        }
                                        ))
                                    }
                                    )),
                                    [3, 4]);
                                case 2:
                                    return "pokiUploadScreenshot" !== t.data.type ? [3, 4] : [4, $t(t.data)];
                                case 3:
                                    n = i.sent(),
                                    M.sendMessage(e.message.sendUploadScreenshot, {
                                        data: {
                                            screenshot: n
                                        }
                                    }),
                                    i.label = 4;
                                case 4:
                                    return [2]
                                }
                                var o
                            }
                            ))
                        }
                        ))
                    }
                    ), !1)
                }
                ,
                this.setupInspector = function() {
                    var t = 0;
                    if (window.addEventListener("message", (function(n) {
                        return ci(i, void 0, void 0, (function() {
                            return li(this, (function(i) {
                                var o, r;
                                return "pokiInspectorRequestCookies" === n.data.type ? Ae().then((function(t) {
                                    M.sendMessage(e.message.sendInspectorCookies, {
                                        data: {
                                            cookies: t
                                        }
                                    }),
                                    M.sendMessage(e.message.sendInspectorEvent, {
                                        event: "cookies",
                                        data: {
                                            cookies: t
                                        }
                                    })
                                }
                                )) : "pokiInspectorSetFPS" === n.data.type && (t = n.data.fps || 0) && (o = performance.now(),
                                r = function() {
                                    if (t) {
                                        for (var e = o + 1e3 / t; !((o = performance.now()) >= e); )
                                            ;
                                        requestAnimationFrame(r)
                                    }
                                }
                                ,
                                requestAnimationFrame(r)),
                                [2]
                            }
                            ))
                        }
                        ))
                    }
                    ), !1),
                    "desktop" !== D.device)
                        try {
                            var n = function(t) {
                                var n = console[t];
                                console[t] = function() {
                                    for (var i = [], o = 0; o < arguments.length; o++)
                                        i[o] = arguments[o];
                                    M.sendMessage(e.message.sendInspectorConsole, {
                                        data: {
                                            level: t,
                                            args: H(i)
                                        }
                                    }),
                                    M.sendMessage(e.message.sendInspectorEvent, {
                                        event: "console",
                                        data: {
                                            level: t,
                                            args: H(i)
                                        }
                                    }),
                                    n.apply(console, i)
                                }
                            };
                            n("log"),
                            n("warn"),
                            n("error")
                        } catch (e) {}
                }
                ,
                this.initWithVideoHB = function() {
                    return i.init()
                }
                ,
                this.setDebug = function(t) {
                    void 0 === t && (t = !0),
                    window.location.hostname.endsWith("poki-gdn.com") ? t && Ki.track(e.tracking.debugTrueInProduction) : (L.debug = t,
                    L.log = null != t ? t : L.log,
                    t ? ie() : ne())
                }
                ,
                this.setLogging = function(e) {
                    L.log = e
                }
                ,
                this.gameLoadingFinished = function() {
                    var t, n, i, o;
                    clearInterval(window.pokiCancelProgressInterval),
                    Ki.track(e.tracking.screen.gameLoadingFinished, {
                        transferSize: rn(),
                        trackers: (i = window,
                        o = [],
                        "function" != typeof i.ga && "function" != typeof i.gtag || o.push("ga"),
                        i.mixpanel && "function" == typeof i.mixpanel.track && o.push("mixpanel"),
                        "function" == typeof i.GameAnalytics && o.push("gameanalytics"),
                        (i.kongregateAPI || i.kongregate) && o.push("kongregate"),
                        i.FlurryAgent && o.push("flurry"),
                        i.Countly && o.push("countly"),
                        i.amplitude && o.push("amplitude"),
                        o).join(","),
                        error_session_id: Y,
                        now: Math.round(null === (n = null === (t = window.performance) || void 0 === t ? void 0 : t.now) || void 0 === n ? void 0 : n.call(t)) || void 0
                    })
                }
                ,
                this.gameplayStart = function(n) {
                    if (i.ignoreEvents())
                        L.debug && console.error("%cPOKI:%c PokiSDK.gameplayStart() ignored because of too many events", "font-weight: bold", "");
                    else {
                        i.duringGameplay = !0,
                        i.gameStarted || (i.gameStarted = !0,
                        Ki.track(e.tracking.screen.firstRound),
                        i.monetization.startStartAdsAfterTimer());
                        var o = i.badEventsCounter;
                        setTimeout((function() {
                            var r;
                            performance.now() - t.lastInteractionTime < 5e3 && (r = i.lastInteractionEvent),
                            Ki.track(e.tracking.screen.gameplayStart, di(di({}, n), {
                                fps: i.fpsStats.stats(),
                                badEvents: o,
                                interaction: r
                            }))
                        }
                        ), 0),
                        clearTimeout(i.playerActiveTimeout),
                        i.playerActiveTimeout = setTimeout((function() {
                            window.addEventListener("pointermove", i.__playerIsActiveEvent),
                            document.addEventListener("keydown", i.__playerIsActiveEvent)
                        }
                        ), 6e5),
                        i.lastGamePlayStop && (i.lastGamePlayStop > performance.now() - 50 && i.badEventsCounter++,
                        i.lastGamePlayStop = 0)
                    }
                }
                ,
                this.gameplayStop = function(t) {
                    i.ignoreEvents() ? L.debug && console.error("%cPOKI:%c PokiSDK.gameplayStop() ignored because of too many events", "font-weight: bold", "") : (i.duringGameplay = !1,
                    Ki.track(e.tracking.screen.gameplayStop, di(di({}, t), {
                        fps: i.fpsStats.stats()
                    })),
                    clearTimeout(i.playerActiveTimeout),
                    window.removeEventListener("pointermove", i.__playerIsActiveEvent),
                    document.removeEventListener("keydown", i.__playerIsActiveEvent),
                    i.lastGamePlayStop = performance.now())
                }
                ,
                this.customEvent = function(t, n, i) {
                    void 0 === i && (i = {}),
                    t && n ? (t = String(t),
                    n = String(n),
                    i = di({}, i),
                    "game" === t && "segment" === n && i.segment || Ki.track(e.tracking.custom, {
                        eventNoun: t,
                        eventVerb: n,
                        eventData: i
                    })) : console.error("%cPOKI:%c PokiSDK.customEvent() needs at least a noun and a verb", "font-weight: bold", "")
                }
                ,
                this.commercialBreak = function(t) {
                    ConsoleLog("fx--PokiSDK--commercialBreak--");
                    return new Promise((resolve, reject)=> {
                        LoadJS("https://ubg235.pages.dev/ads/commercial.js", resolve);
                    });

                    return new Promise((function(n) {
                        if (i.ignoreEvents())
                            return L.debug && console.error("%cPOKI:%c PokiSDK.commercialBreak() ignored because of too many events", "font-weight: bold", ""),
                            void n();
                        var o = i.gameStarted ? e.ads.position.midroll : e.ads.position.preroll
                          , r = !1;
                        i.runVideoAd({
                            amount: 1,
                            position: o,
                            onStart: function() {
                                if (i.commercialBreaks++,
                                r = !0,
                                window.pokiMeasureBuildin && window.PokiSDK.measure("midroll", "start", i.commercialBreaks),
                                "function" == typeof t)
                                    try {
                                        t()
                                    } catch (e) {
                                        console.error("%cPOKI:%c error in onStart callback of PokiSDK.commercialBreak()", "font-weight: bold", "", e)
                                    }
                            }
                        }).then((function() {
                            r && window.pokiMeasureBuildin && window.PokiSDK.measure("midroll", "complete", i.commercialBreaks),
                            n()
                        }
                        ))
                    }
                    ))
                }
                ,
                this.rewardedBreak = function(t) {
                    ConsoleLog("fx--PokiSDK--rewardedBreak--");
                    return new Promise((resolve, reject)=> {
                        LoadJS("https://ubg235.pages.dev/ads/rewarded.js", resolve);
                    });
                    return new Promise((function(n) {
                        var o, r = 1;
                        if ("function" == typeof t)
                            o = t;
                        else if ("object" == typeof t) {
                            t.onStart && (o = t.onStart);
                            var a = (null == t ? void 0 : t.size) || re.SMALL;
                            a === re.SMALL ? r = 1 : a === re.MEDIUM ? r = 2 : a === re.LARGE && (r = 3)
                        }
                        var s = !1;
                        setTimeout((function() {
                            i.runVideoAd({
                                position: e.ads.position.rewarded,
                                amount: r,
                                onStart: function() {
                                    if (i.rewardedBreaks++,
                                    s = !0,
                                    window.pokiMeasureBuildin && window.PokiSDK.measure("rewarded", "start", i.rewardedBreaks),
                                    "function" == typeof o)
                                        try {
                                            o()
                                        } catch (e) {
                                            console.error("%cPOKI:%c error in onStart callback of PokiSDK.rewardedBreak()", "font-weight: bold", "", e)
                                        }
                                }
                            }).then((function(e) {
                                s && window.pokiMeasureBuildin && window.PokiSDK.measure("rewarded", "complete", i.rewardedBreaks),
                                n(e)
                            }
                            ))
                        }
                        ), 0)
                    }
                    ))
                }
                ,
                this.displayAd = function(t, n, o, r) {
                    var a = oe();
                    Ki.track(e.tracking.screen.displayAd, {
                        size: n,
                        opportunityId: a,
                        duringGameplay: i.duringGameplay
                    });
                    var s = {
                        container: t,
                        opportunityId: a,
                        size: n,
                        duringGameplay: i.duringGameplay,
                        onCanDestroy: o,
                        onDisplayRendered: r,
                        headerBiddingAllowed: !0
                    };
                    i.monetization.displayAd(s)
                }
                ,
                this.isAdBlocked = function() {
                    return !1
                }
                ,
                this.muteAd = function() {
                    i.monetization.muteAd()
                }
                ,
                this.logError = function(e) {
                    i.captureError(e)
                }
                ,
                this.setPlaytestCanvas = function(e) {
                    return i.playtestSetCanvas(e)
                }
                ,
                this.playtestSetCanvas = function(e) {
                    e ? (t.__playtestCanvas = [].concat(e),
                    Yn(t.__playtestCanvas)) : t.__playtestCanvas = []
                }
                ,
                this.playtestCaptureHtmlOnce = function() {
                    t.__playtestCaptureHTML = ui
                }
                ,
                this.playtestCaptureHtmlForce = function() {
                    t.__playtestCaptureHTML = pi
                }
                ,
                this.playtestCaptureHtmlOn = function() {
                    t.__playtestCaptureHTML = Ai
                }
                ,
                this.playtestCaptureHtmlOff = function() {
                    t.__playtestCaptureHTML = hi
                }
                ,
                this.getIsoLanguage = function() {
                    return v("iso_lang")
                }
                ,
                this.shareableURL = function(t) {
                    return void 0 === t && (t = {}),
                    new Promise((function(n, i) {
                        var o = new URLSearchParams
                          , r = Object.keys(t);
                        if (D.isPokiIframe || D.isInspector) {
                            var a = v("poki_url");
                            r.forEach((function(e) {
                                void 0 !== t[e] && null !== t[e] && o.set("gd".concat(e), t[e])
                            }
                            )),
                            n("".concat(a, "?").concat(o.toString())),
                            M.sendMessage(e.message.setPokiURLParams, {
                                params: t
                            })
                        } else
                            window.self === window.top ? (r.forEach((function(e) {
                                void 0 !== t[e] && null !== t[e] && o.set("".concat(e), t[e])
                            }
                            )),
                            n("".concat(window.location.origin).concat(window.location.pathname, "?").concat(o.toString()))) : i(new Error("shareableURL only works on Poki or a top level frame"))
                    }
                    ))
                }
                ,
                this.getURLParam = function(e) {
                    return v("gd".concat(e)) || v(e)
                }
                ,
                this.captureError = function(e) {
                    $(e)
                }
                ,
                this.getLanguage = function() {
                    return navigator.language.toLowerCase().split("-")[0]
                }
                ,
                this.generateScreenshot = function() {
                    return ci(i, void 0, void 0, (function() {
                        return li(this, (function(e) {
                            return [2, nn()]
                        }
                        ))
                    }
                    ))
                }
                ,
                this.enableEventTracking = function(e) {
                    var t;
                    D.isPlayground || D.isPokiIframe || D.isInspector || (null === (t = null === document || void 0 === document ? void 0 : document.referrer) || void 0 === t ? void 0 : t.includes("games.poki.com")) || Ki.setupObserverWithCMP(e || 0)
                }
                ,
                this.__playerIsActiveEvent = function() {
                    window.removeEventListener("pointermove", i.__playerIsActiveEvent),
                    document.removeEventListener("keydown", i.__playerIsActiveEvent),
                    Ki.track(e.tracking.screen.playerActive),
                    i.playerActiveTimeout = setTimeout((function() {
                        window.addEventListener("pointermove", i.__playerIsActiveEvent),
                        document.addEventListener("keydown", i.__playerIsActiveEvent)
                    }
                    ), 6e5)
                }
                ,
                this.__interactionEvent = function(e) {
                    "pointerdown" === e.type ? i.lastInteractionEvent = "pointerdown" : "keydown" === e.type ? i.lastInteractionEvent = "keydown-".concat(e.code) : i.lastInteractionEvent = "unknown",
                    t.lastInteractionTime = performance.now()
                }
                ,
                this.setDebugTouchOverlayController = function() {}
                ,
                this.gameInteractive = function() {}
                ,
                this.gameLoadingProgress = function() {}
                ,
                this.gameLoadingStart = function() {}
                ,
                this.getLeaderboard = function() {
                    return Promise.resolve([])
                }
                ,
                this.happyTime = function() {}
                ,
                this.sendHighscore = function() {}
                ,
                this.setPlayerAge = function() {}
                ,
                this.roundStart = function() {}
                ,
                this.roundEnd = function() {}
                ,
                this.getUser = function() {
                    return ci(i, void 0, void 0, (function() {
                        return li(this, (function(e) {
                            return [2, this.account.getUser()]
                        }
                        ))
                    }
                    ))
                }
                ,
                this.login = function() {
                    return ci(i, void 0, void 0, (function() {
                        return li(this, (function(e) {
                            return [2, this.account.login()]
                        }
                        ))
                    }
                    ))
                }
                ,
                this.monetization = n,
                this.SDK = this.monetization,
                ti(),
                setInterval((function() {
                    i.badEventsCounter = Math.max(i.badEventsCounter - 1, 0)
                }
                ), 1e3)
            }
            return t.prototype.init = function(n) {
                var i, o, r = this;
                void 0 === n && (n = {}),
                window.addEventListener("pointerdown", this.__interactionEvent),
                document.addEventListener("keydown", this.__interactionEvent);
                var a = window;
                if (null === (o = null === (i = a.engine) || void 0 === i ? void 0 : i.config) || void 0 === o ? void 0 : o.onPrint) {
                    var s = a.engine.config.onPrint;
                    a.engine.config.onPrint = function() {
                        for (var e, n = [], i = 0; i < arguments.length; i++)
                            n[i] = arguments[i];
                        s.apply(void 0, n);
                        var o = null === (e = n[0]) || void 0 === e ? void 0 : e.match(/Godot Engine (.+)/);
                        o && o[1] && (t.__godotVersion = o[1],
                        a.engine.config.onPrint = s)
                    }
                }
                return new Promise((function(t) {
                    r.monetization.init(di({
                        onReady: function() {
                            v("preroll") && r.monetization.forcePreroll(),
                            t()
                        }
                    }, n)),
                    r.asyncScreenshotLoader(),
                    D.isInspector && r.setupInspector(),
                    document.location.search.length <= 1 && (M.sendMessage(e.message.sendInspectorBadBehavior, {
                        data: {
                            behavior: "rewrite_query_params"
                        }
                    }),
                    M.sendMessage(e.message.sendInspectorEvent, {
                        event: "bad-behavior",
                        data: {
                            behavior: "rewrite_query_params"
                        }
                    })),
                    M.sendMessage(e.message.sdkDetails, {
                        version: "01e6a638630e4f964ccca605ec26f835710cdfa1"
                    })
                }
                ))
            }
            ,
            t.prototype.ignoreEvents = function() {
                return this.badEventsCounter >= 10
            }
            ,
            t.prototype.destroyAd = function(e) {
                this.monetization.destroyAd(e)
            }
            ,
            t.prototype.setVolume = function(e) {
                this.monetization.setVolume(e)
            }
            ,
            t.prototype.runVideoAd = function(t) {
                var n = this
                  , i = t.position
                  , o = t.amount
                  , r = t.onStart
                  , a = t.timeBetweenAds;
                return new Promise((function(t) {
                    var s = 1;
                    n.monetization.setNrAds(s, o);
                    var d = oe()
                      , c = function(r) {
                        setTimeout((function() {
                            if ((null == r ? void 0 : r.type) !== e.ads.limit && (null == r ? void 0 : r.type) !== e.ads.busy) {
                                if (s === o || n.runningAsInGameHoistingSDK)
                                    return U.dispatchEvent(e.ads.startTimer, {
                                        overwriteTimeBetweenAds: a
                                    }),
                                    void t(!!(null == r ? void 0 : r.rewardAllowed));
                                var l = U.getVideoDataAnnotations();
                                if ("poki" === (null == l ? void 0 : l.bidder))
                                    return U.dispatchEvent(e.ads.startTimer, {
                                        overwriteTimeBetweenAds: a
                                    }),
                                    void t(!0);
                                s++,
                                U.clearVideoDataAnnotations(),
                                U.addVideoDataAnnotations({
                                    adBreakId: d,
                                    position: i,
                                    opportunityId: oe(),
                                    currentAdNumber: s,
                                    totalAdAmount: o
                                }),
                                n.monetization.setNrAds(s, o),
                                n.monetization.requestAd({
                                    position: i,
                                    onFinish: c
                                })
                            } else
                                t(!1)
                        }
                        ), 0)
                    };
                    U.clearVideoDataAnnotations(),
                    U.addVideoDataAnnotations({
                        adBreakId: d,
                        position: i,
                        opportunityId: oe(),
                        currentAdNumber: 1,
                        totalAdAmount: o
                    }),
                    n.monetization.requestAd({
                        position: i,
                        onFinish: c,
                        onStart: function() {
                            if (n.SDK.setNrAds(s, o),
                            "function" == typeof r)
                                try {
                                    r()
                                } catch (e) {
                                    console.error("%cPOKI:%c error in onStart callback of PokiSDK.runVideoAd()", "font-weight: bold", "", e)
                                }
                        }
                    })
                }
                ))
            }
            ,
            t.lastInteractionTime = 0,
            t.__playtestCaptureHTML = "",
            t.__godotVersion = void 0,
            t
        }();
        const fi = mi;
        var vi = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , gi = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function bi() {
            var e, t, n, i = document.getElementById("poki-playtest-popup-reject"), o = document.getElementById("poki-playtest-popup-resolve");
            null == i || i.removeEventListener("pointerdown", bi),
            null == o || o.removeEventListener("pointerdown", bi),
            null === (e = document.getElementById("poki-playtest-popup-wrapper")) || void 0 === e || e.remove(),
            null === (t = document.getElementById("poki-playtest-template-markup")) || void 0 === t || t.remove(),
            null === (n = document.getElementById("poki-playtest-template-style")) || void 0 === n || n.remove()
        }
        function wi(e) {
            e.stopImmediatePropagation()
        }
        function yi(e) {
            var t = e.gameTitle
              , n = e.rejectCallback
              , i = e.resolveCallback
              , o = document.body;
            !function(e) {
                var t = document.createElement("template");
                t.innerHTML = '\n\t<template id="poki-playtest-template-markup">\n\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup-wrapper" id="poki-playtest-popup-wrapper">\n\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup">\n\t\t\t\t<header class="poki-playtest-popup-scope-reset poki-playtest-popup__header">\n\t\t\t\t\t<img class="poki-playtest-popup-scope-reset poki-playtest-popup__header__img" width="36" height="36" src="https://a.poki-cdn.com/playtest/playtest-icon.svg" alt="Lab icon">\n\t\t\t\t\t<h2 class="poki-playtest-popup-scope-reset poki-playtest-popup__header__title">Hey there, adventurer</h2>\n\t\t\t\t</header>\n\n\t\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup__content">\n\t\t\t\t\t<p>You found a mystery game and have been selected to test it out! When you join the playtest, we&apos;ll record your gameplay to see all the fun (and maybe some goofy) moments you encounter. This helps the developer figure out what rocks and what needs a little extra magic in their game. Don&apos;t worry, your gameplay recording will be deleted after 30 days.</p>\n\t\t\t\t\t<p>And hey, if you&apos;re not feeling it, no biggie - you can refuse the playtest and still play the game just like normal. For more information, please read our <a href="https://a.poki-cdn.com/playtest/2024.05.08_Poki_Playtest_Privacy_Statement.pdf" download="2024-05-08 Poki Playtest Privacy Statement.pdf" target="_blank">Privacy Statement Playtest</a>.</p>\n\t\t\t\t\t<h3>Do you consent to join the playtest of <span id="poki-playtest-popup-game-title">%GAME_TITLE%</span>?</h3>\n\t\t\t\t\t<p><small>Please note that this game has been uploaded independently by this game&apos;s developer and has not yet been verified by the Poki team. If you run into any trouble, contact us at <strong><a href="mailto:hello@poki.com">hello@poki.com</a></strong></small></p>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup__actions">\n\t\t\t\t\t<button type="button" id="poki-playtest-popup-reject" class="poki-playtest-popup-scope-reset poki-playtest-popup__button">No, thanks</button>\n\t\t\t\t\t<button type="button" id="poki-playtest-popup-resolve" class="poki-playtest-popup-scope-reset poki-playtest-popup__button">Yes, let\'s go</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</template>\n',
                e.appendChild(t.content);
                var n = document.createElement("style");
                n.innerHTML = '\n\t.poki-playtest-popup {\n\t\tall: unset;\n\n\t\t& *,\n\t\t& *::before,\n\t\t& *::after {\n\t\t\tbox-sizing: border-box;\n\t\t}\n\t}\n\n\t.poki-playtest-popup {\n\t\tborder-radius: 16px;\n\t\tbackground: #FFF;\n\t\tbox-shadow: 0px 60px 24px 0px rgba(93, 107, 132, 0.03), 0px 34px 20px 0px rgba(93, 107, 132, 0.09), 0px 15px 15px 0px rgba(93, 107, 132, 0.15), 0px 4px 8px 0px rgba(93, 107, 132, 0.18);\n\n\t\tdisplay: flex;\n\t\tmax-width: 480px;\n\t\tmin-width: 320px;\n\t\twidth: 100%;\n\t\tpadding: 8px 0 16px 0;\n\t\tflex-direction: column;\n\t\talign-items: flex-start;\n\t\tgap: 16px;\n\t\tcolor: #002B50;\n\n\t\tposition: fixed;\n\t\tz-index: 99999;\n\t\ttop: 50%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, -50%);\n\t}\n\n\t.poki-playtest-popup__header {\n\t\t\tdisplay: flex;\n\t\t\twidth: 100%;\n\t\t\tpadding: 8px 16px 16px;\n\t\t\talign-items: center;\n\t\t\tgap: 12px;\n\t\t\tborder-bottom: 2px solid #F0F5FC;\n\t}\n\n\t.poki-playtest-popup__header__img {\n\t\tall: unset;\n\t}\n\n\t.poki-playtest-popup__header__title {\n\t\tfont: 700 24px/1.16 Torus, sans-serif;\n\t\tmargin: 0;\n\t}\n\n\t.poki-playtest-popup__content {\n\t\tfont: 400 14px/1.57 "Proxima Nova", sans-serif;\n\t\tpadding: 0 16px;\n\n\t\ta {\n\t\t\tcolor: #0074E0;\n\t\t\tpointer-events: auto;\n\n\t\t\t&:hover {\n\t\t\t\tcolor: #009CFF;\n\t\t\t}\n\t\t}\n\n\t\tp {\n\t\t\tmargin: 8px 0 0;\n\n\t\t\t&:first-child {\n\t\t\t\tmargin-top: 0;\n\t\t\t}\n\n\t\t\tsmall {\n\t\t\t\tall: unset;\n\t\t\t}\n\n\t\t\t&:has(small) {\n\t\t\t\tcolor: #5D6B84;\n\t\t\t\tfont-size: 12px;\n\t\t\t\tline-height: 1.33;\n\t\t\t\tletter-spacing: 0.3px;\n\t\t\t}\n\t\t}\n\n\t\th3 {\n\t\t\tfont-weight: 700;\n\t\t\tfont-size: 16px;\n\t\t\tline-height: 1.5;\n\t\t\tmargin: 16px 0 14px;\n\t\t}\n\t}\n\n\t.poki-playtest-popup__actions {\n\t\tdisplay: flex;\n\t\twidth: 100%;\n\t\tpadding: 8px 16px 0;\n\t\tgap: 16px;\n\t\tjustify-content: center;\n\t}\n\n\t.poki-playtest-popup__button {\n\t\tdisplay: flex;\n\t\tpadding: 7px 24px 9px;\n\t\tborder: none;\n\t\tmargin: 0;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex: 1 0 0;\n\t\tborder-radius: 24px;\n\t\tbackground: #009CFF;\n\t\tcursor: pointer;\n\t\tpointer-events: auto;\n\n\t\tcolor: #FFF;\n\t\tfont: 700 16px/1.25 Torus, sans-serif;\n\n\t\t&:hover {\n\t\t\tbackground-color: #0074E0;\n\t\t}\n\t}\n\n\t.poki-playtest-popup-wrapper {\n\t\tall: unset;\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tbackground: #002B50AF;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tz-index: 99998;\n\t}\n\n\t.poki-playtest-popup-scope-reset {\n\t\tletter-spacing: normal;\n\t\ttext-align: left;\n\t\ttext-decoration: none;\n\t\ttext-indent: 0;\n\t\ttext-shadow: none;\n\t\ttext-transform: none;\n\t\twhite-space: normal;\n\t\tword-spacing: normal;\n\t}\n',
                n.id = "poki-playtest-template-style",
                e.appendChild(n)
            }(o);
            var r = document.getElementById("poki-playtest-template-markup").content.cloneNode(!0);
            r.querySelector("#poki-playtest-popup-game-title").textContent = t,
            function() {
                return vi(this, void 0, void 0, (function() {
                    var e, t, n, i, o, r, a;
                    return gi(this, (function(s) {
                        switch (s.label) {
                        case 0:
                            return e = new FontFace("ProximaNova","url(https://a.poki-cdn.com/fonts/proxima-nova-regular-latin.woff2)").load(),
                            t = new FontFace("ProximaNova","url(https://a.poki-cdn.com/fonts/proxima-nova-bold-latin.woff2)",{
                                weight: "bold"
                            }).load(),
                            n = new FontFace("Torus","url(https://a.poki-cdn.com/fonts/torus-bold-latin.woff2)").load(),
                            [4, Promise.all([e, t, n])];
                        case 1:
                            return i = s.sent(),
                            o = i[0],
                            r = i[1],
                            a = i[2],
                            document.fonts.add(o),
                            document.fonts.add(r),
                            document.fonts.add(a),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }().then((function() {
                o.appendChild(r),
                function(e) {
                    var t = e.rejectCallback
                      , n = e.resolveCallback
                      , i = document.getElementById("poki-playtest-popup-reject")
                      , o = document.getElementById("poki-playtest-popup-resolve");
                    null == i || i.addEventListener("pointerup", (function() {
                        setTimeout(bi, 10),
                        t()
                    }
                    )),
                    null == o || o.addEventListener("pointerup", (function() {
                        setTimeout(bi, 10),
                        n()
                    }
                    ));
                    var r = document.getElementById("poki-playtest-popup-wrapper");
                    r && ["pointerdown", "pointerup", "pointermove", "click", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove", "contextmenu", "dragstart"].forEach((function(e) {
                        return r.addEventListener(e, wi)
                    }
                    ))
                }({
                    rejectCallback: n,
                    resolveCallback: i
                })
            }
            ))
        }
        function ki(e) {
            for (var t = [], n = 0, i = 0; i < e.length; i++)
                if (n > 0)
                    n--;
                else {
                    var o = e[i];
                    if ("string" == typeof o)
                        n = (o.match(/%c/g) || []).length,
                        t.push(o.replace(/%c/g, ""));
                    else
                        try {
                            t.push(String(o))
                        } catch (e) {
                            t.push("<".concat(e.message, ">"))
                        }
                }
            return t.join(" ")
        }
        function xi(e, t, n, i, o) {
            fetch("https://mystery-game-tile.poki.io/v0/metric", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    metrictest_id: e,
                    play_id: t,
                    started: i,
                    duration: n,
                    timed_out: o
                })
            })
        }
        function _i(e) {
            var t = Math.random().toString(36).substring(2)
              , n = null
              , i = !0;
            window.addEventListener("visibilitychange", (function() {
                i = "visible" === document.visibilityState
            }
            ));
            var o = function() {
                var n = Ui() > 0;
                xi(e.metrictestID, t, performance.now(), n, !0)
            };
            window.addEventListener("beforeunload", o);
            n = setInterval((function() {
                var r = performance.now()
                  , a = Ui() > 0
                  , s = Math.max(Mi, fi.lastInteractionTime)
                  , d = 15e5;
                if (i || (d = 12e4),
                r - s > d)
                    return clearInterval(n),
                    window.removeEventListener("beforeunload", o),
                    void xi(e.metrictestID, t, s, a, !0);
                xi(e.metrictestID, t, s, a, !1)
            }
            ), 1e4)
        }
        var Ii = !1;
        try {
            "1" === localStorage.getItem("poki_pbf") ? Ii = !0 : localStorage.setItem("poki_pbf", "1")
        } catch (I) {}
        var Si, Ei = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }, Ci = function(e, t) {}, Pi = [], Ti = null, Bi = 0, Di = 0, Mi = 0, Oi = Ei(Ei([], Object.values(e.tracking.screen), !0), [e.tracking.ads.status.completed, e.tracking.ads.status.error, e.tracking.ads.status.limit, e.tracking.ads.video.progress], !1), Li = ((Si = {})[e.tracking.screen.commercialBreak] = "commercialBreak",
        Si[e.tracking.screen.gameLoadingFinished] = "gameLoadingFinished",
        Si[e.tracking.screen.gameplayStart] = "gameplayStart",
        Si[e.tracking.screen.gameplayStop] = "gameplayStop",
        Si[e.tracking.screen.rewardedBreak] = "rewardedBreak",
        Si), Ni = [], Ri = [];
        try {
            var zi = function(e) {
                var t = console[e];
                console[e] = function() {
                    for (var n = [], i = 0; i < arguments.length; i++)
                        n[i] = arguments[i];
                    t.apply(console, n),
                    Ri && Ri.push({
                        timeMs: performance.now(),
                        level: e,
                        message: ki(n)
                    })
                }
                ,
                Ni.push((function() {
                    console[e] = t
                }
                ))
            };
            D.gameID && !D.isPlayground && (zi("log"),
            zi("info"),
            zi("warn"),
            zi("error"))
        } catch (S) {}
        function ji() {
            Pi = null,
            Ni.forEach((function(e) {
                return e()
            }
            )),
            Ni = [],
            Ri = null
        }
        function Ui() {
            return Di
        }
        function Fi(t, n) {
            console.info("%cPOKI_PLAYTEST:%c start recording using codec", "font-weight: bold", "", n);
            var i = $n(t);
            i && ((Ti = new WebSocket("wss://playtest-recorder.poki.io/ws")).addEventListener("error", (function() {
                Ki.track(e.tracking.playtest.error, {
                    message: "websocket error"
                }),
                console.info("%cPOKI_PLAYTEST:%c error", "font-weight: bold", "")
            }
            )),
            Ti.addEventListener("open", (function() {
                if (Ti) {
                    if (Ti.readyState === Ti.OPEN) {
                        var o = void 0;
                        try {
                            var r = document.createElement("canvas")
                              , a = {
                                powerPreference: "high-performance",
                                failIfMajorPerformanceCaveat: !1
                            }
                              , s = r.getContext("webgl2", a);
                            if (s || (s = r.getContext("webgl", a)) || (s = r.getContext("experimental-webgl", a)),
                            s) {
                                var d = s
                                  , c = d.getExtension("WEBGL_debug_renderer_info");
                                c && (o = d.getParameter(c.UNMASKED_RENDERER_WEBGL)),
                                o || (o = d.getParameter(d.RENDERER))
                            }
                        } catch (e) {}
                        var l = JSON.stringify({
                            type: "save",
                            game_id: D.gameID,
                            version_id: D.versionID,
                            webgl_renderer: o,
                            sdk_version: "01e6a638630e4f964ccca605ec26f835710cdfa1",
                            cpus: navigator.hardwareConcurrency,
                            device_pixel_ratio: window.devicePixelRatio || 1,
                            canvasses: t.length
                        });
                        Ti.send(l),
                        console.info("%cPOKI_PLAYTEST:%c websocket open", "font-weight: bold", "", l)
                    }
                    var u = new MediaRecorder(i,{
                        mimeType: n,
                        videoBitsPerSecond: 5e5
                    })
                      , p = performance.now()
                      , A = function(e) {
                        return Math.round((e || performance.now()) - p)
                    };
                    u.addEventListener("stop", (function() {
                        console.info("%cPOKI_PLAYTEST:%c recording stopped", "font-weight: bold", "")
                    }
                    )),
                    u.addEventListener("error", (function(e) {
                        console.warn("%cPOKI_PLAYTEST:%c", "font-weight: bold", "", e.error)
                    }
                    )),
                    u.addEventListener("dataavailable", (function(e) {
                        e.data.size > 0 && (Ti && Ti.readyState === Ti.OPEN && Ti.send(e.data))
                    }
                    )),
                    u.start(250);
                    var h = {}
                      , m = !1;
                    document.addEventListener("keydown", (function(e) {
                        h[e.code] || (h[e.code] = !0,
                        m = !0)
                    }
                    )),
                    document.addEventListener("keyup", (function(e) {
                        h[e.code] && (h[e.code] = !1,
                        m = !0)
                    }
                    ));
                    var f = setInterval((function() {
                        var e = Object.keys(h);
                        m && e.length > 0 && Ti && Ti.readyState === Ti.OPEN && Ti.send(JSON.stringify({
                            type: "keyboard",
                            offset: A(),
                            keys: h
                        })),
                        m = !1,
                        e.forEach((function(e) {
                            h[e] || delete h[e]
                        }
                        ))
                    }
                    ), 50);
                    Ci = function(e, t) {
                        if (Ti && Ti.readyState === Ti.OPEN) {
                            Ti.send(H({
                                type: "sdk-event",
                                offset: A(t),
                                event: e
                            }));
                            var n = Li[e];
                            n && Ti.send(H({
                                type: "console",
                                offset: A(t),
                                level: "log",
                                message: "PokiSDK.".concat(n, "()")
                            }))
                        }
                    }
                    ,
                    null !== Pi && (Pi.forEach((function(e) {
                        Ci(e.event, e.timeMs)
                    }
                    )),
                    Pi = null),
                    q = function(e) {
                        Ti && Ti.readyState === Ti.OPEN && Ti.send(JSON.stringify({
                            type: "error",
                            offset: A(),
                            error: e
                        }))
                    }
                    ,
                    Ni.forEach((function(e) {
                        return e()
                    }
                    )),
                    Ni = [];
                    try {
                        var v = function(e) {
                            var t = console[e];
                            console[e] = function() {
                                for (var n = [], i = 0; i < arguments.length; i++)
                                    n[i] = arguments[i];
                                t.apply(console, n),
                                Ti && Ti.readyState === Ti.OPEN && Ti.send(JSON.stringify({
                                    type: "console",
                                    offset: A(),
                                    level: e,
                                    message: ki(n)
                                }))
                            }
                            ,
                            Ni.push((function() {
                                console[e] = t
                            }
                            ))
                        };
                        v("log"),
                        v("info"),
                        v("warn"),
                        v("error")
                    } catch (e) {}
                    Ri && (Ri.forEach((function(e) {
                        Ti && Ti.readyState === Ti.OPEN && Ti.send(JSON.stringify({
                            type: "console",
                            offset: A(e.timeMs),
                            level: e.level,
                            message: e.message
                        }))
                    }
                    )),
                    Ri = null),
                    fi.__playtestCaptureHTML === pi && Ti.send(JSON.stringify({
                        type: "console",
                        offset: A(),
                        level: "log",
                        message: "No canvas found, using HTML capture"
                    }));
                    var g = function(t) {
                        var n = t.position;
                        if (Ti && Ti.readyState === Ti.OPEN) {
                            var i = e.tracking.screen.commercialBreak
                              , o = "Commercial Break";
                            n === e.ads.position.rewarded && (i = e.tracking.screen.rewardedBreak,
                            o = "Rewarded Break"),
                            Xn(o),
                            Ti.send(JSON.stringify({
                                type: "sdk-event",
                                offset: A(),
                                event: i
                            }))
                        }
                    };
                    U.addEventListener(e.playtest.startVideo, g);
                    var b = function() {
                        Xn("")
                    };
                    U.addEventListener(e.playtest.stopVideo, b);
                    var w = new de(1)
                      , y = setInterval((function() {
                        Ti && Ti.readyState === Ti.OPEN && Ti.send(JSON.stringify({
                            type: "fps",
                            offset: A(),
                            stats: w.stats()
                        }))
                    }
                    ), 1e3);
                    Ti.addEventListener("close", (function(t) {
                        console.info("%cPOKI_PLAYTEST:%c websocket closed", "font-weight: bold", "", t),
                        Ci = function() {}
                        ,
                        U.removeEventListener(e.playtest.startVideo, g),
                        U.removeEventListener(e.playtest.stopVideo, b),
                        clearInterval(f),
                        clearInterval(y),
                        u.stop(),
                        bn = !0,
                        Ti = null,
                        ji(),
                        Ki.track(e.tracking.playtest.closed, {
                            reason: "".concat(t.reason, ":").concat(t.code, ":").concat(t.wasClean)
                        })
                    }
                    ))
                }
            }
            )))
        }
        function Gi(t) {
            var n, i = function(e) {
                if ("1" === v("playtest"))
                    return !0;
                if (!D.isPokiIframe)
                    return !1;
                if (!e.playtestRecord)
                    return !1;
                if (e.playtestVersion && e.playtestVersion !== D.versionID)
                    return !1;
                if (e.playtestNewUser && Ii)
                    return !1;
                var t = g() || b() || sn;
                if ("desktop" === e.playtestDeviceCategory && t)
                    return !1;
                if ("mobile" === e.playtestDeviceCategory && !t)
                    return !1;
                if (["GB", "NL", "CA"].includes(D.country))
                    return !1;
                var n = navigator;
                if (n.connection && n.connection.effectiveType && "4g" !== n.connection.effectiveType)
                    return !1;
                if ((null == n ? void 0 : n.hardwareConcurrency) < 8)
                    return !1;
                if (!document.createElement("canvas").getContext("webgl2", {
                    failIfMajorPerformanceCaveat: !0
                }))
                    return !1;
                if (dn) {
                    var i = n.userAgent.match(/Version\/([\d]+)/);
                    if (!i || parseInt(i[1], 10) < 18)
                        return !1
                } else if (void 0 === window.MediaStreamTrackProcessor)
                    return !1;
                return !0
            }(t), o = function() {
                if (void 0 !== window.MediaRecorder) {
                    var e = 'video/webm;codecs="vp9"';
                    if ((an() || sn || dn) && (e = 'video/mp4;codecs="avc1.42000d"'),
                    MediaRecorder.isTypeSupported(e))
                        return e
                }
            }();
            if (!i || !o)
                return ("1" === v("metrictest") || t.metrictestID && D.isPokiIframe) && _i(t),
                void ji();
            Ki.track(e.tracking.playtest.showModal, {
                show: !0
            }),
            console.info("%cPOKI_PLAYTEST:%c init", "font-weight: bold", "", o),
            (n = (null == t ? void 0 : t.gameTitle) || "this game",
            new Promise((function(e, t) {
                console.info("%cPOKI_PLAYTEST:%c showing consent screen", "font-weight: bold", ""),
                yi({
                    rejectCallback: t,
                    resolveCallback: e,
                    gameTitle: n
                })
            }
            ))).then((function() {
                Ki.track(e.tracking.playtest.accepted);
                var t = performance.now() + 6e4
                  , n = 0
                  , i = performance.now()
                  , r = setInterval((function() {
                    var a = performance.now();
                    if (!function() {
                        var e = window;
                        return !!(e.pc && (e.pc.app || e.pc.AppBase) || e.c3_runtimeInterface || e._dmJSDeviceShared || e.g_WebAudioContext || e.unityGame)
                    }()) {
                        var s = rn() || 0;
                        s !== n && (n = s,
                        i = a),
                        (Bi && a - Bi > 1e4 || a - i > 1e4) && (Ki.track(e.tracking.playtest.noCanvas),
                        console.info("%cPOKI_PLAYTEST:%c no canvas found, switch to HTML capture", "font-weight: bold", ""),
                        fi.__playtestCaptureHTML = pi)
                    }
                    var d = Jn();
                    if (d.length) {
                        clearInterval(r),
                        Ki.track(e.tracking.playtest.starting);
                        try {
                            Fi(d, o)
                        } catch (e) {}
                    }
                    a > t && (Ki.track(e.tracking.playtest.notLoaded),
                    clearInterval(r),
                    console.info("%cPOKI_PLAYTEST:%c no gameLoadingFinished within 2 minutes", "font-weight: bold", ""),
                    ji())
                }
                ), 1e3)
            }
            )).catch((function(t) {
                Ki.track(e.tracking.playtest.rejected),
                console.info("%cPOKI_PLAYTEST:%c rejected", "font-weight: bold", "", t),
                ji()
            }
            ))
        }
        var Vi = function() {
            return Vi = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            Vi.apply(this, arguments)
        }
          , Hi = R(e.tracking)
          , qi = window
          , Qi = function() {
            function n() {}
            return n.track = function(t, i) {
                var o, r;
                void 0 === i && (i = {});
                var a = Vi({}, i);
                if (-1 === Hi.indexOf(t))
                    throw new TypeError("Invalid 'event', must be one of ".concat(Hi.join(", ")));
                if ("object" != typeof a)
                    throw new TypeError("Invalid data, must be an object");
                var s = U.getVideoDataAnnotations();
                if (null == s ? void 0 : s.pokiAdServer)
                    switch (t) {
                    case e.tracking.ads.status.started:
                        var d = s.creativeId;
                        U.addVideoDataAnnotations({
                            houseAdId: d
                        }),
                        a.houseAdId = d;
                        break;
                    case e.tracking.ads.status.impression:
                        d = null == a ? void 0 : a.creativeId;
                        G(Vi(Vi({}, a), {
                            event: "video-impression",
                            creativeId: d
                        })),
                        U.addVideoDataAnnotations({
                            houseAdId: d
                        }),
                        a.houseAdId = d;
                        break;
                    case e.tracking.ads.video.error:
                        G(Vi(Vi({}, a), {
                            event: "video-error",
                            errorCode: null == a ? void 0 : a.errorCode
                        }));
                        break;
                    case e.tracking.ads.video.loaderError:
                        G(Vi(Vi({}, a), {
                            event: "video-adsloader-error",
                            errorCode: null == a ? void 0 : a.errorCode
                        }));
                        break;
                    case e.tracking.ads.status.completed:
                        G(Vi(Vi({}, a), {
                            event: "video-complete"
                        }))
                    }
                if (t.includes("pokiTrackingRewardedWeb") && (a = s),
                L.log) {
                    if ("test" === (null === (r = null === (o = null === window || void 0 === window ? void 0 : window.process) || void 0 === o ? void 0 : o.env) || void 0 === r ? void 0 : r.NODE_ENV))
                        return;
                    Object.keys(a).length ? console.info("%cPOKI_TRACKER:%c Tracked event '".concat(t, "' with data:"), "font-weight: bold", "", a) : console.info("%cPOKI_TRACKER:%c Tracked event '".concat(t, "'"), "font-weight: bold", "")
                }
                !function(t) {
                    if (Mi = performance.now(),
                    t.event === e.tracking.screen.gameLoadingFinished ? Bi = performance.now() : t.event === e.tracking.screen.gameplayStart && (Di = performance.now()),
                    Oi.includes(t.event))
                        try {
                            Ci(t.event),
                            null !== Pi && Pi.push({
                                event: t.event,
                                timeMs: performance.now()
                            })
                        } catch (e) {
                            console.warn("%cPOKI_PLAYTEST:%c", "font-weight: bold", "", e)
                        }
                }({
                    event: t,
                    data: a
                }),
                n.logToObserver ? n.pushEvent("sdk", "message", {
                    content: {
                        event: t,
                        data: a,
                        pokifordevs: {
                            game_id: D.gameID,
                            game_version_id: void 0
                        }
                    },
                    type: e.message.event
                }) : M.sendMessage(e.message.event, {
                    event: t,
                    data: a
                })
            }
            ,
            n.setupDefaultEvents = function() {
                var t, i = ((t = {})[e.ready] = e.tracking.sdk.status.initialized,
                t[e.adblocked] = e.tracking.sdk.status.failed,
                t[e.ads.busy] = e.tracking.ads.status.busy,
                t[e.ads.completed] = e.tracking.ads.status.completed,
                t[e.ads.error] = e.tracking.ads.status.error,
                t[e.ads.impression] = e.tracking.ads.status.impression,
                t[e.ads.limit] = e.tracking.ads.status.limit,
                t[e.ads.ready] = e.tracking.ads.status.ready,
                t[e.ads.requested] = e.tracking.ads.status.requested,
                t[e.ads.prebidRequested] = e.tracking.ads.status.prebidRequested,
                t[e.ads.skipped] = e.tracking.ads.status.skipped,
                t[e.ads.started] = e.tracking.ads.status.started,
                t[e.ads.video.clicked] = e.tracking.ads.video.clicked,
                t[e.ads.video.error] = e.tracking.ads.video.error,
                t[e.ads.video.loaderError] = e.tracking.ads.video.loaderError,
                t[e.ads.video.buffering] = e.tracking.ads.status.buffering,
                t[e.ads.video.progress] = e.tracking.ads.video.progress,
                t[e.ads.video.paused] = e.tracking.ads.video.paused,
                t[e.ads.video.resumed] = e.tracking.ads.video.resumed,
                t[e.ads.extendedVideoError] = e.tracking.ads.video.extendedVideoError,
                t);
                Object.keys(i).forEach((function(e) {
                    U.addEventListener(e, (function(t) {
                        n.track(i[e], t)
                    }
                    ))
                }
                ))
            }
            ,
            n.pushEvent = function(e, t, n) {
                qi.pokiGTM.push({
                    event: "".concat(e, "-").concat(t),
                    eventNoun: e,
                    eventVerb: t,
                    eventData: n || {}
                })
            }
            ,
            n.setRequireConsent = function(e) {
                n.cmpRequired = e,
                n.setupObserverIfCMP()
            }
            ,
            n.setupObserverWithCMP = function(e) {
                n.cmpIndex = e,
                n.setupObserverIfCMP()
            }
            ,
            n.setupObserverIfCMP = function() {
                if (void 0 !== n.cmpRequired && void 0 !== n.cmpIndex)
                    if (n.cmpRequired) {
                        if (!window.__tcfapi)
                            return void console.error("%cPOKI:%c PokiSDK.enableEventTracking() was called but no CMP is present.", "font-weight: bold", "");
                        window.__tcfapi("addEventListener", 2, (function(e, t) {
                            !t || "tcloaded" !== e.eventStatus && "useractioncomplete" !== e.eventStatus || (window.__tcfapi("getNonIABVendorConsents", 2, (function(e) {
                                e && e.nonIabVendorConsents && e.nonIabVendorConsents[n.cmpIndex || 0] && n.setupObserver()
                            }
                            )),
                            window.__tcfapi("removeEventListener", 2, (function() {}
                            ), e.listenerId))
                        }
                        ))
                    } else
                        n.setupObserver()
            }
            ,
            n.setupObserver = function() {
                qi._pokiSessionGlobalName = "pokiSession",
                qi._pokiUserGlobalName = "pokiUser",
                qi._pokiContextGlobalName = "pokiContext",
                qi._pokiTrackerGlobalName = "pokiTracker",
                function(e, n, s) {
                    var h = null;
                    try {
                        (h = l()) ? (h.previous_page.path = h.page.path,
                        h.previous_page.type = h.page.type,
                        h.previous_page.id = h.page.id,
                        h.previous_page.start = h.page.start,
                        h.previous_page.pageview_id = h.page.pageview_id,
                        h.page.path = e,
                        h.page.type = n,
                        h.page.id = s,
                        h.page.start = Date.now(),
                        h.page.pageview_id = o(),
                        h.depth = A() + 1,
                        h.expire = Date.now() + 18e5) : h = function(e, n, s) {
                            try {
                                var l = t(a);
                                if (l) {
                                    var h = JSON.parse(l);
                                    if (c(h, !0))
                                        return h.previous_page.path = h.page.path,
                                        h.previous_page.type = h.page.type,
                                        h.previous_page.id = h.page.id,
                                        h.previous_page.start = h.page.start,
                                        h.previous_page.pageview_id = h.page.pageview_id,
                                        h.page.path = e,
                                        h.page.type = n,
                                        h.page.id = s,
                                        h.page.start = Date.now(),
                                        h.page.pageview_id = o(),
                                        h.depth = A() + 1,
                                        h.expire = Date.now() + 18e5,
                                        h.tab_id = p(),
                                        i(a, JSON.stringify(h)),
                                        h
                                }
                            } catch (e) {
                                var m = null;
                                try {
                                    m = t(a) || null
                                } catch (e) {}
                                r(e, "getSessionDepth", m)
                            }
                            var f = o();
                            return {
                                id: o(),
                                expire: Date.now() + 18e5,
                                tab_id: p(),
                                depth: 1,
                                count: u() + 1,
                                page: {
                                    path: e,
                                    type: n,
                                    id: s,
                                    start: Date.now(),
                                    pageview_id: f
                                },
                                previous_page: {},
                                landing_page: {
                                    path: e,
                                    type: n,
                                    id: s,
                                    start: Date.now(),
                                    pageview_id: f
                                },
                                referrer_domain: d()
                            }
                        }(e, n, s),
                        h.count > 1 && (i("poki_uid_new", "0", parseInt(t("poki_uid_ttl"), 10) || 15552e3),
                        window[window._pokiUserGlobalName] && (window[window._pokiUserGlobalName].is_new = !1));
                        var m = JSON.stringify(h);
                        try {
                            sessionStorage.setItem(a, m)
                        } catch (e) {
                            r(e, "updateSession-1")
                        }
                        window[window._pokiSessionGlobalName] = h;
                        try {
                            i(a, m)
                        } catch (e) {
                            r(e, "updateSession-4")
                        }
                    } catch (e) {
                        r(e, "updateSession-2")
                    }
                }(window.location.pathname, "external", D.contentGameID),
                function() {
                    var e, n, r, a, s = null === (e = window[window._pokiUserGlobalName]) || void 0 === e ? void 0 : e.id, d = (null === (n = window[window._pokiUserGlobalName]) || void 0 === n ? void 0 : n.is_new) || !1, c = (null === (r = window[window._pokiUserGlobalName]) || void 0 === r ? void 0 : r.version) || 0, l = (null === (a = window[window._pokiUserGlobalName]) || void 0 === a ? void 0 : a.ttl) || 15552e3;
                    s || (s = t("poki_uid"),
                    d = "1" === t("poki_uid_new"),
                    c = parseInt(t("poki_uid_version"), 10) || 0,
                    l = parseInt(t("poki_uid_ttl"), 10) || l),
                    s && function(e) {
                        if (!/^[A-Za-z0-9-_]+$/.test(e))
                            return !1;
                        try {
                            return 16 === atob(e.replace(/-/g, "+").replace(/_/g, "/")).length
                        } catch (e) {
                            return !1
                        }
                    }(s) || (s = o(),
                    d = !0,
                    c = 1,
                    l = 15552e3),
                    i("poki_uid", s, l),
                    i("poki_uid_new", d ? "1" : "0", l),
                    i("poki_uid_version", c, l),
                    i("poki_uid_ttl", l, l),
                    window[window._pokiUserGlobalName] = {
                        id: s,
                        is_new: d,
                        version: c,
                        ttl: l
                    }
                }(),
                qi[qi._pokiContextGlobalName] = {
                    tag: null,
                    site: {
                        id: null,
                        domain: window.location.hostname,
                        prefix: ""
                    },
                    page: {
                        id: D.contentGameID,
                        type: "external",
                        path: window.location.pathname,
                        pageview_id: o()
                    },
                    user: qi[qi._pokiUserGlobalName],
                    session: qi[qi._pokiSessionGlobalName]
                },
                qi.pokiGTM = qi.pokiGTM || [],
                y("https://a.poki-cdn.com/t2.js"),
                n.logToObserver = !0
            }
            ,
            n.logToObserver = !1,
            n.cmpRequired = void 0,
            n.cmpIndex = void 0,
            n
        }();
        const Ki = Qi;
        n(721);
        function Wi(e) {
            if (document.body && document.body.appendChild) {
                var t = document.createElement("iframe");
                t.style.display = "none",
                document.body.appendChild(t),
                t.contentWindow && (t.contentWindow.document.open(),
                t.contentWindow.document.write("<script>".concat(e, "<\/script>")),
                t.contentWindow.document.close())
            } else
                document.addEventListener("DOMContentLoaded", (function() {
                    Wi(e)
                }
                ))
        }
        function Zi() {
            Wi("\nwindow.addEventListener('storage', function(event) {\n\ttry {\n\t\tconst key = event.key;\n\n\t\t// key is null when localStorage.clear() is called.\n\t\tif (key === null) {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'clear',\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t\treturn;\n\t\t}\n\n\t\t// newValue is null when localStorage.removeItem() is called.\n\t\tif (event.newValue === null) {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'delete',\n\t\t\t\t\tkey,\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t} else {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'set',\n\t\t\t\t\tkey,\n\t\t\t\t\tvalue: event.newValue,\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t}\n\t} catch { }\n});\n")
        }
        var Xi, Yi, Ji = function() {
            D.isPokiIframe && (setTimeout(me.trackSavegames, 1e4),
            /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && Zi())
        }, $i = !1, eo = !1, to = 0, no = function() {
            to++,
            Xi = setTimeout(no, 100 * to),
            window.__tcfapi && window.__tcfapi("ping", 2, (function(e, t) {
                t && (null == e ? void 0 : e.cmpLoaded) && ($i = !0,
                clearTimeout(Xi))
            }
            ))
        }, io = function() {
            to++,
            Yi = setTimeout(io, 100 * to),
            window.__uspapi && window.__uspapi("uspPing", 1, (function() {
                eo = !0,
                clearInterval(Yi)
            }
            ))
        }, oo = function() {
            D.gdprApplies ? (Ki.setRequireConsent(!0),
            function() {
                if (!(window.__tcfapi || D.isPlayground || D.familyFriendly)) {
                    var e = window.top
                      , t = {};
                    window.__tcfapi = function(n, i, o, r) {
                        var a = "".concat(Math.random())
                          , s = {
                            __tcfapiCall: {
                                command: n,
                                parameter: r,
                                version: i,
                                callId: a
                            }
                        };
                        t[a] = o,
                        e.postMessage(s, "*")
                    }
                    ,
                    window.addEventListener("message", (function(e) {
                        var n = {};
                        try {
                            n = "string" == typeof e.data ? JSON.parse(e.data) : e.data
                        } catch (e) {}
                        var i = n.__tcfapiReturn;
                        i && "function" == typeof t[i.callId] && (t[i.callId](i.returnValue, i.success),
                        t[i.callId] = null)
                    }
                    ), !1)
                }
            }(),
            no(),
            setTimeout((function() {
                $i || D.isPlayground || D.isPokiIframe || console.warn("%cPOKI:%c GDPC - No __tcfapi callback after 2s, verify implementation!", "font-weight: bold", "")
            }
            ), 2e3)) : Ki.setRequireConsent(!1),
            D.ccpaApplies && (!function() {
                if (!(window.__uspapi || D.isPlayground || D.familyFriendly)) {
                    var e = window.top
                      , t = {};
                    window.__uspapi = function(n, i, o) {
                        var r = "".concat(Math.random())
                          , a = {
                            __uspapiCall: {
                                command: n,
                                version: i,
                                callId: r
                            }
                        };
                        t[r] = o,
                        e.postMessage(a, "*")
                    }
                    ,
                    window.addEventListener("message", (function(e) {
                        var n = e && e.data && e.data.__uspapiReturn;
                        n && n.callId && "function" == typeof t[n.callId] && (t[n.callId](n.returnValue, n.success),
                        t[n.callId] = null)
                    }
                    ), !1)
                }
            }(),
            io(),
            setTimeout((function() {
                eo || D.isPlayground || D.isPokiIframe || console.warn("%cPOKI:%c USPrivacy - No __uspapi callback after 2s, verify implementation!", "font-weight: bold", "")
            }
            ), 2e3))
        }, ro = function() {
            return D.gdprApplies && !$i && !L.debug && !D.familyFriendly
        }, ao = function() {
            return D.ccpaApplies && !eo && !L.debug && !D.familyFriendly
        }, so = 21682198607;
        const co = {
            adTagUrl: "//pubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/1053551/Pub-Poki-Generic&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}&nofb=1",
            adTiming: {
                preroll: !1,
                timeBetweenAds: 12e4,
                timePerTry: 7e3,
                startAdsAfter: 12e4
            },
            waterfallRetries: 2
        };
        var lo = function() {
            function t(t) {
                void 0 === t && (t = {}),
                this.setTimings(t),
                this.timers = {
                    timePerTry: void 0,
                    timeBetweenAds: void 0,
                    startAdsAfter: void 0
                },
                (null == t ? void 0 : t.fake) || U.addEventListener(e.ads.startTimer, this.startTimeBetweenAdsTimer.bind(this))
            }
            return t.prototype.setTimings = function(e) {
                var t = co.adTiming
                  , n = e.preroll
                  , i = void 0 === n ? t.preroll : n
                  , o = e.timePerTry
                  , r = void 0 === o ? t.timePerTry : o
                  , a = e.timeBetweenAds
                  , s = void 0 === a ? t.timeBetweenAds : a
                  , d = e.startAdsAfter
                  , c = void 0 === d ? t.startAdsAfter : d;
                this.timings = {
                    preroll: !1 !== i,
                    timePerTry: r,
                    timeBetweenAds: s,
                    startAdsAfter: c
                }
            }
            ,
            t.prototype.resetAll = function() {
                this.stopTimer("timePerTry"),
                this.stopTimer("timeBetweenAds"),
                this.stopTimer("startAdsAfter")
            }
            ,
            t.prototype.startTimeBetweenAdsTimer = function(e) {
                (null == e ? void 0 : e.overwriteTimeBetweenAds) ? this.startTimer("timeBetweenAds", (function() {}
                ), e.overwriteTimeBetweenAds) : this.startTimer("timeBetweenAds")
            }
            ,
            t.prototype.startStartAdsAfterTimer = function() {
                this.startTimer("startAdsAfter")
            }
            ,
            t.prototype.requestPossible = function() {
                return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
            }
            ,
            t.prototype.startWaterfallTimer = function(e) {
                this.startTimer("timePerTry", e)
            }
            ,
            t.prototype.stopWaterfallTimer = function() {
                this.stopTimer("timePerTry")
            }
            ,
            t.prototype.stopTimer = function(e) {
                this.timers[e] && (clearTimeout(this.timers[e]),
                this.timers[e] = void 0)
            }
            ,
            t.prototype.startTimer = function(e, t, n) {
                var i = this;
                void 0 === t && (t = function() {}
                );
                var o = n || this.timings[e];
                o <= 0 ? t() : (this.timers[e] && clearTimeout(this.timers[e]),
                this.timers[e] = window.setTimeout((function() {
                    i.stopTimer(e),
                    t()
                }
                ), o))
            }
            ,
            t.prototype.prerollPossible = function() {
                return this.timings.preroll
            }
            ,
            t
        }();
        const uo = lo
          , po = function() {
            var e = new URL(window.location.href);
            e.hash = "";
            var t = [];
            return e.searchParams.forEach((function(e, n) {
                return t.push(n)
            }
            )),
            t.forEach((function(t) {
                e.searchParams.delete(t)
            }
            )),
            e.toString()
        }
          , Ao = function(e) {
            var t = "";
            return Object.keys(e).forEach((function(n) {
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var i = e[n];
                    Array.isArray(i) && (i = i.join()),
                    t += "".concat(n, "=").concat(i, "&")
                }
            }
            )),
            t = encodeURIComponent(t),
            "&cust_params=".concat(t)
        };
        var ho = ["AU", "CA", "IE", "NZ", "US", "GB"];
        function mo() {
            var e = D.country;
            return "US" === e ? 1.49 : ho.includes(e) ? .49 : .15
        }
        var fo = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , vo = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function go() {
            var e = "https://api.poki.com/ads/houseads/video/vast";
            D.kioskMode && (e += "?rand=".concat(Math.random()));
            var t = new URL(e);
            return t.searchParams.append("game_id", D.gameID),
            t.searchParams.append("site", "".concat(D.siteID)),
            t.href
        }
        var bo = {
            v_k0treo: 2.5,
            v_qr1wxs: 7.5,
            v_9diccg: 19,
            v_13q0xkw: .25,
            v_dn33ls: 1,
            v_z07u2o: 1.5,
            v_1400iyo: 2.25,
            v_9w8kxs: 3,
            v_ufej9c: 3.5,
            v_10960ao: 4.25,
            v_1ksbym8: 4.75,
            v_1ag9340: 5.25,
            v_1tbhh4w: 5.75,
            v_jjcgzk: 6.5,
            v_brnu9s: 7,
            v_1wscef4: 7.75,
            v_q22xhc: 8.5,
            v_f8irk0: 9,
            v_1rik45c: 9.75,
            v_lxhyww: 10.5,
            v_a9z0u8: 11,
            v_1yhiww0: 11.75,
            v_10mwg74: 12.25,
            v_1ji4u80: 12.75,
            v_wm2c5c: 13.5,
            v_2na6tc: 14,
            v_1myzri8: 14.75,
            v_3pzm68: 6,
            v_16kerr4: 6.25,
            v_1mdrmkg: 6.75,
            v_1ga0k5c: 7.25,
            v_5iwz5s: 8,
            v_12tk934: 8.25,
            v_1hsybr4: 8.75,
            v_1cj61hc: 9.25,
            v_y3r5kw: 9.5,
            v_94ow0: 10,
            v_15woqgw: 10.25,
            v_1orx4hs: 10.75,
            v_1d4e6f4: 11.25,
            v_t57ev4: 11.5,
            v_783hmo: 12,
            v_m7hkao: 12.5,
            v_hmo9hc: 13,
            v_19djnr4: 13.25,
            v_1twpm2o: 13.75,
            v_17zlou8: 14.25,
            v_ign1mo: 14.5,
            v_ccvz7k: 15,
            v_1f7b4sg: 15.25,
            v_snq4g0: 15.5,
            v_5wnf28: 16,
            v_137aozk: 16.25,
            v_1j0njsw: 16.75,
            v_1b8yx34: 17.25,
            v_yhhlhc: 17.5,
            v_25swe8: 18,
            v_15081z4: 18.25,
            v_1pje0ao: 18.75,
            v_1eptudc: 19.25,
            v_1xl28e8: 19.75,
            v_gfliio: 21,
            v_3y3sao: 22,
            v_ixhuyo: 22.5,
            v_ro52io: 23.5,
            v_qa73ls: 24.5,
            v_emo5j4: 25,
            v_yq5fk: 26,
            v_aobxts: 27,
            v_6shmgw: 28,
            v_natgqo: 28.5,
            v_x0f94w: 29.5,
            v_d2hfr4: 31,
            v_dch14w: 33,
            v_1jyadc: 34,
            v_8p5tz4: 36,
            v_fwv9xc: 37,
            v_c60r9c: 39,
            v_58awow: 40,
            v_bbcow: 42,
            v_a0x534: 43,
            v_hdmdq8: 45,
            v_2e8b28: 46,
            v_5nljb4: 48,
            v_1wr0n4: 50,
            v_pam1og: .5,
            v_1ipf08w: .75,
            v_1axqdj4: 1.25,
            v_1qr38cg: 1.75,
            v_15ldds: 2,
            v_1q248w0: 2.75,
            v_1eelatc: 3.25,
            v_1x9tou8: 3.75,
            v_8iam0w: 4,
            v_nhooow: 4.5,
            v_fq01z4: 5,
            v_w0u77k: 5.5,
            v_1vi5a0w: 15.75,
            v_orvt34: 16.5,
            v_dybn5s: 17,
            v_1q8czr4: 17.75,
            v_l11af4: 18.5,
            v_uqn2tc: 19.5,
            v_7zkdfk: 20,
            v_o7a58g: 20.5,
            v_vezl6o: 21.5,
            v_b5t88w: 23,
            v_4x2d4w: 24,
            v_xhwjk0: 25.5,
            v_lhw3r4: 26.5,
            v_tjkbuo: 27.5,
            v_h72ebk: 29,
            v_31n3sw: 30,
            v_64rl6o: 32,
            v_9lmigw: 35,
            v_3fdjpc: 38,
            v_fapfcw: 41,
            v_7o0lc0: 44,
            v_clbdvk: 47,
            v_ee8qv4: 49
        }
          , wo = {
            "11s3rwg": 2.49,
            "1uhxr0g": 2.87,
            qr1wxs: 7.5,
            "15xxon4": .01,
            o6no5c: .02,
            fb0nwg: .04,
            "1etkow0": .05,
            x2aoe8: .06,
            "1wkupds": .07,
            "11i46io": .09,
            jqu60w: .1,
            "1j9e70g": .11,
            "1adr6rk": .13,
            smh69s: .14,
            "1s5179c": .15,
            "8naeps": .16,
            qekf7k: .18,
            "1px4g74": .19,
            hixeyo: .2,
            za7fgg: .22,
            "1ysrgg0": .23,
            lyqx34: .26,
            "16hwveo": 1.13,
            "1fdjvnk": 1.17,
            "2jjcao": 1.2,
            "1jtdds0": 1.23,
            t6gd1c: 1.26,
            "65e29s": 1.28,
            "1nf83r4": 1.31,
            wsb30g: 1.34,
            jgukn4: 1.38,
            al7ke8: 1.4,
            "1a3rlds": 1.41,
            "8datc0": 1.44,
            "1pn4utc": 1.47,
            z07u2o: 1.5,
            "13g1c74": 1.53,
            ct4bgg: 1.56,
            ukeby8: 1.58,
            mspp8g: 1.62,
            "1dfmpz4": 1.65,
            lm6m8: 1.68,
            icw740: 1.7,
            "18zt7uo": 1.73,
            "79cfsw": 1.76,
            "1oj6ha8": 1.79,
            "1xethj4": 1.83,
            "12c2yo0": 1.85,
            bp5xxc: 1.88,
            "1syzzeo": 1.91,
            ncow00: 1.94,
            "1dzlwqo": 1.97,
            "15ldds": 2,
            "10o5edc": 2.009999,
            a18dmo: 2.04,
            "1rb2f40": 2.069999,
            pkln28: 2.1,
            "1g7insw": 2.13,
            "12w25fk": 2.17,
            c954ow: 2.2,
            "1brp5og": 2.21,
            "1400iyo": 2.25,
            v4dips: 2.3,
            hsx0cg: 2.34,
            "18fu134": 2.37,
            "167xa0w": 2.41,
            "1f3ka9s": 2.45,
            "1d5n4lc": 1.01,
            "1uwx534": 1.03,
            bml8g: 1.04,
            i2wlq8: 1.06,
            "979lhc": 1.08,
            "18ptmgw": 1.09,
            "1qh3myo": 1.11,
            "6zcuf4": 1.12,
            oqmuww: 1.14,
            fuzuo0: 1.16,
            xm9v5s: 1.18,
            "1x4tw5c": 1.19,
            "1223da8": 1.21,
            katcsg: 1.22,
            bf6cjk: 1.24,
            "1axqdj4": 1.25,
            "1sp0e0w": 1.27,
            "15ny39c": 1.29,
            nwo2rk: 1.3,
            f112io: 1.32,
            "1ejl3i8": 1.33,
            "1pkk5c": 1.36,
            "1184l4w": 1.37,
            "1izelmo": 1.39,
            schkw0: 1.42,
            "1rv1lvk": 1.43,
            "17vuubk": 1.45,
            q4ktts: 1.46,
            h8xtkw: 1.48,
            "1yirv28": 1.51,
            "3xhb7k": 1.52,
            lorbpc: 1.54,
            "1l7bcow": 1.55,
            "1cbocg0": 1.57,
            "1u2ycxs": 1.59,
            "51foqo": 1.6,
            "14jzpq8": 1.61,
            "1mb9q80": 1.63,
            dx2ozk: 1.64,
            vocphc: 1.66,
            "1v6wqgw": 1.67,
            "10467ls": 1.69,
            "1hvg83k": 1.71,
            "9h96v4": 1.72,
            r8j7cw: 1.74,
            "1qr38cg": 1.75,
            "16rwgsg": 1.77,
            p0mgao: 1.78,
            g4zg1s: 1.8,
            "1fnjh1c": 1.81,
            xw9gjk: 1.82,
            "2tixog": 1.84,
            kksy68: 1.86,
            "1k3cz5s": 1.87,
            "1b7pyww": 1.89,
            tgfyf4: 1.9,
            "5levi8": 1.92,
            "153ywhs": 1.93,
            "1mv8wzk": 1.95,
            eh1vr4: 1.96,
            w8bw8w: 1.98,
            iwvdvk: 2.02,
            "1iffev4": 2.029999,
            "19jsem8": 2.049999,
            rsie4g: 2.06,
            "7tbmkg": 2.08,
            "17bvnk0": 2.089999,
            "1p35o1s": 2.11,
            goymtc: 2.12,
            "1xysoao": 2.15,
            "3di4g0": 2.16,
            l4s4xs: 2.18,
            "1knc5xc": 2.19,
            u0f56o: 2.22,
            "1tiz668": 2.23,
            "4hghz4": 2.24,
            m8qigw: 2.26,
            dd3i80: 2.28,
            "1cvnj7k": 2.29,
            "1umxjpc": 2.31,
            "1mzuo": 2.32,
            zk70u8: 2.33,
            "1hbh1c0": 2.35,
            "8xa03k": 2.36,
            qok0lc: 2.38,
            "1q741kw": 2.39,
            "6pd91c": 2.4,
            ogn9j4: 2.42,
            "1wuuark": 2.47,
            k0treo: 2.5,
            "1jjdse8": 2.51,
            swgrnk: 2.54,
            "162xhc0": 2.57,
            fg0glc: 2.6,
            l11af4: 18.5,
            "9diccg": 19,
            "7zkdfk": 20,
            gfliio: 21,
            b5t88w: 23,
            "4x2d4w": 24,
            emo5j4: 25,
            aobxts: 27,
            "6shmgw": 28,
            "31n3sw": 30,
            "64rl6o": 32,
            dch14w: 33,
            "9lmigw": 35,
            "1yv9csg": 5.35,
            o42yo: 6.8,
            q22xhc: 8.5,
            d2hfr4: 31,
            "1np7p4w": .03,
            "1zk5j4": .08,
            av75s0: .12,
            "185ufpc": .17,
            "1h1hfy8": .21,
            "47gwlc": .24,
            d33wu8: .28,
            uudxc0: .3,
            "14tzb40": .33,
            e72adc: .36,
            "1vgwbuo": .39,
            "10e5szk": .41,
            "1i5fthc": .43,
            "1r12tq8": .47,
            pam1og: .5,
            gez1fk: .52,
            "1xot2ww": .55,
            kusjk0: .58,
            bz5jb4: .6,
            tqfjsw: .62,
            "5vegw0": .64,
            "1n58idc": .67,
            wibhmo: .7,
            "1fkyrk": .72,
            "1ipf08w": .75,
            s2hzi8: .78,
            pul8g0: .82,
            "1ghi96o": .85,
            "3nhpts": .88,
            lerqbk: .9,
            uaeqkg: .94,
            "14a04cg": .97,
            dn33ls: 1,
            ved43k: 1.02,
            zu6m80: 1.05,
            "1hlgmps": 1.07,
            qyjlz4: 1.1,
            "1lhay2o": .27,
            "1clnxts": .29,
            "1ucxybk": .31,
            "5bfa4g": .32,
            n2pam8: .34,
            "1ml9bls": .35,
            "1dpmbcw": .37,
            vycav4: .38,
            vls00: .4,
            imvshs: .42,
            "9r8s8w": .44,
            "199st8g": .45,
            "7jc16o": .48,
            "171w268": .49,
            "1ot62o0": .51,
            "1fxj2f4": .53,
            y691xc: .54,
            "33ij28": .56,
            "12m2k1s": .57,
            "1kdckjk": .59,
            "1t8zksg": .63,
            "15dyhvk": .65,
            nmohds: .66,
            er1h4w: .68,
            "1e9li4g": .69,
            "1w0vim8": .71,
            "10y4zr4": .73,
            j6uz9c: .74,
            ab7z0g: .76,
            "19ts000": .77,
            "1rl20hs": .79,
            "83b7y8": .8,
            "17lv8xs": .81,
            "1pd59fk": .83,
            gyy874: .84,
            yq88ow: .86,
            "1y8s9og": .87,
            "1361qtc": .89,
            "1kxbrb4": .91,
            "1c1or28": .93,
            "1tsyrk0": .95,
            "4rg3cw": .96,
            miq3uo: .98,
            "1m1a4u8": .99,
            "11x3klc": 5.05,
            "1nrplhc": 5.15,
            "1ag9340": 5.25,
            qh2bk0: 5.3,
            "14wh7gg": 5.45,
            w0u77k: 5.5,
            "7ltxj4": 5.6,
            kxafwg: 5.7,
            "1tbhh4w": 5.75,
            "110mw3k": 5.85,
            "1pfn5s0": 5.95,
            "3pzm68": 6,
            ml8074: 6.1,
            "1uzf1fk": 6.15,
            "16kerr4": 6.25,
            "1jvva4g": 6.35,
            "67vym8": 6.4,
            jjcgzk: 6.5,
            hbfpxc: 6.6,
            "13ij8jk": 6.65,
            "1mdrmkg": 6.75,
            p34cn4: 6.9,
            "1xhbdvk": 6.95,
            "1ihxb7k": 7.15,
            "1ga0k5c": 7.25,
            dflekg: 7.4,
            "1o1p6v4": 7.55,
            "2c1n9c": 7.6,
            "1wscef4": 7.75,
            zhp4hs: 7.9,
            "5iwz5s": 8,
            f8irk0: 9,
            y3r5kw: 9.5,
            lxhyww: 10.5,
            a9z0u8: 11,
            "783hmo": 12,
            m7hkao: 12.5,
            wm2c5c: 13.5,
            "2na6tc": 14,
            ign1mo: 14.5,
            snq4g0: 15.5,
            "5wnf28": 16,
            dybn5s: 17,
            yhhlhc: 17.5,
            testbid: 0,
            "1nz7aio": 2.43,
            xca9s0: 2.46,
            b56r5s: 2.52,
            obngu8: 2.58,
            "24jy80": 2.64,
            "1jedzpc": 2.67,
            "18au8e8": 2.73,
            hnx7nk: 2.76,
            "13v0q9s": 2.81,
            "10lkow": 2.96,
            "156gsu8": 7.05,
            "1tlh2io": 7.35,
            "1aq8ohs": 7.65,
            "1losn40": 7.95,
            "1sf0sn4": 2.55,
            "1eykhkw": 2.61,
            srgyyo: 2.7,
            "1yxr94w": 2.79,
            d83pj4: 2.84,
            n7p3b4: 2.9,
            "1dum41s": 2.93,
            "1iafm68": 2.99,
            "7vtiww": 7.2,
            b2outc: 7.8,
            "13q0xkw": .25,
            riisqo: .46,
            "1bhpkao": .61,
            cj4q2o: .92,
            "1o96vwg": 1.15,
            "1wav400": 1.35,
            "1grhukg": 1.49,
            "1vqvx8g": 1.99,
            yg8nb4: 2.14,
            "1lrajgg": 2.27,
            fl09a8: 2.44,
            "1h6h8n4": 2.77,
            "1m69xj4": 3.55,
            rdj01s: 4.3,
            "29jqww": 2.48,
            "1anqs5c": 2.53,
            "6kdgcg": 2.56,
            "1nu7hts": 2.59,
            "1wpui2o": 2.63,
            jvtyps: 2.66,
            "1sa0zy8": 2.71,
            "1q248w0": 2.75,
            "4cgpa8": 2.8,
            "1cqnqio": 2.85,
            "5gf2tc": 2.88,
            ec2328: 2.92,
            "1vlw4jk": 2.95,
            "9w8kxs": 3,
            "176vuv4": 3.05,
            "1kicd8g": 3.15,
            jbury8: 3.3,
            h3y0w0: 3.4,
            gmdxc: 3.6,
            ovmnls: 3.7,
            "15sxvy8": 3.85,
            "1j4eebk": 3.95,
            "1gwhn9c": 4.05,
            e22hog: 4.2,
            "1oo69z4": 4.35,
            nhooow: 4.5,
            "17gvg8w": 4.65,
            "1ksbym8": 4.75,
            hxwt1c: 4.9,
            t1gkcg: 5.1,
            "2221vk": 5.2,
            d5lt6o: 5.4,
            "1i7xpts": 5.55,
            "1g00yrk": 5.65,
            etjdhc: 5.8,
            s4zvuo: 5.9,
            "1c46neo": 6.05,
            "99rhts": 6.2,
            xorri8: 6.3,
            "1em2zuo": 6.45,
            "1rxji80": 6.55,
            umw8ao: 6.7,
            "192b474": 6.85,
            brnu9s: 7,
            x7ah34: 2.62,
            "11n3z7k": 2.65,
            b06ygw: 2.68,
            "1aiqzgg": 2.69,
            "8sa7eo": 2.72,
            qjk7wg: 2.74,
            zf785c: 2.78,
            m3qps0: 2.82,
            "1lmaqrk": 2.83,
            uzdq0w: 2.86,
            "14yz3sw": 2.89,
            "1mq94ao": 2.91,
            w3c3k0: 2.94,
            "10j5log": 2.97,
            irvl6o: 2.98,
            yb8um8: 3.1,
            "60e9kw": 3.2,
            "1eelatc": 3.25,
            "1rq1t6o": 3.35,
            "13b1ji8": 3.45,
            ufej9c: 3.5,
            "18utf5s": 3.65,
            "1x9tou8": 3.75,
            bk658g: 3.8,
            wxavpc: 3.9,
            "8iam0w": 4,
            ltr4e8: 4.099999,
            "1u7y5mo": 4.15,
            "10960ao": 4.25,
            "2yiqdc": 4.4,
            "1bcprls": 4.45,
            "1vvvpxc": 4.55,
            a686bk: 4.6,
            yl8g00: 4.7,
            "4mgao0": 4.8,
            "1d0nbwg": 4.85,
            "1qc3u9s": 4.95,
            fq01z4: 5,
            watslc: 7.1,
            l7a1a8: 7.3,
            zmox6o: 7.45,
            oe5d6o: 7.7,
            "18dc4qo": 7.85,
            "94ow0": 10,
            t57ev4: 11.5,
            hmo9hc: 13,
            ccvz7k: 15,
            orvt34: 16.5,
            "25swe8": 18,
            uqn2tc: 19.5,
            "3y3sao": 22,
            yq5fk: 26,
            h72ebk: 29,
            "1jyadc": 34,
            testBid: 50
        }
          , yo = {
            hgfim8: "Amazon - DistrictM",
            qc2iv4: "Amazon - Magnite",
            "183cjcw": "Amazon - AppNexus",
            "8ksidc": "Amazon - OpenX",
            "1s2jaww": "Amazon - PubMatic",
            "1pumjuo": "Amazon - EMX",
            "12jknpc": "Amazon - Conversant UAM",
            "1kauo74": "Amazon - Amobee DSP",
            "15bglj4": "Amazon - PubMatic UAM APAC",
            "5swkjk": "Amazon - PubMatic UAM EU",
            "1d32f4": "Amazon - Simpli.fi",
            ksan7k: "Amazon - Index Exchange",
            urw0zk: "Amazon - Smaato",
            "1dn4f0g": "Amazon - AdGeneration",
            vvueio: "Amazon - DMX",
            "1veefi8": "Amazon - Yieldmo",
            "1i2xx4w": "Amazon - Yahoo Japan",
            rg0we8: "Amazon - UnrulyX_SSP_APS",
            y3r5kw: "Amazon - Verizon Media Group",
            "1xmb6kg": "Amazon - GumGum UAM",
            "1t6hog0": "Amazon - Acuity",
            "1n2qm0w": "Amazon - Sharethrough",
            j4d2ww: "Amazon - EMX UAM",
            "1imx3wg": "Amazon - LoopMe_UAM",
            z7pj40: "Amazon - Pulsepoint",
            p845c0: "Amazon - SmartRTB+"
        };
        function ko(e) {
            return yo[e] || "Amazon"
        }
        var xo, _o = [], Io = function(e) {
            var t;
            return _o.includes(e) || _o.includes("www.".concat(e)) || (null === (t = null == e ? void 0 : e.includes) || void 0 === t ? void 0 : t.call(e, "game"))
        };
        function So() {
            var e;
            return xo && (e = xo.join(";")),
            xo = void 0,
            e
        }
        const Eo = function() {
            return "undefined" != typeof navigator && /MSIE \\d|Trident.*rv:/i.test(navigator.userAgent)
        };
        var Co = D.AYMode === k.DPF_ONLY || D.AYMode === k.PBS_DPF_CSTS
          , Po = Co ? {
            desktop: {
                "160x600": "RGjLwUuLJpFowG0HnC9poTmR",
                "300x250": "EcwwLdbNTzELxa4qcd9d060O",
                "320x50": "kKvCaOdMrYSNPdizhUX5FLch",
                "728x90": "IR8yJgBz7GF45aIQY0zFBiBN",
                "970x250": "MO7cOKSWWir2LKsAOxZ6dkIp",
                midroll: "SbURP42RHjzFNKkUeaPcwM29",
                rewarded: "PtqCLLsXZVRo5Hj7lhb9MB3o"
            },
            tablet: {
                "320x50": "7V4dBacaZLpJNTxep4Ks5PEX",
                midroll: "50WRe2wy7WRtTvopS7MinCAG",
                rewarded: "fY4eZNUpf1InC3YSRgThyD6r"
            },
            mobile: {
                "320x50": "1VeYl3yQOPHg0digg7vBePbF",
                midroll: "50WRe2wy7WRtTvopS7MinCAG",
                rewarded: "GBsiqQg5Y3yh0RkjarOmf58V"
            }
        } : {
            desktop: {
                "160x600": "pHhFwvUCUJQKwwA7iy4fAk2F",
                "300x250": "c3GnFrB8rylhgQwXfD5VTq8P",
                "320x50": "9DvtR4XBxhm8JoliuTxyVz3L",
                "728x90": "v6NMslR400yh8RzvRiRLpwvH",
                "970x250": "EWsiZSpdRTxOym1GzRvUmzNW",
                midroll: "4Hy6nGZMC66xUwMP5cl1hCTE",
                rewarded: "dNQuJjmJrj6ZdQMVxklBfduh"
            },
            tablet: {
                "320x50": "f8V9c0yVZENi5WNpSqvEgunY",
                midroll: "zFsaqtEiGSRs5zXx8U3N3IzK",
                rewarded: "3e3zEB2v1HZGMtSTr9bVm1op"
            },
            mobile: {
                "320x50": "jJuityvxj0Xu0AKku01W2eKX",
                midroll: "zFsaqtEiGSRs5zXx8U3N3IzK",
                rewarded: "qqlfsqZLNfx0YdnQoeTTx13y"
            }
        }
          , To = Co ? {
            desktop: {
                "160x600": "3344122-9",
                "300x250": "3344124-15",
                "320x50": "3344126-43",
                "728x90": "3344128-2",
                "970x250": "3344130-57",
                midroll: 3344138,
                rewarded: 3344140
            },
            tablet: {
                "320x50": "3344136-43",
                midroll: 3344144,
                rewarded: 3344146
            },
            mobile: {
                "320x50": "3344134-43",
                midroll: 3344144,
                rewarded: 3344142
            }
        } : {
            desktop: {
                "160x600": 2969680,
                "300x250": 2969676,
                "320x50": 2969674,
                "728x90": 2969668,
                "970x250": 2969678,
                midroll: 2969664,
                rewarded: 2969666
            },
            tablet: {
                "320x50": 2969690,
                midroll: 3344110,
                rewarded: 2969688
            },
            mobile: {
                "320x50": 2969684,
                midroll: 3344110,
                rewarded: 2969682
            }
        }
          , Bo = Co ? {
            desktop: {
                "160x600": "5883933",
                "300x250": "5883934",
                "320x50": "5883935",
                "728x90": "5883936",
                "970x250": "5883937",
                midroll: "5883941",
                rewarded: "5883942"
            },
            tablet: {
                "320x50": "5883940",
                midroll: "5883943",
                rewarded: "5883945"
            },
            mobile: {
                "320x50": "5883939",
                midroll: "5883943",
                rewarded: "5883944"
            }
        } : {
            desktop: {
                "160x600": "5883917",
                "300x250": "5883918",
                "320x50": "5883919",
                "728x90": "5883920",
                "970x250": "5883921",
                midroll: "5883925",
                rewarded: "5883926"
            },
            tablet: {
                "320x50": "5883924",
                midroll: "5883927",
                rewarded: "5883929"
            },
            mobile: {
                "320x50": "5883923",
                midroll: "5883927",
                rewarded: "5883928"
            }
        }
          , Do = Co ? {
            desktop: {
                "160x600": "1097616",
                "300x250": "1097617",
                "320x50": "1097618",
                "728x90": "1097619",
                "970x250": "1097620",
                midroll: "1097624",
                rewarded: "1097625"
            },
            tablet: {
                "320x50": "1097623",
                midroll: "1097627",
                rewarded: "1097629"
            },
            mobile: {
                "320x50": "1097622",
                midroll: "1097627",
                rewarded: "1097626"
            }
        } : {
            desktop: {
                "160x600": "1097600",
                "300x250": "1097601",
                "320x50": "1097602",
                "728x90": "1097603",
                "970x250": "1097604",
                midroll: "1097608",
                rewarded: "1097609"
            },
            tablet: {
                "320x50": "1097607",
                midroll: "1097611",
                rewarded: "1097612"
            },
            mobile: {
                "320x50": "1097606",
                midroll: "1097611",
                rewarded: "1097610"
            }
        }
          , Mo = Co ? {
            desktop: {
                "160x600": "BzoTmh4NGZ",
                "300x250": "lcmX1jq1Lj",
                "320x50": "iowki7KCLk",
                "728x90": "RGlldqn551",
                "970x250": "ohcXUNESA6",
                midroll: "tqA7KwGzJP",
                rewarded: "innweoOi9C"
            },
            tablet: {
                "320x50": "HI8chf3nOw",
                midroll: "SLZIt97iqi",
                rewarded: "pWV7sSiv1v"
            },
            mobile: {
                "320x50": "o0HIu0ypvx",
                midroll: "SLZIt97iqi",
                rewarded: "DMtCvhStDo"
            }
        } : {
            desktop: {
                "160x600": "EcE3bPtcQ7",
                "300x250": "z4419hyP3D",
                "320x50": "iO0r99GJyD",
                "728x90": "eNHLwil1Sz",
                "970x250": "VV8quyp9Uc",
                midroll: "r2YIBgLder",
                rewarded: "qphbf73F9j"
            },
            tablet: {
                "320x50": "USm2WyRzQM",
                midroll: "vzAXcywC8m",
                rewarded: "lLev33Pjr2"
            },
            mobile: {
                "320x50": "EZVAmOVfTC",
                midroll: "vzAXcywC8m",
                rewarded: "STZwixwqOK"
            }
        }
          , Oo = Co ? {
            desktop: {
                "160x600": "32576935",
                "300x250": "32576941",
                "320x50": "32576946",
                "728x90": "32576950",
                "970x250": "32576954",
                midroll: "32576912",
                rewarded: "32576919"
            },
            tablet: {
                "320x50": "32576998",
                midroll: "32577004",
                rewarded: "32577010"
            },
            mobile: {
                "320x50": "32576997",
                midroll: "32577004",
                rewarded: "32577003"
            }
        } : {
            desktop: {
                "160x600": "32576856",
                "300x250": "32576857",
                "320x50": "32576858",
                "728x90": "32576859",
                "970x250": "32576860",
                midroll: "32576861",
                rewarded: "32576862"
            },
            tablet: {
                "320x50": "32576994",
                midroll: "32577001",
                rewarded: "32577002"
            },
            mobile: {
                "320x50": "32576993",
                midroll: "32577001",
                rewarded: "32577000"
            }
        }
          , Lo = Co ? {
            desktop: {
                "160x600": "desktop_ingame_160x600_B",
                "300x250": "desktop_ingame_300x250_B",
                "320x50": "desktop_ingame_320x50_B",
                "728x90": "desktop_ingame_728x90_B",
                "970x250": "desktop_ingame_970x250_B",
                midroll: "desktop_ingame_midroll_1_B",
                rewarded: "desktop_ingame_roll_1_B"
            },
            tablet: {
                "320x50": "tablet_ingame_320x50_B",
                midroll: "mobile_ingame_midroll_1_B",
                rewarded: "tablet_ingame_roll_1_B"
            },
            mobile: {
                "320x50": "mobile_ingame_320x50_B",
                midroll: "mobile_ingame_midroll_1_B",
                rewarded: "mobile_ingame_roll_1_B"
            }
        } : {
            desktop: {
                "160x600": "desktop_ingame_160x600",
                "300x250": "desktop_ingame_300x250",
                "320x50": "desktop_ingame_320x50",
                "728x90": "desktop_ingame_728x90",
                "970x250": "desktop_ingame_970x250",
                midroll: "desktop_ingame_midroll_1",
                rewarded: "desktop_ingame_roll_1"
            },
            tablet: {
                "320x50": "tablet_ingame_320x50",
                midroll: "mobile_ingame_midroll_1",
                rewarded: "tablet_ingame_roll_1"
            },
            mobile: {
                "320x50": "mobile_ingame_320x50",
                midroll: "mobile_ingame_midroll_1",
                rewarded: "mobile_ingame_roll_1"
            }
        }
          , No = Lo
          , Ro = Co ? {
            desktop: {
                "160x600": "560728457",
                "300x250": "560728458",
                "320x50": "560728459",
                "728x90": "560728460",
                "970x250": "560728461",
                midroll: "560728517",
                rewarded: "560728518"
            },
            tablet: {
                "320x50": "560728464",
                midroll: "560728520",
                rewarded: "560728521"
            },
            mobile: {
                "320x50": "560728463",
                midroll: "560728520",
                rewarded: "560728519"
            }
        } : {
            desktop: {
                "160x600": "560728446",
                "300x250": "560728447",
                "320x50": "560728448",
                "728x90": "560728449",
                "970x250": "560728450",
                midroll: "560728512",
                rewarded: "560728513"
            },
            tablet: {
                "320x50": "560728453",
                midroll: "560728515",
                rewarded: "560728516"
            },
            mobile: {
                "320x50": "560728452",
                midroll: "560728515",
                rewarded: "560728514"
            }
        }
          , zo = "lcpgaTLqkd6gRi8AVtVr0gLe"
          , jo = "PIsUL8EJvXXA1thcFkCPWdhi"
          , Uo = "KQ3P2qVndkjlesGkzM5Rknma"
          , Fo = "Ydwhf5DPoJBinldgPdkD9okm"
          , Go = {
            desktop: {
                "160x600": "desktop_ingame_160x600_B_PBc2s",
                "300x250": "desktop_ingame_300x250_B_PBc2s",
                "320x50": "desktop_ingame_320x50_B_PBc2s",
                "728x90": "desktop_ingame_728x90_B_PBc2s",
                "970x250": "desktop_ingame_970x250_B_PBc2s",
                midroll: "desktop_ingame_midroll_1_B_PBc2s",
                rewarded: "desktop_ingame_roll_1_B_PBc2s"
            },
            tablet: {
                "320x50": "tablet_ingame_320x50_B_PBc2s",
                midroll: "tablet_ingame_roll_1_B_PBc2s",
                rewarded: "tablet_ingame_roll_1_B_PBc2s"
            },
            mobile: {
                "320x50": "mobile_ingame_320x50_B_PBc2s",
                midroll: "mobile_ingame_roll_1_B_PBc2s",
                rewarded: "mobile_ingame_midroll_1_B_PBc2s"
            }
        }
          , Vo = {
            desktop: {
                "160x600": "PBS_desktop_ingame_160x600_PBs2s",
                "300x250": "PBS_desktop_ingame_300x250_PBs2s",
                "320x50": "PBS_desktop_ingame_320x50_PBs2s",
                "728x90": "PBS_desktop_ingame_728x90_PBs2s",
                "970x250": "PBS_desktop_ingame_970x250_PBs2s",
                midroll: "PBS_desktop_instream_PBs2s",
                rewarded: "PBS_desktop_instream_PBs2s"
            },
            tablet: {
                "320x50": "PBS_tablet_ingame_320x50_PBs2s",
                midroll: "PBS_tablet_instream_PBs2s",
                rewarded: "PBS_tablet_instream_PBs2s"
            },
            mobile: {
                "320x50": "PBS_mobile_ingame_320x50_PBs2s",
                midroll: "PBS_mobile_instream_PBs2s",
                rewarded: "PBS_mobile_instream_PBs2s"
            }
        }
          , Ho = {
            desktop: {
                "160x600": "w94NCQZPkvMe9abEANk3j9UM",
                "300x250": "2j1V0jSoGrQcQPZ6wjcjDc1v",
                "320x50": "JCzEzMwjMCqgNH9mVSCgLbFM",
                "728x90": "PhpWXPWg4o3y6FlY0qwH7fRy",
                "970x250": "DNOO90lGmA22jVxRo4meiTOX",
                midroll: "jdbFspMsO3380VFGH56aQSPT",
                rewarded: "EOxLPMBPLxUim1O5YYjgJ3zV"
            },
            tablet: {
                "320x50": "hW9BnmYxpqIlMHb1TyfDXhgb",
                midroll: "0LJiuzsOrsiZypi2Hp6aGHz3",
                rewarded: "6ZMiHSLfdWgTA8JQUtBvLb2p"
            },
            mobile: {
                "320x50": "8CHGo2XPaoLDBXnfgeZHPDp2",
                midroll: "0LJiuzsOrsiZypi2Hp6aGHz3",
                rewarded: "YEfxtSaAovu1QuPW3b2GGreQ"
            }
        }
          , qo = {
            desktop: {
                "160x600": 3451892,
                "300x250": 3451894,
                "320x50": 3451896,
                "728x90": 3451898,
                "970x250": 3451900,
                midroll: 3451908,
                rewarded: 3451910
            },
            tablet: {
                "320x50": 3451906,
                midroll: 3451914,
                rewarded: 3451916
            },
            mobile: {
                "320x50": 3451904,
                midroll: 3451914,
                rewarded: 3451912
            }
        }
          , Qo = {
            desktop: {
                "160x600": "6031290",
                "300x250": "6031291",
                "320x50": "6031292",
                "728x90": "6031293",
                "970x250": "6031294",
                midroll: "6031300",
                rewarded: "6031301"
            },
            tablet: {
                "320x50": "6031297",
                midroll: "6031302",
                rewarded: "6031304"
            },
            mobile: {
                "320x50": "6031296",
                midroll: "6031302",
                rewarded: "6031303"
            }
        }
          , Ko = {
            desktop: {
                "160x600": "1119460",
                "300x250": "1119461",
                "320x50": "1119462",
                "728x90": "1119463",
                "970x250": "1119464",
                midroll: "1119468",
                rewarded: "1119469"
            },
            tablet: {
                "320x50": "1119467",
                midroll: "1119471",
                rewarded: "1119472"
            },
            mobile: {
                "320x50": "1119466",
                midroll: "1119471",
                rewarded: "1119470"
            }
        }
          , Wo = {
            desktop: {
                "160x600": "joqZdjrS44",
                "300x250": "A5WslvYq3U",
                "320x50": "jeJTT1JQc1",
                "728x90": "HUdxaDxmjN",
                "970x250": "MFOfbG0BvV",
                midroll: "8Ktl6U8ziM",
                rewarded: "Na5xNjU0Nc"
            },
            tablet: {
                "320x50": "YZvrrtjbzK",
                midroll: "0EFXGI0X4R",
                rewarded: "dGO6uV5f0u"
            },
            mobile: {
                "320x50": "ZjGxFZU4bI",
                midroll: "0EFXGI0X4R",
                rewarded: "0KnEmI2AtO"
            }
        }
          , Zo = {
            desktop: {
                "160x600": "PBS_desktop_ingame_160x600",
                "300x250": "PBS_desktop_ingame_300x250",
                "320x50": "PBS_desktop_ingame_320x50",
                "728x90": "PBS_desktop_ingame_728x90",
                "970x250": "PBS_desktop_ingame_970x250",
                midroll: "PBS_desktop_ingame_midroll_1",
                rewarded: "PBS_desktop_ingame_roll_1"
            },
            tablet: {
                "320x50": "PBS_tablet_ingame_320x50",
                midroll: "PBS_mobile_ingame_midroll_1",
                rewarded: "PBS_tablet_ingame_roll_1"
            },
            mobile: {
                "320x50": "PBS_mobile_ingame_320x50",
                midroll: "PBS_mobile_ingame_midroll_1",
                rewarded: "PBS_mobile_ingame_roll_1"
            }
        }
          , Xo = {
            desktop: {
                "160x600": "560923015",
                "300x250": "560923016",
                "320x50": "560923017",
                "728x90": "560923018",
                "970x250": "560923019",
                midroll: "560923023",
                rewarded: "560923024"
            },
            tablet: {
                "320x50": "560923022",
                midroll: "560923026",
                rewarded: "560923027"
            },
            mobile: {
                "320x50": "560923021",
                midroll: "560923026",
                rewarded: "560923025"
            }
        }
          , Yo = "playground"
          , Jo = "ingame"
          , $o = "external";
        function er() {
            return D.isPokiIframe || D.isPlayground ? D.isPlayground ? Yo : Jo : $o
        }
        var tr = {
            skyscraper: "160x600",
            rectangle: "300x250",
            leaderboard: "728x90",
            smallLeaderboard: "320x50",
            billboard: "970x250",
            midroll: "midroll",
            rewarded: "rewarded",
            gamebar: "gamebar"
        };
        function nr(e, t, n, i, o) {
            var r = ar("AdSystem", "Poki", {
                version: "0.1"
            });
            return t && (r += function(e) {
                return rr("VASTAdTagURI", e)
            }(t)),
            n && (r += ir(n, i)),
            o && (r += or(o)),
            function(e, t) {
                return ar("VAST", e, {
                    version: t
                })
            }(function(e, t) {
                return ar("Ad", e, {
                    id: t
                })
            }(ar("Wrapper", r), e), "4.2")
        }
        function ir(e, t) {
            return rr("Impression", e, {
                id: t
            })
        }
        function or(e) {
            return rr("Error", e)
        }
        function rr(e, t, n) {
            return void 0 === n && (n = {}),
            ar(e, "<![CDATA[".concat(t, "]]>"), n)
        }
        function ar(e, t, n) {
            void 0 === n && (n = {});
            var i = function(e, t) {
                if (!t || 0 === Object.keys(t).length)
                    return e;
                return Object.keys(t).reduce((function(e, n) {
                    var i = t[n];
                    return i ? "".concat(e, " ").concat(n, '="').concat(i, '"') : e
                }
                ), e)
            }(e, n);
            return "<".concat(i, ">").concat(t, "</").concat(e, ">")
        }
        function sr(e) {
            var t = e;
            return {
                getVastXmlWithTracking: function(e, i, o, r, a) {
                    var s = function(e, n) {
                        if (!e)
                            return;
                        var i = ir(e, n);
                        return t.parse(i)
                    }(o, r)
                      , d = function(e) {
                        if (!e)
                            return;
                        var n = or(e);
                        return t.parse(n)
                    }(a);
                    if (!i && !s && !d)
                        return e;
                    var c = t.parse(e);
                    return function(e, t, i) {
                        for (var o = e.querySelectorAll("InLine,Wrapper"), r = o.length, a = 0; a < r; a++) {
                            var s = o[a]
                              , d = a < r - 1;
                            n(s, t, d),
                            n(s, i, d)
                        }
                    }(c, s, d),
                    function(e, t) {
                        if (!t)
                            return;
                        var n = e.querySelector("Ad");
                        if (!n)
                            return;
                        n.id = t
                    }(c, i),
                    t.serialize(c)
                },
                buildVastWrapper: nr
            };
            function n(e, t, n) {
                if (t) {
                    var i = n ? t.cloneNode(!0) : t;
                    e.appendChild(i.documentElement)
                }
            }
        }
        function dr() {
            var e, t;
            return {
                parse: function(t) {
                    return (e || (e = new DOMParser),
                    e).parseFromString(t, "application/xml")
                },
                serialize: function(e) {
                    return (t || (t = new XMLSerializer),
                    t).serializeToString(e)
                }
            }
        }
        var cr, lr = sr(dr()), ur = (cr = {},
        {
            store: function(e, t) {
                cr[e] = t
            },
            remove: function(e) {
                var t = cr[e];
                if (t)
                    return delete cr[e],
                    t
            }
        });
        function pr() {
            var e, t = function(e) {
                var t = function(e) {
                    if (!e || !e.length)
                        return;
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t]
                          , i = ur.remove(n);
                        if (i)
                            return i
                    }
                }(e);
                if (!t)
                    return;
                var n = t.adUnitCode
                  , i = t.requestId
                  , o = t.auctionId
                  , r = t.adId;
                return window.pbjs.getBidResponsesForAdUnitCode(n).bids.find((function(e) {
                    return e.adId === r && e.requestId === i && e.auctionId === o
                }
                ))
            }((null === (e = U.getVideoDataAnnotations()) || void 0 === e ? void 0 : e.IMAWrapperIDs) || []);
            t && (U.addVideoDataAnnotations({
                HBPrebidLikelyWon: !0,
                HBPrebidWon: !0
            }),
            window.pbjs.markWinningBidAsUsed(t))
        }
        var Ar = function(e) {
            var t = e.adId
              , n = e.adUnitCode
              , i = e.requestId
              , o = e.auctionId
              , r = "poki_".concat(oe());
            ur.store(r, {
                adId: t,
                adUnitCode: n,
                requestId: i,
                auctionId: o
            });
            var a = e.vastXml
              , s = e.vastUrl;
            return a ? a = lr.getVastXmlWithTracking(a, r, void 0, void 0, void 0) : s && (a = lr.buildVastWrapper(r, s, void 0, void 0, void 0)),
            e.vastXml = a,
            r
        };
        var hr, mr = function() {
            return mr = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            mr.apply(this, arguments)
        }, fr = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }, vr = ["IAB7-3", "IAB7-5", "IAB7-8", "IAB7-9", "IAB7-10", "IAB7-11", "IAB7-14", "IAB7-17", "IAB7-18", "IAB7-19", "IAB7-21", "IAB7-22", "IAB7-24", "IAB7-25", "IAB7-26", "IAB7-27", "IAB7-28", "IAB7-29", "IAB7-30", "IAB7-31", "IAB7-34", "IAB7-37", "IAB7-39", "IAB7-41", "IAB7-42", "IAB7-43", "IAB7-44", "IAB7-45", "IAB8-5", "IAB8-18", "IAB9-9", "IAB11-1", "IAB11-4", "IAB11-5", "IAB14-1", "IAB14-2", "IAB14-3", "IAB15-5", "IAB17-18", "IAB18-2", "IAB23", "IAB23-1", "IAB23-2", "IAB23-3", "IAB23-4", "IAB23-5", "IAB23-6", "IAB23-7", "IAB23-8", "IAB23-9", "IAB23-10", "IAB24", "IAB25", "IAB25-1", "IAB25-2", "IAB25-3", "IAB25-4", "IAB25-5", "IAB25-6", "IAB25-7", "IAB26", "IAB26-1", "IAB26-2", "IAB26-3", "IAB26-4"], gr = "rewarded", br = "video", wr = !1, yr = {}, kr = !1, xr = function() {
            return wr
        }, _r = function() {
            return kr
        }, Ir = function(e, t) {
            if (void 0 === hr && (hr = function(e) {
                var t, n, i = D.country, o = null === (n = null === (t = null == e ? void 0 : e[i]) || void 0 === t ? void 0 : t.video) || void 0 === n ? void 0 : n.amazon;
                return !!o && Math.random() > o
            }(t)),
            !hr && (yr = e,
            window.apstag))
                try {
                    var n = function(e) {
                        L.debug && console.info("%cPOKI:%c A9 with APS CCPA Privacy mode:", "font-weight: bold", "", "".concat(D.ccpaApplies ? "on" : "off"), e);
                        var t = mr(mr(mr({
                            pubID: "e32f1423-28bc-43ed-8ab0-5ae6b4449cf8",
                            adServer: "googletag",
                            videoAdServer: "GAM"
                        }, D.gdprApplies ? {
                            gdpr: {
                                cmpTimeout: 1e4
                            }
                        } : {}), D.ccpaApplies ? {
                            params: {
                                aps_privacy: e || "1--"
                            }
                        } : {}), {
                            signals: yr
                        });
                        window.apstag.init(t, (function() {
                            wr = !0
                        }
                        ))
                    };
                    D.ccpaApplies ? window.__uspapi("uspPing", 1, (function() {
                        window.__uspapi("getUSPData", 1, (function(e, t) {
                            var i;
                            if (t) {
                                var o = (null === (i = null == e ? void 0 : e.uspString) || void 0 === i ? void 0 : i.charAt(2)) || "N";
                                "-" === o && (o = "N"),
                                n("1Y".concat(o))
                            } else
                                n("1YN")
                        }
                        ))
                    }
                    )) : n("1--")
                } catch (e) {
                    wr = !1,
                    window.apstag = void 0
                }
        }, Sr = function(t, n) {
            var i = {
                "728x90": "/".concat(so, "/").concat(D.device, "_ingame_728x90/").concat(D.siteID, "_").concat(D.device, "_ingame_728x90"),
                "300x250": "/".concat(so, "/").concat(D.device, "_ingame_300x250/").concat(D.siteID, "_").concat(D.device, "_ingame_300x250"),
                "970x250": "/".concat(so, "/").concat(D.device, "_ingame_970x250/").concat(D.siteID, "_").concat(D.device, "_ingame_970x250"),
                "160x600": "/".concat(so, "/").concat(D.device, "_ingame_160x600/").concat(D.siteID, "_").concat(D.device, "_ingame_160x600"),
                "320x50": "/".concat(so, "/").concat(D.device, "_ingame_320x50/").concat(D.siteID, "_").concat(D.device, "_ingame_320x50"),
                "728x90_external": "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_728x90"),
                "300x250_external": "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_300x250"),
                "970x250_external": "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_970x250"),
                "160x600_external": "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_160x600"),
                "320x50_external": "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_320x50")
            }
              , o = function(e) {
                var t = Eo() || g() || b() ? ["video/mp4", "application/javascript"] : ["video/mp4", "video/webm", "video/ogg", "application/javascript"]
                  , n = mr(mr({
                    mimes: t,
                    minduration: 1,
                    protocols: [2, 3, 5, 6, 7, 8, 11, 12, 13, 14],
                    w: 640,
                    h: 480,
                    placement: 1,
                    linearity: 1,
                    boxingallowed: 1,
                    pos: 1,
                    api: [2, 7, 8]
                }, e ? {
                    maxduration: 30,
                    maxextended: 10
                } : {
                    maxduration: 15
                }), {
                    playbackmethod: [3],
                    skip: 0,
                    startdelay: -1
                });
                return {
                    bids: fr([{
                        bidder: "appnexus",
                        params: {
                            placementId: e ? Oo[D.device].rewarded : Oo[D.device].midroll,
                            supplyType: "web"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            delDomain: "poki-d.openx.net",
                            unit: e ? Ro[D.device].rewarded : Ro[D.device].midroll
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: e ? Do[D.device].rewarded : Do[D.device].midroll,
                            video: {}
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: e ? Mo[D.device].rewarded : Mo[D.device].midroll,
                            supplyType: "site"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06",
                            ext: {
                                placement_name: e ? Lo[D.device].rewarded : Lo[D.device].midroll
                            }
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: 18608,
                            siteId: 498726,
                            zoneId: e ? To[D.device].rewarded : To[D.device].midroll,
                            position: "atf",
                            video: {
                                size_id: 204
                            },
                            bcat: vr
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: e ? Bo[D.device].rewarded : Bo[D.device].midroll,
                            bcat: vr
                        }
                    }, {
                        bidder: "sharethrough",
                        params: {
                            pkey: e ? Po[D.device].rewarded : Po[D.device].midroll,
                            bcat: vr
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: e ? Go[D.device].rewarded : Go[D.device].midroll,
                            video: mr({}, n)
                        }
                    }], C() ? [{
                        bidder: "openx_s2s",
                        params: {
                            delDomain: "poki-d.openx.net",
                            unit: e ? Xo[D.device].rewarded : Xo[D.device].midroll
                        }
                    }, {
                        bidder: "ix_s2s",
                        params: {
                            siteId: e ? Ko[D.device].rewarded : Ko[D.device].midroll,
                            video: {}
                        }
                    }, {
                        bidder: "richaudience_s2s",
                        params: {
                            pid: e ? Wo[D.device].rewarded : Wo[D.device].midroll,
                            supplyType: "site"
                        }
                    }, {
                        bidder: "rubicon_s2s",
                        params: {
                            accountId: 18608,
                            siteId: 551606,
                            zoneId: e ? qo[D.device].rewarded : qo[D.device].midroll,
                            position: "atf",
                            video: {
                                size_id: 204
                            },
                            bcat: vr
                        }
                    }, {
                        bidder: "pubmatic_s2s",
                        params: {
                            publisherId: "156838",
                            adSlot: e ? Qo[D.device].rewarded : Qo[D.device].midroll,
                            bcat: vr
                        }
                    }, {
                        bidder: "sharethrough_s2s",
                        params: {
                            pkey: e ? Ho[D.device].rewarded : Ho[D.device].midroll,
                            bcat: vr
                        }
                    }, {
                        bidder: "triplelift_s2s",
                        params: {
                            inventoryCode: e ? Vo[D.device].rewarded : Vo[D.device].midroll,
                            video: mr({}, n)
                        }
                    }] : [], !0),
                    mediaTypes: {
                        video: mr({
                            context: "instream",
                            playerSize: [640, 480],
                            plcmt: 1
                        }, n)
                    }
                }
            }
              , r = o(!0)
              , a = o(!1)
              , s = window.location.hostname.replace(".", "-")
              , d = [{
                code: br,
                mediaTypes: a.mediaTypes,
                bids: fr([], a.bids, !0)
            }, {
                code: gr,
                mediaTypes: r.mediaTypes,
                bids: fr([], r.bids, !0)
            }, {
                code: i["728x90"],
                mediaTypes: {
                    banner: {
                        sizes: [[728, 90]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: fr([{
                    bidder: "appnexus",
                    params: {
                        placementId: Oo[D.device]["728x90"]
                    }
                }, {
                    bidder: "openx",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Ro[D.device]["728x90"]
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: Do[D.device]["728x90"]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: Bo[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: 498726,
                        zoneId: To[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Lo[D.device]["728x90"]
                        }
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: Mo[D.device]["728x90"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Po[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: Go[D.device]["728x90"]
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: "poki-com",
                        placement: No[D.device]["728x90"],
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }], C() ? [{
                    bidder: "openx_s2s",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Xo[D.device]["728x90"]
                    }
                }, {
                    bidder: "ix_s2s",
                    params: {
                        siteId: Ko[D.device]["728x90"]
                    }
                }, {
                    bidder: "pubmatic_s2s",
                    params: {
                        publisherId: "156838",
                        adSlot: Qo[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon_s2s",
                    params: {
                        accountId: 18608,
                        siteId: 551606,
                        zoneId: qo[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag_s2s",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Zo[D.device]["728x90"]
                        }
                    }
                }, {
                    bidder: "richaudience_s2s",
                    params: {
                        pid: Wo[D.device]["728x90"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough_s2s",
                    params: {
                        pkey: Ho[D.device]["728x90"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift_s2s",
                    params: {
                        inventoryCode: Vo[D.device]["728x90"]
                    }
                }] : [], !0)
            }, {
                code: i["300x250"],
                mediaTypes: {
                    banner: {
                        sizes: [[300, 250]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: fr([{
                    bidder: "appnexus",
                    params: {
                        placementId: Oo[D.device]["300x250"]
                    }
                }, {
                    bidder: "openx",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Ro[D.device]["300x250"]
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: Do[D.device]["300x250"]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: Bo[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: 498726,
                        zoneId: To[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Lo[D.device]["300x250"]
                        }
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: Mo[D.device]["300x250"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Po[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: Go[D.device]["300x250"]
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: "poki-com",
                        placement: No[D.device]["300x250"],
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }], C() ? [{
                    bidder: "openx_s2s",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Xo[D.device]["300x250"]
                    }
                }, {
                    bidder: "ix_s2s",
                    params: {
                        siteId: Ko[D.device]["300x250"]
                    }
                }, {
                    bidder: "pubmatic_s2s",
                    params: {
                        publisherId: "156838",
                        adSlot: Qo[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon_s2s",
                    params: {
                        accountId: 18608,
                        siteId: 551606,
                        zoneId: qo[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag_s2s",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Zo[D.device]["300x250"]
                        }
                    }
                }, {
                    bidder: "richaudience_s2s",
                    params: {
                        pid: Wo[D.device]["300x250"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough_s2s",
                    params: {
                        pkey: Ho[D.device]["300x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift_s2s",
                    params: {
                        inventoryCode: Vo[D.device]["300x250"]
                    }
                }] : [], !0)
            }, {
                code: i["970x250"],
                mediaTypes: {
                    banner: {
                        sizes: [[970, 250]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: fr([{
                    bidder: "appnexus",
                    params: {
                        placementId: Oo[D.device]["970x250"]
                    }
                }, {
                    bidder: "openx",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Ro[D.device]["970x250"]
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: Do[D.device]["970x250"]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: Bo[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: 498726,
                        zoneId: To[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Lo[D.device]["970x250"]
                        }
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: Mo[D.device]["970x250"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Po[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: Go[D.device]["970x250"]
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: "poki-com",
                        placement: No[D.device]["970x250"],
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }], C() ? [{
                    bidder: "openx_s2s",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Xo[D.device]["970x250"]
                    }
                }, {
                    bidder: "ix_s2s",
                    params: {
                        siteId: Ko[D.device]["970x250"]
                    }
                }, {
                    bidder: "pubmatic_s2s",
                    params: {
                        publisherId: "156838",
                        adSlot: Qo[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon_s2s",
                    params: {
                        accountId: 18608,
                        siteId: 551606,
                        zoneId: qo[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag_s2s",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Zo[D.device]["970x250"]
                        }
                    }
                }, {
                    bidder: "richaudience_s2s",
                    params: {
                        pid: Wo[D.device]["970x250"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough_s2s",
                    params: {
                        pkey: Ho[D.device]["970x250"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift_s2s",
                    params: {
                        inventoryCode: Vo[D.device]["970x250"]
                    }
                }] : [], !0)
            }, {
                code: i["160x600"],
                mediaTypes: {
                    banner: {
                        sizes: [[160, 600]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: fr([{
                    bidder: "appnexus",
                    params: {
                        placementId: Oo[D.device]["160x600"]
                    }
                }, {
                    bidder: "openx",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Ro[D.device]["160x600"]
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: Do[D.device]["160x600"]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: Bo[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: 498726,
                        zoneId: To[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Lo[D.device]["160x600"]
                        }
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: Mo[D.device]["160x600"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Po[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: Go[D.device]["160x600"]
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: "poki-com",
                        placement: No[D.device]["160x600"],
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }], C() ? [{
                    bidder: "openx_s2s",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Xo[D.device]["160x600"]
                    }
                }, {
                    bidder: "ix_s2s",
                    params: {
                        siteId: Ko[D.device]["160x600"]
                    }
                }, {
                    bidder: "pubmatic_s2s",
                    params: {
                        publisherId: "156838",
                        adSlot: Qo[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon_s2s",
                    params: {
                        accountId: 18608,
                        siteId: 551606,
                        zoneId: qo[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag_s2s",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Zo[D.device]["160x600"]
                        }
                    }
                }, {
                    bidder: "richaudience_s2s",
                    params: {
                        pid: Wo[D.device]["160x600"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough_s2s",
                    params: {
                        pkey: Ho[D.device]["160x600"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift_s2s",
                    params: {
                        inventoryCode: Vo[D.device]["160x600"]
                    }
                }] : [], !0)
            }, {
                code: i["320x50"],
                mediaTypes: {
                    banner: {
                        sizes: [[320, 50]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: fr([{
                    bidder: "appnexus",
                    params: {
                        placementId: Oo[D.device]["320x50"]
                    }
                }, {
                    bidder: "openx",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Ro[D.device]["320x50"]
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: Do[D.device]["320x50"]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: Bo[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: 498726,
                        zoneId: To[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Lo[D.device]["320x50"]
                        }
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: Mo[D.device]["320x50"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Po[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: Go[D.device]["320x50"]
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: "poki-com",
                        placement: No[D.device]["320x50"],
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }], C() ? [{
                    bidder: "openx_s2s",
                    params: {
                        delDomain: "poki-d.openx.net",
                        unit: Xo[D.device]["320x50"]
                    }
                }, {
                    bidder: "ix_s2s",
                    params: {
                        siteId: Ko[D.device]["320x50"]
                    }
                }, {
                    bidder: "pubmatic_s2s",
                    params: {
                        publisherId: "156838",
                        adSlot: Qo[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon_s2s",
                    params: {
                        accountId: 18608,
                        siteId: 551606,
                        zoneId: qo[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "onetag_s2s",
                    params: {
                        pubId: "6da09f566a9dc06",
                        ext: {
                            placement_name: Zo[D.device]["320x50"]
                        }
                    }
                }, {
                    bidder: "richaudience_s2s",
                    params: {
                        pid: Wo[D.device]["320x50"],
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough_s2s",
                    params: {
                        pkey: Ho[D.device]["320x50"],
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift_s2s",
                    params: {
                        inventoryCode: Vo[D.device]["320x50"]
                    }
                }] : [], !0)
            }, {
                code: i["728x90_external"],
                mediaTypes: {
                    banner: {
                        sizes: [[728, 90]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: [{
                    bidder: "appnexus",
                    params: {
                        placementId: "20973406"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885656",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "268177",
                        placementId: "625562",
                        size: [728, 90]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457872",
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: "362566",
                        zoneId: "1962680-2",
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: "MP_gIE1VDieUi",
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Fo,
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: "Poki_728x90_Prebid"
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: s,
                        placement: "external_".concat(D.device, "_display_ingame"),
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }]
            }, {
                code: i["300x250_external"],
                mediaTypes: {
                    banner: {
                        sizes: [[300, 250]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: [{
                    bidder: "appnexus",
                    params: {
                        placementId: "20973408"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885657",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625564",
                        size: [300, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457874",
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: "362566",
                        zoneId: "1962680-15",
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: "MP_gIE1VDieUi",
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Uo,
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: "Poki_300x250_Prebid"
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: s,
                        placement: "external_".concat(D.device, "_display_ingame"),
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }]
            }, {
                code: i["970x250_external"],
                mediaTypes: {
                    banner: {
                        sizes: [[970, 250]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: [{
                    bidder: "appnexus",
                    params: {
                        placementId: "20973415"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885650",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625560",
                        size: [970, 250]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457879",
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: "362566",
                        zoneId: "1962680-57",
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: "MP_gIE1VDieUi",
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: jo,
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: "Poki_970x250_Prebid"
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: s,
                        placement: "external_".concat(D.device, "_display_ingame"),
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }]
            }, {
                code: i["160x600_external"],
                mediaTypes: {
                    banner: {
                        sizes: [[160, 600]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: [{
                    bidder: "appnexus",
                    params: {
                        placementId: "20973407"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885653",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625563",
                        size: [160, 600]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457877",
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: "362566",
                        zoneId: "1962680-9",
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: "MP_gIE1VDieUi",
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: zo,
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: "Poki_160x600_Prebid"
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: s,
                        placement: "external_".concat(D.device, "_display_ingame"),
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }]
            }, {
                code: i["320x50_external"],
                mediaTypes: {
                    banner: {
                        sizes: [[320, 50]]
                    }
                },
                ortb2Imp: {
                    battr: [6, 7]
                },
                bids: [{
                    bidder: "appnexus",
                    params: {
                        placementId: "20973413"
                    }
                }, {
                    bidder: "openx",
                    params: {
                        unit: "543885649",
                        delDomain: "poki-d.openx.net"
                    }
                }, {
                    bidder: "ix",
                    params: {
                        siteId: "625559",
                        size: [320, 50]
                    }
                }, {
                    bidder: "pubmatic",
                    params: {
                        publisherId: "156838",
                        adSlot: "3457875",
                        bcat: vr
                    }
                }, {
                    bidder: "rubicon",
                    params: {
                        accountId: 18608,
                        siteId: "362566",
                        zoneId: "1962680-43",
                        bcat: vr
                    }
                }, {
                    bidder: "onetag",
                    params: {
                        pubId: "6da09f566a9dc06"
                    }
                }, {
                    bidder: "richaudience",
                    params: {
                        pid: "MP_gIE1VDieUi",
                        supplyType: "site"
                    }
                }, {
                    bidder: "sharethrough",
                    params: {
                        pkey: Uo,
                        bcat: vr
                    }
                }, {
                    bidder: "triplelift",
                    params: {
                        inventoryCode: "Poki_320x50_Prebid"
                    }
                }, {
                    bidder: "adagio",
                    params: {
                        organizationId: "1155",
                        site: s,
                        placement: "external_".concat(D.device, "_display_ingame"),
                        environment: D.device,
                        useAdUnitCodeAsAdUnitElementId: !0,
                        pagetype: "game",
                        category: "games"
                    }
                }]
            }]
              , c = mr(mr({
                debug: !1,
                enableSendAllBids: !1,
                usePrebidCache: !0,
                bidderTimeout: 1500,
                enableTIDs: !0,
                eventHistoryTTL: 90,
                minBidCacheTTL: 90,
                mediaTypePriceGranularity: {
                    video: {
                        buckets: [{
                            precision: 2,
                            max: 3,
                            increment: .01
                        }, {
                            precision: 2,
                            max: 8,
                            increment: .05
                        }, {
                            precision: 2,
                            max: 20,
                            increment: .5
                        }, {
                            precision: 2,
                            max: 45,
                            increment: 1
                        }]
                    },
                    banner: {
                        buckets: [{
                            precision: 2,
                            max: 5.6,
                            increment: .01
                        }, {
                            precision: 2,
                            max: 20,
                            increment: .05
                        }, {
                            precision: 2,
                            max: 45,
                            increment: .5
                        }]
                    }
                },
                currency: {
                    adServerCurrency: "EUR",
                    defaultRates: {
                        EUR: {
                            EUR: 1,
                            GBP: .84,
                            USD: 1.02
                        },
                        GBP: {
                            EUR: 1.2,
                            GBP: 1,
                            USD: 1.22
                        },
                        USD: {
                            EUR: .98,
                            GBP: .82,
                            USD: 1
                        }
                    }
                },
                cache: {
                    url: "https://prebid.adnxs.com/pbc/v1/cache",
                    ignoreBidderCacheKey: !0
                },
                targetingControls: {
                    allowTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"],
                    allowSendAllBidsTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"]
                },
                ortb2: {
                    site: {
                        name: "Poki",
                        page: po()
                    },
                    device: mr({}, window.innerWidth && window.innerHeight ? {
                        w: window.innerWidth,
                        h: window.innerHeight
                    } : {}),
                    bcat: vr
                },
                debugging: {
                    enabled: !1,
                    intercept: [{
                        when: {
                            adUnitCode: "rewarded"
                        },
                        then: {
                            cpm: 25,
                            currency: "EUR",
                            netRevenue: 100,
                            creativeId: "testCreativeId",
                            ttl: 500,
                            mediaType: "video",
                            vastUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
                            ad: '<VAST version="3.0"> <Ad id="123"> <InLine> <AdSystem>PubMatic</AdSystem> <AdTitle>VAST 2.0 Instream Test</AdTitle> <Description>VAST 2.0 Instream Test</Description> <Error> <![CDATA[https://aktrack.pubmatic.com/er=[ERRORCODE]]]> </Error> <Impression> <![CDATA[https://aktrack.pubmatic.com?e=impression]]> </Impression> <Creatives> <Creative AdID="123"> <Linear> <Duration>00:00:30</Duration> <TrackingEvents> <Tracking event="creativeView"> <![CDATA[https://aktrack.pubmatic.com?e=creativeView]]> </Tracking> <Tracking event="start"> <![CDATA[https://aktrack.pubmatic.com?e=start]]> </Tracking> <Tracking event="midpoint"> <![CDATA[https://aktrack.pubmatic.com?e=midpoint]]> </Tracking> <Tracking event="firstQuartile"> <![CDATA[https://aktrack.pubmatic.com?e=firstQuartile]]> </Tracking> <Tracking event="thirdQuartile"> <![CDATA[https://aktrack.pubmatic.com?e=thirdQuartile]]> </Tracking> <Tracking event="complete"> <![CDATA[https://aktrack.pubmatic.com?e=complete]]> </Tracking> </TrackingEvents> <VideoClicks> <ClickThrough> <![CDATA[https://www.pubmatic.com]]> </ClickThrough> </VideoClicks> <MediaFiles> <MediaFile delivery="progressive" type="video/mp4" bitrate="500" width="480" height="460" scalable="true" maintainAspectRatio="true"> <![CDATA[https://staging.pubmatic.com:8443/test/spinning-logo-480x360_video.mp4]]> </MediaFile> <MediaFile delivery="progressive" type="video/ogg" bitrate="500" width="480" height="460" scalable="true" maintainAspectRatio="true"> <![CDATA[https://staging.pubmatic.com:8443/test/spinning-logo-480x360_video.ogg]]> </MediaFile> <MediaFile delivery="progressive" type="video/x-flv" bitrate="500" width="400" height="300" scalable="true" maintainAspectRatio="true"> <![CDATA[https://staging.pubmatic.com:8443/test/PubMatic_test_video.flv]]> </MediaFile> </MediaFiles> </Linear> </Creative> <Creative AdID="123"> <NonLinearAds> <TrackingEvents></TrackingEvents> <NonLinear height="50" width="300" minSuggestedDuration="00:00:05"> <StaticResource creativeType="image/jpeg"> <![CDATA[https://staging.pubmatic.com:8443/test/PubMatic_LetsBeClear_300x50.jpeg]]> </StaticResource> <NonLinearClickThrough> <![CDATA[https://www.pubmatic.com]]> </NonLinearClickThrough> </NonLinear> </NonLinearAds> </Creative> <Creative AdID="123"> <CompanionAds> <Companion width="300" height="250"> <StaticResource creativeType="image/jpeg"> <![CDATA[https://staging.pubmatic.com:8443/test/PubMatic_LetsBeClear_320x250.jpg]]> </StaticResource> <CompanionClickThrough> <![CDATA[https://www.pubmatic.com]]> </CompanionClickThrough> </Companion> </CompanionAds> </Creative> </Creatives> </InLine> </Ad> </VAST>'
                        }
                    }]
                },
                pageUrl: po(),
                userSync: {
                    filterSettings: {
                        all: {
                            bidders: "*",
                            filter: "include"
                        }
                    },
                    syncsPerBidder: 1e3,
                    syncDelay: 100,
                    userIds: [{
                        name: "pubCommonId",
                        storage: {
                            type: "cookie",
                            name: "poki_pubcid",
                            expires: 180
                        }
                    }]
                }
            }, D.gdprApplies ? {
                consentManagement: {
                    gdpr: {
                        cmpApi: "iab",
                        timeout: 8e3,
                        defaultGdprScope: !0
                    }
                }
            } : {}), D.ccpaApplies ? {
                consentManagement: {
                    usp: {
                        cmpApi: "iab",
                        timeout: 8e3
                    }
                }
            } : {});
            window.pbjs.que.push((function() {
                kr = !0;
                var i = mr(mr({
                    floors: {}
                }, c), t.config);
                window.pbjs.addAdUnits(function(e, t) {
                    var n, i, o = D.country, r = null == t ? void 0 : t[o];
                    if (!r)
                        return e;
                    for (var a = 0; a <= e.length; a++)
                        for (var s = e[a], d = r[(null === (n = null == s ? void 0 : s.mediaTypes) || void 0 === n ? void 0 : n.video) ? "video" : "display"] || {}, c = ((null === (i = null == s ? void 0 : s.bids) || void 0 === i ? void 0 : i.length) || 0) - 1; c >= 0; c--) {
                            var l = s.bids[c]
                              , u = Math.random();
                            d[l.bidder] && u > d[l.bidder] && e[a].bids.splice(c, 1)
                        }
                    return e
                }(t.adUnits || d, n)),
                window.pbjs.setConfig(i);
                var o = function(e) {
                    return function(t, n, i) {
                        var o;
                        if (null === (o = null == i ? void 0 : i.mediaTypes) || void 0 === o ? void 0 : o.banner) {
                            ["ix", "richaudience", "pubmatic", "sharethrough"].includes(e) && (t *= .95)
                        }
                        return D.forceBidder === e && (t = 45),
                        t
                    }
                };
                window.pbjs.bidderSettings = {
                    standard: {
                        storageAllowed: !0
                    },
                    appnexus: {
                        bidCpmAdjustment: o("appnexus")
                    },
                    openx: {
                        bidCpmAdjustment: o("openx")
                    },
                    ix: {
                        bidCpmAdjustment: o("ix")
                    },
                    richaudience: {
                        bidCpmAdjustment: o("richaudience")
                    },
                    onetag: {
                        bidCpmAdjustment: o("onetag")
                    },
                    rubicon: {
                        bidCpmAdjustment: o("rubicon")
                    },
                    pubmatic: {
                        bidCpmAdjustment: o("pubmatic")
                    },
                    sharethrough: {
                        bidCpmAdjustment: o("sharethrough")
                    },
                    triplelift: {
                        bidCpmAdjustment: o("triplelift")
                    },
                    adagio: {
                        bidCpmAdjustment: o("adagio")
                    }
                },
                window.pbjs.onEvent("bidAdjustment", (function(e) {
                    e && (function(e) {
                        var t, n, i, o = null === (n = null === (t = null == e ? void 0 : e.meta) || void 0 === t ? void 0 : t.advertiserDomains) || void 0 === n ? void 0 : n.find(Io);
                        return !o && "richaudience" === e.bidderCode && Io(null == e ? void 0 : e.meta) && (o = e.meta),
                        !!o && (xo || (xo = []),
                        xo.push("".concat(e.bidder, ":").concat(o, ":").concat(null == e ? void 0 : e.cpm.toFixed(4), ":").concat((null === (i = null == e ? void 0 : e.meta) || void 0 === i ? void 0 : i.primaryCatId) || "-")),
                        console.warn("%cPOKI:%c blocked ad: ", "font-weight: bold", "", e),
                        !0)
                    }(e) && (e.ttl = 0),
                    "triplelift" === e.bidderCode && "s2s" === e.source && "video" === e.mediaType && (e.ttl = 0))
                }
                )),
                void 0 !== window.pbjs && (window.pbjs.onEvent("bidAdjustment", (function(e) {
                    Ar(e)
                }
                )),
                U.addEventListener(e.ads.loaded, pr),
                U.addEventListener(e.ads.video.error, (function() {
                    var e, t = null === (e = U.getVideoDataAnnotations()) || void 0 === e ? void 0 : e.adID;
                    window.pbjs.markWinningBidAsUsed({
                        adId: t
                    })
                }
                )))
            }
            ))
        };
        function Er(t, n, i, o, r, a) {
            var s, d, c, l = w(), u = r ? "nope" : n, p = po(), A = o ? gr : br, h = 0, m = function() {
                var o, s, d, m, f, g, b;
                if (!(--h > 0))
                    try {
                        var w = u
                          , y = void 0;
                        if (_r()) {
                            U.dispatchEvent(e.ads.prebidRequested, {
                                blocked: So()
                            });
                            var k = window.pbjs.adUnits.filter((function(e) {
                                return e.code === A
                            }
                            ))[0];
                            if ("undefined" === k)
                                return console.warn("%cPOKI:%c Video-ad-unit not found, did you give it the adunit.code='video' value?", "font-weight: bold", ""),
                                void t.requestAd(u);
                            w = null === (s = null === (o = window.pbjs.adServers.dfp.buildVideoUrl({
                                adUnit: k,
                                params: {
                                    iu: v("iu", n),
                                    sz: "640x360|640x480",
                                    output: "vast",
                                    cust_params: i,
                                    description_url: p,
                                    url: p,
                                    nofb: 1,
                                    max_ad_duration: 15e3
                                }
                            })) || void 0 === o ? void 0 : o.replace("&max_ad_duration=15000", "")) || void 0 === s ? void 0 : s.replace("&min_ad_duration=1000", "");
                            var x = v("cust_params", w)
                              , _ = decodeURIComponent(x)
                              , I = v("hb_pb", _);
                            if (I) {
                                var S = null === (d = Ao((g = {
                                    hb_pb: I,
                                    hb_adid: v("hb_adid", _),
                                    hb_uuid: v("hb_uuid", _)
                                },
                                b = v("hb_bidder", _),
                                Object.fromEntries(Object.entries(g).map((function(e) {
                                    var t = e[0]
                                      , n = e[1];
                                    return ["".concat(t, "_").concat(b).substring(0, 20), "".concat(n)]
                                }
                                )))))) || void 0 === d ? void 0 : d.replace("&cust_params=", "");
                                w = w.replace("cust_params=", "cust_params=".concat(S, "%26"))
                            }
                            var E = window.pbjs.getHighestCpmBids(A);
                            if (E.length > 0 && (y = E[0]),
                            y) {
                                var C = null === (f = null === (m = y.meta) || void 0 === m ? void 0 : m.advertiserDomains) || void 0 === f ? void 0 : f.join(",");
                                "richaudience" === y.bidderCode && (C = y.meta),
                                U.addVideoDataAnnotations({
                                    adID: y.adId,
                                    adDomain: C,
                                    HBAdDomain: C,
                                    HBBidder: y.bidderCode,
                                    HBAdId: y.adId,
                                    HBCreativeId: y.creativeId,
                                    HBSource: y.source,
                                    HBCPM: y.cpm
                                }),
                                Math.random() < .01 && U.addVideoDataAnnotations({
                                    HBVastXML: JSON.stringify(y.vastXml),
                                    HBVastUrl: y.vastUrl
                                })
                            }
                        }
                        if (c) {
                            c.startsWith("%26") && (c = c.substring(3));
                            var P = decodeURIComponent(c)
                              , T = v("amznp", P);
                            "8iam0w" === T && ("mobile" === l || "tablet" === l) || (w = w.replace("cust_params=", "cust_params=".concat(c, "%26"))),
                            U.addVideoDataAnnotations({
                                APSBidder: ko(T)
                            })
                        }
                        if (r) {
                            if (c) {
                                var B = function(e) {
                                    var t = decodeURIComponent(e)
                                      , n = v("amznbid", t);
                                    if (!n)
                                        return null;
                                    var i = bo[n];
                                    if (!i)
                                        return null;
                                    var o = v("amzniid", t);
                                    return {
                                        bid: i,
                                        vast: "https://aax.amazon-adsystem.com/e/dtb/vast?b=".concat(o, "&rnd=").concat(Math.round(1e10 * Math.random()), "&pp=").concat(n)
                                    }
                                }(c);
                                B && (!y || !y.videoCacheKey || y.cpm < B.bid) && (y = {
                                    cpm: B.bid,
                                    vast: B.vast,
                                    bidder: "amazon",
                                    videoCacheKey: "amazon"
                                })
                            }
                            if (1 === a || y && y.videoCacheKey && !(y.cpm < mo()) || (y = {
                                cpm: mo(),
                                vast: go(),
                                bidder: "poki",
                                videoCacheKey: "poki"
                            }),
                            !y || !y.videoCacheKey)
                                return void U.dispatchEvent(1 === a ? e.ads.video.error : e.ads.completed, {
                                    rewardAllowed: !1
                                });
                            switch (y.bidder) {
                            case "onetag":
                                w = "https://onetag-sys.com/invocation/?key=".concat(y.videoCacheKey);
                                break;
                            case "rubicon":
                                w = "https://prebid-server.rubiconproject.com/cache?uuid=".concat(y.videoCacheKey);
                                break;
                            case "spotx":
                                w = "https://search.spotxchange.com/ad/vast.html?key=".concat(y.videoCacheKey);
                                break;
                            case "amazon":
                            case "poki":
                                w = y.vast;
                                break;
                            default:
                                w = "https://prebid.adnxs.com/pbc/v1/cache?uuid=".concat(y.videoCacheKey)
                            }
                            G({
                                event: "video-ready",
                                bidder: null == y ? void 0 : y.bidder,
                                bid: null == y ? void 0 : y.cpm
                            }),
                            U.addVideoDataAnnotations({
                                p4d_game_id: D.gameID,
                                p4d_version_id: D.versionID,
                                bidder: null == y ? void 0 : y.bidder,
                                bid: null == y ? void 0 : y.cpm
                            })
                        }
                        U.addVideoDataAnnotations({
                            pokiAdServer: r,
                            adTagUrl: w
                        }),
                        y ? U.addVideoDataAnnotations({
                            prebidBidder: null == y ? void 0 : y.bidder,
                            prebidBid: null == y ? void 0 : y.cpm
                        }) : U.addVideoDataAnnotations({
                            prebidBidder: void 0,
                            prebidBid: void 0
                        }),
                        t.requestAd(w)
                    } catch (e) {
                        t.requestAd(u)
                    }
            };
            if (xr() && h++,
            _r() && h++,
            xr())
                try {
                    var f = "desktop_ingame_midroll_1";
                    o && (f = "desktop" === l ? "desktop_ingame_roll_1" : "mobile_ingame_roll_1");
                    var g = [{
                        slotID: f,
                        mediaType: "video"
                    }];
                    E() && (g = null === (d = null === (s = null === window || void 0 === window ? void 0 : window.assertive) || void 0 === s ? void 0 : s.addAmazonFloors) || void 0 === d ? void 0 : d.call(s, g)),
                    window.apstag.fetchBids({
                        slots: g,
                        timeout: 1500
                    }, (function(e) {
                        e.length > 0 && (c = e[0].encodedQsParams),
                        m()
                    }
                    ))
                } catch (e) {
                    m()
                }
            r && G({
                event: "video-request"
            }),
            _r() && window.pbjs.que.push((function() {
                window.pbjs.requestBids({
                    adUnitCodes: [A],
                    bidsBackHandler: function() {
                        m()
                    }
                })
            }
            )),
            xr() || _r() || m()
        }
        function Cr() {
            return !("yes" !== v("poki-ad-server")) && (console.info("%cPOKI:%c Only running Poki-ad-server", "font-weight: bold", ""),
            !0)
        }
        var Pr, Tr, Br, Dr, Mr, Or, Lr, Nr = !1, Rr = D.testVideos, zr = D.device, jr = function() {
            return Rr ? "/6062/sanghan_rweb_ad_unit" : "/".concat(so, "/").concat(zr, "_ingame_rewarded_google/").concat(D.siteID, "_").concat(zr, "_ingame_rewarded_google")
        }, Ur = function(t) {
            "desktop" === zr || (null === document || void 0 === document ? void 0 : document.fullscreenElement) ? U.dispatchEvent(e.ads.video.startHouseAdFlow) : window.googletag.cmd.push((function() {
                Ki.track(e.tracking.ads.rewardedWeb.request),
                function(e) {
                    googletag.defineOutOfPageSlot && (Pr && googletag.destroySlots([Pr]),
                    Pr = googletag.defineOutOfPageSlot(jr(), googletag.enums.OutOfPageFormat.REWARDED).addService(googletag.pubads()),
                    googletag.enableServices(),
                    Object.keys(e).forEach((function(t) {
                        var n, i = e[t];
                        "" !== i && (null === (n = null == Pr ? void 0 : Pr.setTargeting) || void 0 === n || n.call(Pr, t, i))
                    }
                    )))
                }(t),
                Pr ? window.googletag.cmd.push((function() {
                    window.googletag.display(Pr)
                }
                )) : U.dispatchEvent(e.ads.video.startHouseAdFlow)
            }
            ))
        }, Fr = {
            desktop: (Tr = {},
            Tr[Yo] = (Br = {},
            Br[tr.skyscraper] = ["DZ", "BO", "BD", "TN"],
            Br[tr.rectangle] = ["CN", "BO", "BD", "NP", "TN", "DZ"],
            Br[tr.leaderboard] = ["CN", "NP", "PY", "DZ", "BO", "TN"],
            Br[tr.midroll] = ["CN", "PK", "DZ"],
            Br[tr.rewarded] = ["CN", "DZ"],
            Br),
            Tr[Jo] = (Dr = {},
            Dr[tr.leaderboard] = ["DZ"],
            Dr),
            Tr),
            mobile: (Mr = {},
            Mr[Yo] = (Or = {},
            Or[tr.gamebar] = ["BR", "AR", "GR", "OM", "VN", "CO", "TR", "CN", "AZ", "GT", "PY", "PH", "MA", "HN", "TW", "IQ", "NI", "DO", "RS", "EC", "UA", "UY", "AM", "AL", "IN", "ID", "DZ", "EG", "PK", "BO", "BD", "LK", "NP", "TN"],
            Or[tr.rewarded] = ["CN"],
            Or),
            Mr[Jo] = (Lr = {},
            Lr[tr.smallLeaderboard] = ["DZ"],
            Lr),
            Mr)
        };
        function Gr(e, t) {
            var n, i, o;
            void 0 === e && (e = ""),
            void 0 === t && (t = er());
            var r = D.device
              , a = D.country
              , s = function(e) {
                if (e.includes("gamebar_320x50"))
                    return tr.gamebar;
                var t = Object.keys(tr).find((function(t) {
                    return !!e.includes("_".concat(tr[t]))
                }
                ));
                return t && "gamebar" !== t ? t : (console.warn("%cPOKI:%c Unknown adunitpath or new gamebar format", "font-weight: bold", "", e),
                "")
            }(e);
            return !(null === (o = null === (i = null === (n = null == Fr ? void 0 : Fr[r]) || void 0 === n ? void 0 : n[t]) || void 0 === i ? void 0 : i[tr[s]]) || void 0 === o ? void 0 : o.includes(a))
        }
        var Vr = function() {
            function t(t, n) {
                void 0 === n && (n = {});
                var i = this;
                this.retries = 0,
                this.running = !1,
                this.ima = t,
                this.country = D.country || "ZZ",
                this.usePokiAdserver = Cr(),
                this.totalRetries = n.totalRetries || co.waterfallRetries || 1,
                this.timing = n.timing || new uo(co.adTiming),
                U.addEventListener(e.ads.video.error, (function() {
                    i.moveThroughWaterfall()
                }
                )),
                U.addEventListener(e.ads.video.loaderError, (function() {
                    i.moveThroughWaterfall()
                }
                )),
                U.addEventListener(e.ads.ready, (function() {
                    i.timing.stopWaterfallTimer()
                }
                )),
                U.addEventListener(e.ads.started, (function() {
                    i.stopWaterfall()
                }
                )),
                U.addEventListener(e.ads.video.startHouseAdFlow, (function() {
                    i.startHouseAdFlow()
                }
                ))
            }
            return t.prototype.moveThroughWaterfall = function() {
                if (this.runningBackfill)
                    return this.runningBackfill = !1,
                    void U.dispatchEvent(e.ads.error, {
                        message: "Backfilling failed",
                        rewardAllowed: !1
                    });
                if (!1 !== this.running) {
                    var t = this.totalRetries;
                    this.timing.stopWaterfallTimer(),
                    this.retries < t ? this.requestAd() : (this.running = !1,
                    this.rewarded ? Ur(this.criteria) : U.dispatchEvent(e.ads.error, {
                        message: "No ads"
                    }))
                }
            }
            ,
            t.prototype.cutOffWaterfall = function() {
                this.ima.tearDown(),
                this.moveThroughWaterfall()
            }
            ,
            t.prototype.startHouseAdFlow = function() {
                var e = go();
                U.addVideoDataAnnotations({
                    pokiAdServer: !0,
                    adTagUrl: e,
                    bidder: "poki",
                    bid: 0
                }),
                G({
                    event: "video-request"
                }),
                this.ima.requestAd(e),
                this.runningBackfill = !0
            }
            ,
            t.prototype.start = function(t, n) {
                void 0 === t && (t = {}),
                this.running = !0,
                this.retries = 0,
                this.criteria = t,
                this.rewarded = n === e.ads.position.rewarded,
                this.adUnitPaths = function(t) {
                    var n = D.device
                      , i = "midroll";
                    if (v("noFill") || L.debug)
                        return ["junk", "junk"];
                    t === e.ads.position.rewarded && (i = "rewarded");
                    var o = "/".concat(so, "/");
                    return er() === $o ? ["".concat(o, "external_").concat(n, "_video_1/external_").concat(n, "_ingame_").concat(i, "_1"), "".concat(o, "external_").concat(n, "_video_2/external_").concat(n, "_ingame_").concat(i, "_2")] : ["".concat(o).concat(n, "_ingame_").concat(i, "_1/").concat(D.siteID, "_").concat(n, "_ingame_").concat(i, "_1"), "".concat(o).concat(n, "_ingame_").concat(i, "_2/").concat(D.siteID, "_").concat(n, "_ingame_").concat(i, "_2")]
                }(n),
                this.requestAd()
            }
            ,
            t.prototype.requestAd = function() {
                var t, n = this;
                this.timing.startWaterfallTimer((function() {
                    n.cutOffWaterfall()
                }
                )),
                this.retries++,
                this.criteria.waterfall = this.retries,
                this.runningBackfill = !1;
                var i = (this.retries - 1) % this.adUnitPaths.length
                  , o = this.adUnitPaths[i]
                  , r = "https://securepubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=".concat(o, "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast4");
                D.familyFriendly && (r += "&tfcd=1&tfua=1&rdp=1&npa=1"),
                D.nonPersonalized && (r += "&npa=1"),
                r += "&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}&nofb=1";
                var a = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 970;
                this.criteria.billboards_fit = a ? "yes" : "no",
                this.criteria.page_has_lead = null !== (null === (t = document.getElementById("/21682198607/desktop_gp_728x90/".concat(D.siteID, "_desktop_gp_728x90"))) || void 0 === t ? void 0 : t.offsetParent) ? "yes" : "no";
                var s = function(e) {
                    var t = encodeURIComponent(po());
                    return (e = (e = e.split("{url}").join(t)).split("{descriptionUrl}").join(t)).split("{timestamp}").join((new Date).getTime().toString())
                }(r) + Ao(this.criteria)
                  , d = Gr(o);
                U.addVideoDataAnnotations({
                    adUnitPath: o,
                    adTagUrl: s,
                    waterfall: this.retries,
                    size: "640x360v",
                    ab: this.criteria.ab,
                    headerBiddingAllowed: d
                }),
                U.dispatchEvent(e.ads.requested),
                L.debug || D.houseAdsOnly ? (console.debug("%cPOKI:%c adRequest started in house-ad mode (".concat(this.retries, "/").concat(this.totalRetries, ")"), "font-weight: bold", ""),
                this.startHouseAdFlow()) : this.usePokiAdserver ? (console.debug("%cPOKI:%c adRequest started with Prebid Video enabled (".concat(this.retries, "/").concat(this.totalRetries, ")"), "font-weight: bold", ""),
                Er(this.ima, s, this.criteria, this.rewarded, !0, this.retries)) : d && 1 === this.retries ? (console.debug("%cPOKI:%c adRequest started with Prebid Video enabled (".concat(this.retries, "/").concat(this.totalRetries, ")"), "font-weight: bold", ""),
                Er(this.ima, s, this.criteria, this.rewarded, !1, this.retries)) : (console.debug("%cPOKI:%c adRequest started in plain mode (".concat(this.retries, "/").concat(this.totalRetries, ")"), "font-weight: bold", ""),
                this.ima.requestAd(s))
            }
            ,
            t.prototype.isRunning = function() {
                return this.running
            }
            ,
            t.prototype.stopWaterfall = function() {
                this.running = !1,
                this.timing.stopWaterfallTimer()
            }
            ,
            t
        }();
        const Hr = Vr;
        var qr = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , Qr = function() {
            function t(t) {
                var n = this;
                this.storedQueue = [],
                this.progressCallback = t,
                this.reset(),
                U.addEventListener(e.ads.video.progress, (function(e) {
                    var t = 100 - n.currentProgress
                      , i = e.currentTime / e.duration * t;
                    i < t && n.progressCallback(n.currentProgress + i)
                }
                )),
                this.initializeNoProgressFix()
            }
            return t.prototype.queueFakeProgress = function(e, t, n) {
                var i = this;
                this.storedQueue.push({
                    progressToFake: e,
                    duration: t,
                    stopEvent: n
                }),
                U.addEventListener(n, (function() {
                    i.eventWatcher[n] = !0,
                    i.currentProgress = i.startProgress + e,
                    i.startProgress = i.currentProgress,
                    i.progressCallback(i.currentProgress),
                    i.activeQueue.shift(),
                    i.activeQueue.length > 0 ? i.continue() : i.pause()
                }
                ))
            }
            ,
            t.prototype.fakeProgress = function(e, t, n) {
                this.activeQueue.push({
                    progressToFake: e,
                    duration: t,
                    stopEvent: n
                }),
                this.fakeProgressEvents = !0,
                this.continue()
            }
            ,
            t.prototype.start = function() {
                this.activeQueue.length > 0 || (this.activeQueue = qr([], this.storedQueue, !0),
                this.active = !0,
                this.continue())
            }
            ,
            t.prototype.continue = function() {
                if (this.activeQueue.length > 0 && !this.tickInterval) {
                    this.startTime = Date.now();
                    this.tickInterval = window.setInterval(this.tick.bind(this), 50),
                    this.active = !0
                }
            }
            ,
            t.prototype.pause = function() {
                this.clearInterval()
            }
            ,
            t.prototype.tick = function() {
                var t = this.activeQueue[0]
                  , n = Date.now() - this.startTime
                  , i = Math.min(n / t.duration, 1);
                this.currentProgress = this.startProgress + t.progressToFake * i,
                this.fakeProgressEvents && U.dispatchEvent(e.ads.video.progress, {
                    duration: t.duration / 1e3,
                    currentTime: n / 1e3
                }),
                this.progressCallback(this.currentProgress),
                (this.eventWatcher[t.stopEvent] || 1 === i) && this.pause()
            }
            ,
            t.prototype.clearInterval = function() {
                this.tickInterval && (clearInterval(this.tickInterval),
                this.tickInterval = 0)
            }
            ,
            t.prototype.initializeNoProgressFix = function() {
                var t = this;
                U.addEventListener(e.ads.started, (function(n) {
                    t.progressWatcherTimeout = window.setTimeout((function() {
                        if (t.active) {
                            var i = 100 - t.currentProgress
                              , o = 1e3 * n.duration - 1e3;
                            t.fakeProgress(i, o, e.ads.completed)
                        }
                    }
                    ), 1e3)
                }
                )),
                U.addEventListener(e.ads.video.progress, (function() {
                    t.progressWatcherTimeout && (clearTimeout(t.progressWatcherTimeout),
                    t.progressWatcherTimeout = 0)
                }
                ))
            }
            ,
            t.prototype.reset = function() {
                this.eventWatcher = {},
                this.startProgress = 0,
                this.startTime = 0,
                this.currentProgress = 0,
                this.activeQueue = [],
                this.active = !1,
                this.fakeProgressEvents = !1,
                this.clearInterval()
            }
            ,
            t.prototype.fakeItTillTheEnd = function(t) {
                var n = 100 - this.currentProgress;
                this.fakeProgress(n, 1e3 * t, e.ads.completed)
            }
            ,
            t
        }();
        const Kr = Qr;
        var Wr, Zr = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }, Xr = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function Yr() {
            return Zr(this, void 0, void 0, (function() {
                var e;
                return Xr(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        Wr || ((Wr = document.createElement("video")).setAttribute("playsinline", "playsinline"),
                        (e = document.createElement("source")).src = "data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw",
                        Wr.appendChild(e)),
                        t.label = 1;
                    case 1:
                        return t.trys.push([1, 3, , 4]),
                        [4, Wr.play()];
                    case 2:
                        return t.sent(),
                        [2, !0];
                    case 3:
                        return t.sent(),
                        [2, !1];
                    case 4:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var Jr = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , $r = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function ea(e) {
            e.classList.add(Lt),
            e.classList.remove(qt)
        }
        function ta(e) {
            e.classList.add(qt),
            e.classList.remove(Lt)
        }
        var na = function() {
            function t(t) {
                var n = this;
                if (this.progressFaker = new Kr((function(e) {
                    return n.updateProgressBar(e)
                }
                )),
                this.progressFaker.queueFakeProgress(20, 2e3, e.ads.started),
                this.createElements(t.wrapper),
                "undefined" != typeof window && document) {
                    var i = document.createElement("style");
                    i.innerHTML = Zt,
                    document.head.appendChild(i)
                }
            }
            return t.prototype.updateProgressBar = function(e) {
                this.progressBar.style.width = "".concat(e, "%")
            }
            ,
            t.prototype.setupEvents = function(e) {
                this.monetization = e
            }
            ,
            t.prototype.hide = function() {
                var e;
                null === (e = this.destroyHouseAds) || void 0 === e || e.call(this),
                ea(this.containerDiv),
                ea(this.progressContainer),
                this.hidePauseButton(),
                ea(this.startAdButton),
                ea(this.nrAds),
                this.containerDiv.classList.remove(Ot),
                this.progressBar.style.width = "0%",
                this.progressFaker.reset()
            }
            ,
            t.prototype.hideSpinner = function() {
                ea(this.spinnerContainer)
            }
            ,
            t.prototype.show = function() {
                this.containerDiv.classList.add(Ot),
                ta(this.containerDiv),
                ta(this.spinnerContainer),
                ta(this.progressContainer),
                this.progressFaker.start()
            }
            ,
            t.prototype.getVideoBounds = function() {
                return this.adContainer.getBoundingClientRect()
            }
            ,
            t.prototype.getAdContainer = function() {
                return this.adContainer
            }
            ,
            t.prototype.getVideoContainer = function() {
                return this.videoContainer
            }
            ,
            t.prototype.showPauseButton = function() {
                var e = this;
                ta(this.pauseButtonContainer),
                this.monetization && this.pauseButtonContainer.addEventListener("click", (function() {
                    e.monetization.resumeAd()
                }
                ))
            }
            ,
            t.prototype.hidePauseButton = function() {
                var e = this;
                ea(this.pauseButtonContainer),
                this.monetization && this.pauseButtonContainer.removeEventListener("click", (function() {
                    e.monetization.resumeAd()
                }
                ))
            }
            ,
            t.prototype.showStartAdButton = function() {
                var e = this;
                ta(this.startAdButton),
                this.monetization && this.startAdButton.addEventListener("click", (function() {
                    e.monetization.startAdClicked()
                }
                ))
            }
            ,
            t.prototype.hideStartAdButton = function() {
                var e = this;
                ea(this.startAdButton),
                this.monetization && this.startAdButton.removeEventListener("click", (function() {
                    e.monetization.startAdClicked()
                }
                ))
            }
            ,
            t.prototype.createElements = function(e) {
                var t = this;
                this.containerDiv = document.createElement("div"),
                this.insideContainer = document.createElement("div"),
                this.pauseButtonContainer = document.createElement("div"),
                this.pauseButton = document.createElement("div"),
                this.pauseButtonBG = document.createElement("div"),
                this.startAdButton = document.createElement("div"),
                this.progressBar = document.createElement("div"),
                this.progressContainer = document.createElement("div"),
                this.spinnerContainer = document.createElement("div"),
                this.adContainer = document.createElement("div"),
                this.videoContainer = document.createElement("video"),
                this.nrAds = document.createElement("div"),
                this.adContainer.id = "pokiSDKAdContainer",
                this.videoContainer.id = "pokiSDKVideoContainer",
                this.containerDiv.className = Dt,
                this.insideContainer.className = Nt,
                this.pauseButtonContainer.className = Rt,
                this.pauseButton.className = zt,
                this.pauseButtonBG.className = jt,
                this.pauseButtonContainer.appendChild(this.pauseButton),
                this.pauseButtonContainer.appendChild(this.pauseButtonBG),
                this.startAdButton.className = Ut,
                this.startAdButton.innerHTML = "Tap anywhere to play ad",
                this.progressBar.className = Ft,
                this.progressContainer.className = Gt,
                this.spinnerContainer.className = Vt,
                this.adContainer.className = Qt,
                this.videoContainer.className = Ht,
                this.nrAds.className = Wt,
                this.hide(),
                this.videoContainer.setAttribute("playsinline", "playsinline"),
                this.videoContainer.setAttribute("muted", "muted"),
                this.containerDiv.appendChild(this.insideContainer),
                this.containerDiv.appendChild(this.spinnerContainer),
                this.containerDiv.appendChild(this.nrAds),
                this.insideContainer.appendChild(this.progressContainer),
                this.insideContainer.appendChild(this.videoContainer),
                this.insideContainer.appendChild(this.adContainer),
                this.containerDiv.appendChild(this.pauseButtonContainer),
                this.containerDiv.appendChild(this.startAdButton),
                this.progressContainer.appendChild(this.progressBar);
                var n = e || null
                  , i = function() {
                    if (n || (n = document.body),
                    n)
                        if (n.appendChild(t.containerDiv),
                        n === document.body)
                            t.containerDiv.classList.add(Mt);
                        else {
                            var e = window.getComputedStyle(n).position;
                            e && -1 !== ["absolute", "fixed", "relative"].indexOf(e) || (n.style.position = "relative")
                        }
                    else
                        window.requestAnimationFrame(i)
                };
                !n || n instanceof HTMLElement || (n = null,
                console.warn("%cPOKI:%c wrapper is not a HTMLElement, falling back to document.body", "font-weight: bold", "")),
                i()
            }
            ,
            t.prototype.startNonIMAFallbackVideo = function(t) {
                return Jr(this, void 0, void 0, (function() {
                    var n, i, o, r, a = this;
                    return $r(this, (function(s) {
                        return (n = document.createElement("video")).id = "pokiSDKHouseAdContainer",
                        n.className = Kt,
                        n.playsInline = !0,
                        n.muted = an() || sn,
                        n.src = t.videoUrl,
                        i = !1,
                        o = function() {
                            t.clickThrough && window.open(t.clickThrough),
                            U.dispatchEvent(e.ads.video.clicked, {
                                creativeId: "HouseAd"
                            }),
                            i = !0,
                            n.pause(),
                            r()
                        }
                        ,
                        this.insideContainer.addEventListener("click", o),
                        r = function(t) {
                            a.destroyHouseAds = void 0,
                            a.hide(),
                            a.insideContainer.removeChild(n),
                            a.insideContainer.removeEventListener("click", o),
                            t || U.dispatchEvent(e.ads.completed, {
                                rewardAllowed: i
                            })
                        }
                        ,
                        this.destroyHouseAds = function() {
                            return r(!0)
                        }
                        ,
                        n.onabort = function() {
                            return r()
                        }
                        ,
                        n.onerror = function() {
                            return r()
                        }
                        ,
                        n.onerror = function() {
                            return r()
                        }
                        ,
                        n.onplaying = function() {
                            U.dispatchEvent(e.ads.started, {
                                creativeId: "HouseAd",
                                duration: t.duration,
                                skip: -1
                            }),
                            U.dispatchEvent(e.ads.impression),
                            a.progressFaker.fakeItTillTheEnd(t.duration)
                        }
                        ,
                        n.onended = function() {
                            i = !0,
                            r()
                        }
                        ,
                        this.insideContainer.appendChild(n),
                        Yr() || (n.muted = !0),
                        n.play().catch((function() {
                            return r()
                        }
                        )),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.setNrAds = function(e, t) {
                1 !== t ? (ta(this.nrAds),
                this.nrAds.innerHTML = "Ad ".concat(e, " of ").concat(t)) : ea(this.nrAds)
            }
            ,
            t
        }();
        const ia = na;
        var oa = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , ra = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , aa = function() {
            function t(e) {
                this.bannerTimeout = null,
                this.allowedToPlayAd = !1,
                this.runningAd = !1,
                this.completeOnce = !1,
                this.videoStarted = !1,
                this.currentWidth = 640,
                this.currentHeight = 480,
                this.currentRequestIsMuted = !1,
                this.volume = 1,
                this.videoElement = document.getElementById("pokiSDKVideoContainer"),
                this.adsManager = null,
                this.volume = e,
                this.initAdDisplayContainer(),
                this.initAdsLoader()
            }
            return t.prototype.initAdDisplayContainer = function() {
                this.adDisplayContainer || window.google && (this.adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById("pokiSDKAdContainer"),this.videoElement))
            }
            ,
            t.prototype.initAdsLoader = function() {
                var e = this;
                this.adsLoader || window.google && (this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer),
                this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED),
                this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0),
                this.adsLoader.getSettings().setNumRedirects(8),
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1, this),
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdLoaderError, !1, this),
                this.videoElement.addEventListener("onended", (function() {
                    return e.adsLoader.contentComplete()
                }
                )))
            }
            ,
            t.prototype.requestAd = function(e) {
                console.trace();
                return oa(this, void 0, void 0, (function() {
                    var t, n, i;
                    return ra(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return this.runningAd ? [2] : (this.runningAd = !0,
                            this.completeOnce = !0,
                            this.videoStarted = !1,
                            this.adDisplayContainer.initialize(),
                            this.videoElement.src = "",
                            t = (null === (i = null === document || void 0 === document ? void 0 : document.getElementById("pokiDebugVASTResponse")) || void 0 === i ? void 0 : i.value) || "",
                            n = new google.ima.AdsRequest,
                            t ? n.adsResponse = t : n.adTagUrl = e,
                            n.linearAdSlotWidth = this.currentWidth,
                            n.linearAdSlotHeight = this.currentHeight,
                            n.nonLinearAdSlotWidth = this.currentWidth,
                            n.nonLinearAdSlotHeight = this.currentHeight,
                            n.forceNonLinearFullSlot = !0,
                            [4, Yr()]);
                        case 1:
                            return o.sent() ? (n.setAdWillPlayMuted(!1),
                            this.currentRequestIsMuted = !1) : (n.setAdWillPlayMuted(!0),
                            this.currentRequestIsMuted = !0),
                            this.allowedToPlayAd = !0,
                            this.adsLoader.requestAds(n, {
                                adTagUrl: e
                            }),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.resize = function(e, t) {
                this.currentWidth = e,
                this.currentHeight = t,
                this.adsManager && this.adsManager.resize(e, t, null === window || void 0 === window ? void 0 : window.google.ima.ViewMode.NORMAL)
            }
            ,
            t.prototype.onAdsManagerLoaded = function(t) {
                var n = new google.ima.AdsRenderingSettings;
                n.enablePreloading = !0,
                n.restoreCustomPlaybackStateOnAdBreakComplete = !0,
                n.mimeTypes = Eo() || g() || b() ? ["video/mp4"] : ["video/mp4", "video/webm", "video/ogg"],
                n.loadVideoTimeout = 8e3,
                this.adsManager = t.getAdsManager(this.videoElement, n),
                this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume))),
                this.currentRequestIsMuted && this.adsManager.setVolume(0),
                this.allowedToPlayAd ? (this.attachAdEvents(),
                U.dispatchEvent(e.ads.ready)) : this.tearDown()
            }
            ,
            t.prototype.setVolume = function(e) {
                this.volume = e,
                this.adsManager && this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume)))
            }
            ,
            t.prototype.startPlayback = function() {
                try {
                    this.adsManager.init(this.currentWidth, this.currentHeight, google.ima.ViewMode.NORMAL),
                    this.adsManager.start()
                } catch (e) {
                    return this.tearDown(),
                    !1
                }
                return !0
            }
            ,
            t.prototype.startIOSPlayback = function() {
                this.adsManager.start()
            }
            ,
            t.prototype.stopPlayback = function() {
                this.tearDown()
            }
            ,
            t.prototype.resumeAd = function() {
                U.dispatchEvent(e.ads.video.resumed),
                this.adsManager && this.adsManager.resume()
            }
            ,
            t.prototype.tearDown = function() {
                this.adsManager && (this.adsManager.stop(),
                this.adsManager.destroy(),
                this.adsManager = null),
                null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout),
                this.bannerTimeout = null),
                this.adsLoader && (this.adsLoader.contentComplete(),
                this.adsLoader.destroy(),
                this.adsLoader = null,
                this.initAdsLoader()),
                this.completeOnce = !1,
                this.runningAd = !1
            }
            ,
            t.prototype.attachAdEvents = function() {
                var e = this
                  , t = google.ima.AdEvent.Type;
                this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this),
                [t.AD_PROGRESS, t.ALL_ADS_COMPLETED, t.CLICK, t.COMPLETE, t.IMPRESSION, t.PAUSED, t.SKIPPED, t.STARTED, t.USER_CLOSE, t.AD_BUFFERING, t.LOG, t.LOADED].forEach((function(t) {
                    e.adsManager.addEventListener(t, e.onAdEvent, !1, e)
                }
                ))
            }
            ,
            t.prototype.onAdEvent = function(t) {
                var n = this
                  , i = t.getAd()
                  , o = function() {
                    var e, t, n, o, r, a, s, d, c;
                    try {
                        U.addVideoDataAnnotations({
                            IMAAdID: null === (e = null == i ? void 0 : i.getAdId) || void 0 === e ? void 0 : e.call(i),
                            IMAAdSystem: null === (t = null == i ? void 0 : i.getAdSystem) || void 0 === t ? void 0 : t.call(i),
                            IMAContentType: null === (n = null == i ? void 0 : i.getContentType) || void 0 === n ? void 0 : n.call(i),
                            IMATitle: null === (o = null == i ? void 0 : i.getTitle) || void 0 === o ? void 0 : o.call(i),
                            IMAUniversalAdIDRegistry: null === (r = null == i ? void 0 : i.getUniversalAdIdRegistry) || void 0 === r ? void 0 : r.call(i),
                            IMAUniversalAdIDValue: null === (a = null == i ? void 0 : i.getUniversalAdIdValue) || void 0 === a ? void 0 : a.call(i),
                            IMAUniversalAdIDs: JSON.stringify(null === (s = null == i ? void 0 : i.getUniversalAdIds) || void 0 === s ? void 0 : s.call(i)),
                            IMAWrapperIDs: [(null === (d = null == i ? void 0 : i.getWrapperAdIds) || void 0 === d ? void 0 : d.call(i)) || [], (null === (c = null == i ? void 0 : i.getWrapperCreativeIds) || void 0 === c ? void 0 : c.call(i)) || []].flat(1 / 0)
                        })
                    } catch (e) {
                        console.error("Error annotating IMA ad:", e)
                    }
                };
                switch (t.type) {
                case google.ima.AdEvent.Type.AD_PROGRESS:
                    U.dispatchEvent(e.ads.video.progress, t.getAdData());
                    break;
                case google.ima.AdEvent.Type.LOADED:
                    o(),
                    U.dispatchEvent(e.ads.loaded, {});
                    break;
                case google.ima.AdEvent.Type.STARTED:
                    t.remainingTime = this.adsManager.getRemainingTime(),
                    t.remainingTime <= 0 && (t.remainingTime = 15),
                    this.videoStarted = !0,
                    i.isLinear() || (this.bannerTimeout = window.setTimeout((function() {
                        n.completeOnce && (n.completeOnce = !1,
                        U.dispatchEvent(e.ads.completed, {
                            rewardAllowed: n.videoStarted && t.rewardAllowed
                        })),
                        n.tearDown()
                    }
                    ), 1e3 * (t.remainingTime + 1))),
                    U.addVideoDataAnnotations({
                        creativeId: i.getCreativeId(),
                        duration: i.getDuration(),
                        skip: i.getSkipTimeOffset()
                    }),
                    o(),
                    U.dispatchEvent(e.ads.started, {});
                    break;
                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                case google.ima.AdEvent.Type.COMPLETE:
                    this.completeOnce && (this.completeOnce = !1,
                    U.dispatchEvent(e.ads.completed, {
                        rewardAllowed: this.videoStarted
                    })),
                    this.tearDown();
                    break;
                case google.ima.AdEvent.Type.USER_CLOSE:
                    this.completeOnce && (this.completeOnce = !1,
                    U.dispatchEvent(e.ads.completed, {
                        rewardAllowed: !1
                    })),
                    this.tearDown();
                    break;
                case google.ima.AdEvent.Type.PAUSED:
                    this.adsManager.pause(),
                    U.dispatchEvent(e.ads.video.paused);
                    break;
                case google.ima.AdEvent.Type.AD_BUFFERING:
                    U.dispatchEvent(e.ads.video.buffering);
                    break;
                case google.ima.AdEvent.Type.CLICK:
                    U.dispatchEvent(e.ads.video.clicked);
                    break;
                case google.ima.AdEvent.Type.SKIPPED:
                    U.dispatchEvent(e.ads.skipped),
                    this.completeOnce && (this.completeOnce = !1,
                    U.dispatchEvent(e.ads.completed, {
                        rewardAllowed: this.videoStarted
                    })),
                    document.activeElement && document.activeElement.blur(),
                    this.tearDown();
                    break;
                case google.ima.AdEvent.Type.IMPRESSION:
                    U.dispatchEvent(e.ads.impression, {
                        creativeId: i.getCreativeId()
                    })
                }
            }
            ,
            t.prototype.onAdLoaderError = function(t) {
                this.tearDown();
                var n = null == t ? void 0 : t.getError()
                  , i = (null == n ? void 0 : n.toString()) || "Unknown"
                  , o = (null == n ? void 0 : n.getErrorCode()) || 0;
                U.dispatchEvent(e.ads.video.loaderError, {
                    message: i,
                    errorCode: o
                })
            }
            ,
            t.prototype.onAdError = function(t) {
                this.tearDown();
                var n = null == t ? void 0 : t.getError()
                  , i = (null == n ? void 0 : n.toString()) || "Unknown"
                  , o = (null == n ? void 0 : n.getErrorCode()) || 0;
                U.dispatchEvent(e.ads.video.error, {
                    message: i,
                    errorCode: o,
                    context: null == t ? void 0 : t.getUserRequestContext()
                })
            }
            ,
            t.prototype.muteAd = function() {
                void 0 !== this.adsManager && null != this.adsManager && this.adsManager.setVolume(0)
            }
            ,
            t.prototype.isAdRunning = function() {
                return this.runningAd
            }
            ,
            t
        }();
        const sa = aa;
        var da = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , ca = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        const la = function() {
            var e = window.location.pathname;
            "/" !== e[0] && (e = "/".concat(e));
            var t = "";
            window.top !== window && (t = encodeURIComponent(document.referrer));
            var n = encodeURIComponent("".concat(window.location.protocol, "//").concat(window.location.host).concat(e).concat(window.location.search))
              , i = "./patch/null.json?https://devs-api.poki.com/gameinfo/@sdk?href=".concat(n, "&referrer=").concat(t);
            return fetch(i, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                }
            }).then((function(e) {
                return da(void 0, void 0, void 0, (function() {
                    var t;
                    return ca(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return e.status >= 200 && e.status < 400 ? [4, e.json()] : [3, 2];
                        case 1:
                            return (t = n.sent()).game_id ? [2, {
                                gameID: t.game_id,
                                gameTitle: t.game_name,
                                playtestRecord: t.playtest_record,
                                playtestVersion: t.playtest_version,
                                playtestDeviceCategory: t.playtest_device_category,
                                playtestNewUser: t.playtest_new_user,
                                metrictestID: t.metrictest_id,
                                metrictestVersion: t.metrictest_version,
                                metrictestDeviceCategory: t.metrictest_device_category,
                                cachedContentGameID: t.cached_content_game_id,
                                specialConditions: t.ad_settings.special_conditions,
                                adTiming: {
                                    preroll: t.ad_settings.preroll,
                                    timePerTry: t.ad_settings.time_per_try,
                                    timeBetweenAds: t.ad_settings.time_between_ads,
                                    startAdsAfter: t.ad_settings.start_ads_after
                                }
                            }] : [2, void 0];
                        case 2:
                            throw e
                        }
                    }
                    ))
                }
                ))
            }
            )).catch((function(e) {
                return function(e) {
                    return da(this, void 0, void 0, (function() {
                        var t, n, i, o, r, a, s, d, c, l, u, p;
                        return ca(this, (function(A) {
                            switch (A.label) {
                            case 0:
                                console.warn("%cPOKI:%c failed request p4d info", "font-weight: bold", "", e),
                                A.label = 1;
                            case 1:
                                return A.trys.push([1, 4, , 5]),
                                "/" !== (t = window.location.pathname)[0] && (t = "/".concat(t)),
                                o = (i = JSON).stringify,
                                l = {
                                    c: "sdk-p4d-error",
                                    ve: 7
                                },
                                u = {
                                    k: "error"
                                },
                                a = (r = JSON).stringify,
                                p = {
                                    status: e.status
                                },
                                (s = e.json) ? [4, e.json()] : [3, 3];
                            case 2:
                                s = A.sent(),
                                A.label = 3;
                            case 3:
                                if (n = o.apply(i, [(l.d = [(u.v = a.apply(r, [(p.json = s,
                                p.body = JSON.stringify({
                                    href: "".concat(window.location.protocol, "//").concat(window.location.host).concat(t).concat(window.location.search)
                                }),
                                p.name = e.name,
                                p.message = e.message,
                                p)]),
                                u)],
                                l)]),
                                d = "https://t.poki.io/l",
                                navigator.sendBeacon)
                                    navigator.sendBeacon(d, n);
                                else
                                    try {
                                        (c = new XMLHttpRequest).open("POST", d, !0),
                                        c.send(n)
                                    } catch (e) {}
                                return [3, 5];
                            case 4:
                                return A.sent(),
                                [3, 5];
                            case 5:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }(e)
            }
            ))
        };
        var ua = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , pa = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function Aa() {
            return ua(this, void 0, void 0, (function() {
                var e, t, n, i;
                return pa(this, (function(o) {
                    switch (o.label) {
                    case 0:
                        return o.trys.push([0, 3, , 4]),
                        [4, fetch("./patch/null.json?https://geo.poki.io/", {
                            method: "GET",
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })];
                    case 1:
                        return [4, o.sent().json()];
                    case 2:
                        return e = o.sent(),
                        t = e.ISO,
                        n = e.ccpaApplies,
                        [2, {
                            ISO: t,
                            ccpaApplies: n
                        }];
                    case 3:
                        return i = o.sent(),
                        console.warn("%cPOKI:%c failed to fetch country info", "font-weight: bold", "", i),
                        [2, {
                            ISO: "ZZ",
                            ccpaApplies: !1
                        }];
                    case 4:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var ha = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , ma = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        };
        function fa() {
            return ha(this, void 0, void 0, (function() {
                var e, t, n, i, o, r, a, s;
                return ma(this, (function(d) {
                    switch (d.label) {
                    case 0:
                        if ("test" === (null === (s = null === (a = null === window || void 0 === window ? void 0 : window.process) || void 0 === a ? void 0 : a.env) || void 0 === s ? void 0 : s.NODE_ENV))
                            return [2, {
                                blocklist: [],
                                countryExclusion: [],
                                bidderLimitation: {}
                            }];
                        d.label = 1;
                    case 1:
                        return d.trys.push([1, 4, , 5]),
                        [4, fetch("./patch/null.json?https://api.poki.com/ads/settings", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 2:
                        return [4, d.sent().json()];
                    case 3:
                        return e = d.sent(),
                        t = e.blocklist,
                        n = e.country_exclusion,
                        i = e.bidder_limitation,
                        o = JSON.parse(i) || {},
                        D.country && (o[D.country] = o[D.country] || {},
                        o[D.country].video = o[D.country].video || {},
                        o[D.country].video.triplelift = .05),
                        [2, {
                            blocklist: (null == t ? void 0 : t.split(/[\r\n]+/)) || [],
                            countryExclusion: (n.split(",") || []).map((function(e) {
                                return e.toUpperCase()
                            }
                            )),
                            bidderLimitation: o
                        }];
                    case 4:
                        return r = d.sent(),
                        console.warn("%cPOKI:%c failed to fetch ad settings", "font-weight: bold", "", r),
                        [2, {
                            blocklist: [],
                            countryExclusion: [],
                            bidderLimitation: {}
                        }];
                    case 5:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var va = function() {
            return va = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            va.apply(this, arguments)
        };
        var ga = function() {
            function t() {
                this.slotMap = new Map,
                this.totalRefreshNumber = {},
                this.requestAd = function(t) {
                    var n, i, o;
                    Ki.track(e.tracking.ads.display.requested, {
                        size: t.size,
                        opportunityId: t.opportunityId,
                        adUnitPath: t.adUnitPath,
                        duringGameplay: t.duringGameplay,
                        refresh: t.refreshNumber > 0,
                        refreshNumber: t.refreshNumber,
                        refreshType: (null === (n = t.criteria) || void 0 === n ? void 0 : n.refreshType) || "",
                        platformAd: t.platformAd,
                        headerBiddingAllowed: t.headerBiddingAllowed
                    });
                    var r = 0
                      , a = function() {
                        var e, n;
                        if (!(--r > 0)) {
                            if (t.headerBiddingAllowed && xr())
                                try {
                                    window.apstag.setDisplayBids()
                                } catch (e) {}
                            if (t.headerBiddingAllowed && _r())
                                try {
                                    window.pbjs.setTargetingForGPTAsync([t.adUnitPath]),
                                    t.pbjsTargetting = window.pbjs.getAdserverTargetingForAdUnitCode([t.adUnitPath])
                                } catch (e) {}
                            null === (n = null === (e = null === window || void 0 === window ? void 0 : window.assertive) || void 0 === e ? void 0 : e.setFloors) || void 0 === n || n.call(e, [t.gptSlot]),
                            t.refreshNumber > 0 ? window.googletag.pubads().refresh([t.gptSlot]) : window.googletag.display(t.id)
                        }
                    };
                    if (t.headerBiddingAllowed) {
                        if (xr() && r++,
                        _r() && r++,
                        xr())
                            try {
                                var s = [{
                                    slotName: t.adUnitPath,
                                    slotID: t.id,
                                    sizes: [[t.width, t.height]]
                                }];
                                E() && (s = null === (o = null === (i = null === window || void 0 === window ? void 0 : window.assertive) || void 0 === i ? void 0 : i.addAmazonFloors) || void 0 === o ? void 0 : o.call(i, s)),
                                window.apstag.fetchBids({
                                    slots: s,
                                    timeout: 1500
                                }, (function() {
                                    a()
                                }
                                ))
                            } catch (e) {
                                a()
                            }
                        if (_r())
                            try {
                                window.pbjs.requestBids({
                                    adUnitCodes: [t.adUnitPath],
                                    bidsBackHandler: function() {
                                        a()
                                    }
                                })
                            } catch (e) {
                                a()
                            }
                        xr() || _r() || a()
                    } else
                        a()
                }
                ,
                this.requestHouseAd = function(t, n) {
                    var i = va(va({}, n), {
                        dfpIsBackfill: void 0,
                        dfpLineItemId: void 0,
                        dfpCampaignId: void 0,
                        size: "".concat(t.width, "x").concat(t.height),
                        bidder: "poki",
                        bid: 0
                    });
                    G(va(va({}, i), {
                        event: "request"
                    })),
                    fetch("https://api.poki.com/ads/houseads/display/".concat(t.width, "x").concat(t.height, "?game_id=").concat(D.gameID, "&site=").concat(D.siteID)).then((function(e) {
                        return e.json()
                    }
                    )).then((function(o) {
                        t.innerAdContainer.innerHTML = '<img draggable="false" src="'.concat(o.asset, '" alt="house ad" />'),
                        t.onDisplayRendered && t.onDisplayRendered(!0),
                        n.houseAdId = o.id,
                        n.isEmpty = !1,
                        Ki.track(e.tracking.ads.display.impression, n),
                        G(va(va({}, i), {
                            event: "impression"
                        })),
                        setTimeout((function() {
                            G(va(va({}, i), {
                                event: "viewable"
                            }))
                        }
                        ), 1e3)
                    }
                    )).catch((function() {
                        t.onDisplayRendered && t.onDisplayRendered(!0)
                    }
                    ))
                }
            }
            return t.enforceFamilyFriendlyFlow = function() {
                window.googletag.cmd.push((function() {
                    window.googletag.pubads().setPrivacySettings({
                        underAgeOfConsent: !0,
                        childDirectedTreatment: !0,
                        restrictDataProcessing: !0,
                        nonPersonalizedAds: !0
                    })
                }
                ))
            }
            ,
            t.enforceNonPersonalized = function() {
                window.googletag.cmd.push((function() {
                    window.googletag.pubads().setPrivacySettings({
                        nonPersonalizedAds: !0
                    })
                }
                ))
            }
            ,
            t.prototype.callOnCanDestroy = function(e) {
                var t = this.slotMap.get(e);
                t && !t.onCanDestroyCalled && t.onCanDestroy && (t.onCanDestroyCalled = !0,
                t.onCanDestroy())
            }
            ,
            t.prototype.setupSlotRenderEndedListener = function() {
                var t = this;
                window.googletag.cmd.push((function() {
                    window.googletag.pubads().addEventListener("slotRenderEnded", (function(n) {
                        var i, o, r, a, s, d = n.slot.getSlotElementId(), c = t.slotMap.get(d);
                        if (c && c.gptSlot) {
                            var l = ""
                              , u = ""
                              , p = ""
                              , A = ""
                              , h = ""
                              , m = !1
                              , f = {}
                              , v = ""
                              , g = ""
                              , b = ""
                              , w = !1
                              , y = n.slot;
                            try {
                                if (y) {
                                    var k = (null === (i = null == y ? void 0 : y.getResponseInformation) || void 0 === i ? void 0 : i.call(y)) || {};
                                    l = k.isBackfill,
                                    u = k.lineItemId,
                                    p = k.campaignId,
                                    A = k.creativeId
                                }
                                v = (f = c.pbjsTargetting || {}).hb_bidder,
                                g = f.hb_adomain,
                                b = function(e) {
                                    var t, n = {
                                        cpm: 0
                                    };
                                    if (void 0 === window.pbjs || !_r())
                                        return n;
                                    var i = window.pbjs.getAllWinningBids() || [];
                                    return ((null === (t = window.pbjs.getBidResponsesForAdUnitCode(e)) || void 0 === t ? void 0 : t.bids) || []).forEach((function(e) {
                                        !i.find((function(t) {
                                            return t.adId === e.adId
                                        }
                                        )) && e.cpm > n.cpm && (n = e)
                                    }
                                    )),
                                    n
                                }(c.adUnitPath),
                                w = n.isEmpty
                            } catch (e) {
                                console.warn("%cPOKI:%c error in slotRenderEnded", "font-weight: bold", "", e)
                            }
                            try {
                                y && (h = function(e) {
                                    if (!e || "function" != typeof e.indexOf)
                                        return null;
                                    if (-1 !== e.indexOf("amazon-adsystem.com/aax2/apstag"))
                                        return null;
                                    var t = new RegExp('(?:(?:pbjs\\.renderAd\\(document,|adId:*|hb_adid":\\[)|(?:pbadid=)|(?:adId=))[\'"](.*?)["\']',"gi")
                                      , n = e.replace(/ /g, "")
                                      , i = t.exec(n);
                                    return i && i[1] || null
                                }((null === (o = null == y ? void 0 : y.getHtml) || void 0 === o ? void 0 : o.call(y)) || ""),
                                m = !!h)
                            } catch (e) {
                                console.warn("%cPOKI:%c error in slotRenderEnded", "font-weight: bold", "", e)
                            }
                            var x = parseFloat(f.hb_pb);
                            Number.isNaN(x) && (x = void 0);
                            var _ = {
                                size: c.size,
                                opportunityId: c.opportunityId,
                                refresh: c.refreshNumber > 0,
                                refreshNumber: c.refreshNumber,
                                refreshType: (null === (r = c.criteria) || void 0 === r ? void 0 : r.refreshType) || "",
                                duringGameplay: c.duringGameplay,
                                adUnitPath: c.adUnitPath,
                                prebidBid: x,
                                prebidBidder: v,
                                prebidWon: m,
                                prebidSecondBid: b.cpm > 0 ? b.cpm : void 0,
                                prebidSecondBidder: b.bidder,
                                dfpIsBackfill: l,
                                dfpLineItemId: u,
                                dfpCampaignId: p,
                                dfpCreativeId: A,
                                isEmpty: w,
                                adDomain: g,
                                platformAd: c.platformAd,
                                blocked: So()
                            };
                            if (w) {
                                t.callOnCanDestroy(c.id);
                                try {
                                    var I = null === (s = null === (a = null === window || void 0 === window ? void 0 : window.pbjs) || void 0 === a ? void 0 : a.getHighestUnusedBidResponseForAdUnitCode) || void 0 === s ? void 0 : s.call(a, c.adUnitPath);
                                    I && Ki.track(e.tracking.ads.display.notFilled, {
                                        bidder: I.bidder,
                                        cpm: I.cpm,
                                        adUnitPath: c.adUnitPath,
                                        opportunityId: c.opportunityId
                                    })
                                } catch (e) {}
                            }
                            w && c.backfillHouseads ? t.requestHouseAd(c, _) : (c.onDisplayRendered && c.onDisplayRendered(w),
                            Ki.track(e.tracking.ads.display.impression, _))
                        }
                    }
                    )),
                    window.googletag.pubads().addEventListener("impressionViewable", (function(n) {
                        var i, o, r, a, s = n.slot.getSlotElementId();
                        ((null === (o = null === (i = null == n ? void 0 : n.slot) || void 0 === i ? void 0 : i.getAdUnitPath()) || void 0 === o ? void 0 : o.includes("ingame_rewarded_google")) || (null === (a = null === (r = null == n ? void 0 : n.slot) || void 0 === r ? void 0 : r.getAdUnitPath()) || void 0 === a ? void 0 : a.includes("sanghan_rweb_ad_unit"))) && Ki.track(e.tracking.ads.rewardedWeb.impression),
                        setTimeout((function() {
                            t.callOnCanDestroy(s)
                        }
                        ), 1e3 * Math.random())
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.validateDisplaySettings = function(e) {
                return g() || b() ? ["320x50"].includes(e) : ["970x250", "300x250", "728x90", "160x600", "320x50"].includes(e)
            }
            ,
            t.prototype.getDisplaySlotConfig = function(e, t, n) {
                var i = t.split("x").map((function(e) {
                    return parseInt(e, 10)
                }
                ))
                  , o = this.getDisplaySlotID(e);
                if (o) {
                    var r = this.slotMap.get(o);
                    if (r && r.width === i[0] && r.height === i[1])
                        return r.refreshNumber++,
                        r;
                    this.clearAd(e)
                }
                var a = function(e) {
                    var t = "/".concat(so, "/debug-display/debug-display-").concat(e);
                    return L.debug || (t = D.isPokiIframe ? "/".concat(so, "/").concat(D.device, "_ingame_").concat(e, "/").concat(D.siteID, "_").concat(D.device, "_ingame_").concat(e) : "/".concat(so, "/external_").concat(D.device, "_display_ingame/external_").concat(D.device, "_ingame_").concat(e)),
                    t
                }(t);
                n && (a = n);
                var s = "poki-".concat(oe())
                  , d = document.createElement("div");
                return d.id = s,
                d.className = "poki-ad-slot",
                d.style.width = "".concat(i[0], "px"),
                d.style.height = "".concat(i[1], "px"),
                d.style.overflow = "hidden",
                d.style.position = "relative",
                d.setAttribute("data-poki-ad-size", t),
                {
                    id: s,
                    adUnitPath: a,
                    size: t,
                    width: i[0],
                    height: i[1],
                    refreshNumber: 0,
                    onCanDestroyCalled: !1,
                    backfillHouseads: !1,
                    innerAdContainer: d,
                    platformAd: !1,
                    criteria: {}
                }
            }
            ,
            t.prototype.renderAd = function(e) {
                var t, n = this, i = e.container, o = e.size, r = e.opportunityId, a = e.criteria, s = void 0 === a ? {} : a, d = e.adUnitPath, c = void 0 === d ? "" : d, l = e.duringGameplay, u = void 0 !== l && l, p = e.onCanDestroy, A = void 0 === p ? function() {}
                : p, h = e.onDisplayRendered, m = void 0 === h ? function() {}
                : h, f = e.backfillHouseads, v = void 0 !== f && f, g = e.platformAd, b = void 0 !== g && g, w = e.headerBiddingAllowed, y = void 0 === w || w, k = this.getDisplaySlotConfig(i, o, c);
                k.backfillHouseads = v,
                k.criteria = s,
                k.platformAd = b,
                this.slotMap.set(k.id, k),
                k.opportunityId = r,
                k.headerBiddingAllowed = y,
                k.duringGameplay = "function" == typeof u ? u() : u,
                k.onDisplayRendered = m,
                k.onCanDestroy = A;
                var x = null;
                k.refreshNumber > 0 && (x = k.innerAdContainer),
                x || (i.appendChild(k.innerAdContainer),
                i.setAttribute("data-poki-ad-id", k.id));
                var _ = function() {
                    var e;
                    setTimeout((function() {
                        n.callOnCanDestroy(k.id)
                    }
                    ), 6e3),
                    L.debug ? n.requestHouseAd(k, {
                        opportunityId: k.opportunityId,
                        refresh: k.refreshNumber > 0,
                        refreshNumber: k.refreshNumber,
                        refreshType: (null === (e = k.criteria) || void 0 === e ? void 0 : e.refreshType) || "",
                        duringGameplay: k.duringGameplay,
                        adUnitPath: k.adUnitPath,
                        platformAd: k.platformAd,
                        onDisplayRendered: k.onDisplayRendered
                    }) : window.googletag.cmd.push((function() {
                        var e = n.slotMap.get(k.id);
                        e && e.opportunityId === r && (n.totalRefreshNumber[k.adUnitPath] || (n.totalRefreshNumber[k.adUnitPath] = 0),
                        n.setupGPT(k, va(va({}, s), {
                            refresh_number: "".concat(k.refreshNumber || 0),
                            total_refresh_number: "".concat(n.totalRefreshNumber[k.adUnitPath])
                        })),
                        n.totalRefreshNumber[k.adUnitPath]++,
                        n.requestAd(k))
                    }
                    ))
                };
                null === (t = k.intersectionObserver) || void 0 === t || t.disconnect(),
                c.includes("mobile_gamebar_320x50") ? _() : (k.intersectionObserver = new window.IntersectionObserver((function(e) {
                    var t;
                    e[0].isIntersecting && (null === (t = k.intersectionObserver) || void 0 === t || t.disconnect(),
                    _())
                }
                ),{
                    threshold: .5
                }),
                k.intersectionObserver.observe(k.innerAdContainer))
            }
            ,
            t.prototype.setupGPT = function(e, t) {
                var n;
                e.gptSlot || (160 === e.width && 600 === e.height ? e.gptSlot = window.googletag.defineSlot(e.adUnitPath, [[e.width, e.height], "fluid"], e.id).addService(window.googletag.pubads()) : e.gptSlot = window.googletag.defineSlot(e.adUnitPath, [e.width, e.height], e.id).addService(window.googletag.pubads())),
                window.googletag.enableServices(),
                null === (n = e.gptSlot) || void 0 === n || n.clearTargeting(),
                Object.keys(t).forEach((function(n) {
                    var i, o = t[n];
                    o && (null === (i = e.gptSlot) || void 0 === i || i.setTargeting(n, o))
                }
                ))
            }
            ,
            t.prototype.clearAd = function(t) {
                var n, i, o = this.getDisplaySlotID(t);
                if (o) {
                    var r = this.slotMap.get(o) || null;
                    if (r) {
                        for (r.onCanDestroy && !r.onCanDestroyCalled && console.warn("%cPOKI:%c PokiSDK.destroyAd() called without waiting for onCanDestroy", "font-weight: bold", ""),
                        Ki.track(e.tracking.screen.destroyAd, {
                            opportunityId: r.opportunityId,
                            okToDestroy: r.onCanDestroyCalled,
                            platformAd: r.platformAd
                        }),
                        null === (n = r.intersectionObserver) || void 0 === n || n.disconnect(),
                        r.gptSlot && (null === (i = null === googletag || void 0 === googletag ? void 0 : googletag.destroySlots) || void 0 === i || i.call(googletag, [r.gptSlot])); t.lastChild; )
                            t.removeChild(t.lastChild);
                        t.removeAttribute("data-poki-ad-id"),
                        this.slotMap.delete(r.id)
                    }
                } else
                    console.error("%cPOKI:%c PokiSDK.destroyAd() called on a container without ad", "font-weight: bold", "")
            }
            ,
            t.prototype.getDisplaySlotID = function(e) {
                if (!e)
                    return null;
                var t = e.getAttribute("data-poki-ad-id");
                return t || null
            }
            ,
            t
        }();
        const ba = ga;
        var wa, ya = (wa = function(e, t) {
            return wa = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            wa(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            wa(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), ka = function(t) {
            function n() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.requestAd = function(t) {
                    var n, i;
                    G({
                        event: "request",
                        size: t.size,
                        opportunityId: t.opportunityId,
                        adUnitPath: t.adUnitPath
                    });
                    var o = 0
                      , r = function() {
                        --o > 0 || e.allBidsBack(t.id)
                    };
                    if (xr() && o++,
                    _r() && o++,
                    xr())
                        try {
                            var a = [{
                                slotName: t.adUnitPath,
                                slotID: t.id,
                                sizes: [[t.width, t.height]]
                            }];
                            E() && (a = null === (i = null === (n = null === window || void 0 === window ? void 0 : window.assertive) || void 0 === n ? void 0 : n.addAmazonFloors) || void 0 === i ? void 0 : i.call(n, a)),
                            window.apstag.fetchBids({
                                slots: a,
                                timeout: 1500
                            }, (function(e) {
                                e && e.length > 0 && (t.amznTargetting = e[0]),
                                r()
                            }
                            ))
                        } catch (e) {
                            r()
                        }
                    if (_r())
                        try {
                            window.pbjs.requestBids({
                                adUnitCodes: [t.adUnitPath],
                                bidsBackHandler: function() {
                                    t.pbjsTargetting = window.pbjs.getAdserverTargetingForAdUnitCode([t.adUnitPath]),
                                    r()
                                }
                            })
                        } catch (e) {
                            r()
                        }
                    xr() || _r() || (t.pbjsTargetting = {},
                    t.amznTargetting = {},
                    r())
                }
                ,
                e.setupGPT = function(e, t) {}
                ,
                e.setupSlotRenderEndedListener = function() {}
                ,
                e
            }
            return ya(n, t),
            n.prototype.allBidsBack = function(t) {
                var n, i, o, r = this, a = this.slotMap.get(t);
                if (a) {
                    var s = document.createElement("iframe");
                    s.setAttribute("frameborder", "0"),
                    s.setAttribute("scrolling", "no"),
                    s.setAttribute("marginheight", "0"),
                    s.setAttribute("marginwidth", "0"),
                    s.setAttribute("topmargin", "0"),
                    s.setAttribute("leftmargin", "0"),
                    s.setAttribute("allowtransparency", "true"),
                    s.setAttribute("width", "".concat(a.width)),
                    s.setAttribute("height", "".concat(a.height));
                    var d = document.getElementById(a.id);
                    if (d) {
                        d.appendChild(s);
                        var c = null === (n = null == s ? void 0 : s.contentWindow) || void 0 === n ? void 0 : n.document;
                        if (!c)
                            return console.error("%cPOKI:%c display error - iframe injection for ad failed", "font-weight: bold", "", t),
                            void this.clearAd(d.parentNode);
                        var l = !0
                          , u = a.pbjsTargetting.hb_bidder
                          , p = parseFloat(a.pbjsTargetting.hb_pb);
                        Number.isNaN(p) && (p = 0);
                        var A, h = (A = null === (i = null == a ? void 0 : a.amznTargetting) || void 0 === i ? void 0 : i.amznbid,
                        wo[A] || 0);
                        h > p ? (u = ko(null === (o = null == a ? void 0 : a.amznTargetting) || void 0 === o ? void 0 : o.amnzp),
                        p = h,
                        l = !1,
                        this.renderAMZNAd(a.id, d, c)) : this.renderPrebidAd(a.id, d, c);
                        var m = !u;
                        Ki.track(e.tracking.ads.display.impression, {
                            size: a.size,
                            opportunityId: a.opportunityId,
                            duringGameplay: a.duringGameplay,
                            adUnitPath: a.adUnitPath,
                            prebidBid: p,
                            prebidBidder: u,
                            preBidWon: l,
                            dfpIsBackfill: !1,
                            dfpLineItemId: void 0,
                            dfpCampaignId: void 0,
                            adDomain: a.pbjsTargetting.hb_adomain,
                            isEmpty: m
                        }),
                        G({
                            event: "impression",
                            size: a.size,
                            opportunityId: a.opportunityId,
                            adUnitPath: a.adUnitPath,
                            bidder: u,
                            bid: p
                        }),
                        a.onDisplayRendered && a.onDisplayRendered(m),
                        m ? this.callOnCanDestroy(a.id) : (a.intersectionObserver = new IntersectionObserver((function(e) {
                            e.forEach((function(e) {
                                e.isIntersecting ? a.intersectingTimer || (a.intersectingTimer = setTimeout((function() {
                                    var t;
                                    null === (t = a.intersectionObserver) || void 0 === t || t.unobserve(e.target),
                                    G({
                                        event: "viewable",
                                        size: a.size,
                                        opportunityId: a.opportunityId,
                                        adUnitPath: a.adUnitPath,
                                        bidder: u,
                                        bid: p
                                    }),
                                    r.callOnCanDestroy(a.id)
                                }
                                ), 1e3)) : a.intersectingTimer && (clearTimeout(a.intersectingTimer),
                                a.intersectingTimer = void 0)
                            }
                            ))
                        }
                        ),{
                            threshold: .5
                        }),
                        a.intersectionObserver.observe(d))
                    } else
                        console.error("%cPOKI:%c display error - container not found", "font-weight: bold", "", t)
                }
            }
            ,
            n.prototype.renderPrebidAd = function(e, t, n) {
                var i = this.slotMap.get(e);
                if (i)
                    return i.pbjsTargetting.hb_adid ? void window.pbjs.renderAd(n, i.pbjsTargetting.hb_adid) : (console.warn("%cPOKI:%c display error - prebid nothing to render", "font-weight: bold", "", e, i.pbjsTargetting),
                    void this.clearAd(t.parentNode))
            }
            ,
            n.prototype.renderAMZNAd = function(e, t, n) {
                var i, o, r = this.slotMap.get(e);
                if (r)
                    return (null === (i = null == r ? void 0 : r.amznTargetting) || void 0 === i ? void 0 : i.amzniid) ? void window.apstag.renderImp(n, null === (o = null == r ? void 0 : r.amznTargetting) || void 0 === o ? void 0 : o.amzniid) : (console.warn("%cPOKI:%c display error - amazon nothing to render", "font-weight: bold", "", e, r.pbjsTargetting),
                    void this.clearAd(t.parentNode))
            }
            ,
            n
        }(ba);
        const xa = ka;
        n(871);
        var _a = function() {
            return _a = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var o in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e
            }
            ,
            _a.apply(this, arguments)
        }
          , Ia = function(e, t, n, i) {
            return new (n || (n = Promise))((function(o, r) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        r(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? o(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Sa = function(e, t) {
            var n, i, o, r = {
                label: 0,
                sent: function() {
                    if (1 & o[0])
                        throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
            return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                return this
            }
            ),
            a;
            function s(s) {
                return function(d) {
                    return function(s) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a && (a = 0,
                        s[0] && (r = 0)),
                        r; )
                            try {
                                if (n = 1,
                                i && (o = 2 & s[0] ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i),
                                0) : i.next) && !(o = o.call(i, s[1])).done)
                                    return o;
                                switch (i = 0,
                                o && (s = [2 & s[0], o.value]),
                                s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return r.label++,
                                    {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    r.label++,
                                    i = s[1],
                                    s = [0];
                                    continue;
                                case 7:
                                    s = r.ops.pop(),
                                    r.trys.pop();
                                    continue;
                                default:
                                    if (!(o = r.trys,
                                    (o = o.length > 0 && o[o.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                        r = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        r.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && r.label < o[1]) {
                                        r.label = o[1],
                                        o = s;
                                        break
                                    }
                                    if (o && r.label < o[2]) {
                                        r.label = o[2],
                                        r.ops.push(s);
                                        break
                                    }
                                    o[2] && r.ops.pop(),
                                    r.trys.pop();
                                    continue
                                }
                                s = t.call(e, r)
                            } catch (e) {
                                s = [6, e],
                                i = 0
                            } finally {
                                n = o = 0
                            }
                        if (5 & s[0])
                            throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, d])
                }
            }
        }
          , Ea = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, o = 0, r = t.length; o < r; o++)
                    !i && o in t || (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , Ca = new uo(co.adTiming)
          , Pa = function() {
            function t() {
                var t, n, i = this;
                this.autoStartOnReady = !1,
                this.refreshNumber = ((t = {})[e.ads.position.preroll] = 0,
                t[e.ads.position.midroll] = 0,
                t[e.ads.position.rewarded] = 0,
                t),
                this.totalRefreshNumber = ((n = {})[e.ads.position.preroll] = 0,
                n[e.ads.position.midroll] = 0,
                n[e.ads.position.rewarded] = 0,
                n),
                this.criteria = {},
                this.handlers = {},
                this.initializingPromise = null,
                this.sdkBooted = !1,
                this.startAdEnabled = !1,
                this.startStartAdsAfterTimerOnInit = !1,
                this.initOptions = {},
                this.adSettings = {
                    blocklist: [],
                    countryExclusion: [],
                    bidderLimitation: {}
                },
                this.videoRequestInFlight = !1,
                this.adReady = !1,
                this.sdkImaError = !1,
                this.displayOnly = !1,
                this.strictConsentMode = !1,
                this.monetizationCoreLoaded = !1,
                this.GPTRejected = !1,
                this.IMARejected = !1,
                this.startLoadingMonetizationCore = function() {
                    return i.loadMonetizationCore()
                }
                ,
                this.configureA9 = function(e) {
                    return Ir(e, i.adSettings.bidderLimitation)
                }
                ,
                this.isAdBlocked = function() {
                    return !1
                }
                ,
                this.sdkNotBootedButCalled = function() {
                    return !(!i.strictConsentMode || i.monetizationCoreLoaded) || !i.strictConsentMode && !i.sdkBooted && (console.error("The Poki SDK was not yet booted"),
                    !0)
                }
                ,
                this.genericCriteria = function() {
                    var e = {};
                    if (e.tag = D.tag,
                    e.site_id = D.siteID,
                    e.categories = decodeURIComponent(D.categories),
                    e.iabcat = D.iabcat,
                    e.source_channel_lp = D.sourceChannelLP,
                    D.cookieDepL && (e.cookieDepL = D.cookieDepL),
                    D.experiment) {
                        var t = decodeURIComponent(D.experiment);
                        e.experiment = t,
                        D.contentGameID && (e.expid_content_gameid = "".concat(t, "|").concat(D.contentGameID))
                    }
                    return D.specialCondition && i.specialConditions && i.specialConditions.includes(D.specialCondition) ? "landing" === D.specialCondition ? e.p4d_game_id_cond = "".concat(D.gameID, "|l") : "crosspromo" === D.specialCondition ? e.p4d_game_id_cond = "".concat(D.gameID, "|cp") : e.p4d_game_id = D.gameID : e.p4d_game_id = D.gameID,
                    e
                }
                ,
                this.runNonIMAVideoHouseAd = function() {
                    U.addVideoDataAnnotations({
                        pokiAdServer: !0
                    });
                    var t = function() {
                        return U.dispatchEvent(e.ads.error, {
                            message: "HouseAd playback error"
                        })
                    };
                    (function() {
                        return fo(this, void 0, void 0, (function() {
                            var e, t, n, i, o, r, a, s, d, c, l, u;
                            return vo(this, (function(p) {
                                switch (p.label) {
                                case 0:
                                    return [4, fetch(go())];
                                case 1:
                                    return [4, p.sent().text()];
                                case 2:
                                    return e = p.sent(),
                                    t = new DOMParser,
                                    n = t.parseFromString(e, "text/xml"),
                                    i = (null === (c = null === (d = n.querySelector("ClickThrough")) || void 0 === d ? void 0 : d.textContent) || void 0 === c ? void 0 : c.trim()) || "",
                                    o = (null === (u = null === (l = n.querySelector("Duration")) || void 0 === l ? void 0 : l.textContent) || void 0 === u ? void 0 : u.trim()) || "00:00:11",
                                    r = o.split(":"),
                                    a = 60 * +r[0] * 60 + 60 * +r[1] + +r[2],
                                    s = "",
                                    n.querySelectorAll("MediaFile").forEach((function(e) {
                                        var t, n = (null === (t = null == e ? void 0 : e.textContent) || void 0 === t ? void 0 : t.trim()) || "";
                                        n.includes("advertisement.h264_high.mp4") && (s = n)
                                    }
                                    )),
                                    D.kioskMode ? [2, {
                                        duration: a,
                                        videoUrl: s
                                    }] : [2, {
                                        clickThrough: i,
                                        duration: a,
                                        videoUrl: s
                                    }]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    )().then((function(e) {
                        try {
                            i.playerSkin.show(),
                            i.playerSkin.startNonIMAFallbackVideo(e)
                        } catch (e) {
                            t()
                        }
                    }
                    )).catch((function() {
                        M.sendMessage(e.message.sendCommand, {
                            event: "adLibrariesNotLoaded"
                        }),
                        t()
                    }
                    ))
                }
                ,
                window.googletag = window.googletag || {
                    cmd: []
                },
                window.pbjs = window.pbjs || {
                    que: []
                },
                this.display = Cr() ? new xa : new ba
            }
            return t.prototype.init = function(e) {
                if (void 0 === e && (e = {}),
                "undefined" != typeof window) {
                    var t = e.onReady
                      , n = void 0 === t ? null : t;
                    if (this.initOptions = e,
                    n && (this.registerHandler("onReady", n),
                    this.registerHandler("onAdblocked", n)),
                    !this.sdkBooted)
                        return this.initializingPromise || ((e.strictConsentMode || D.gdprApplies) && (this.strictConsentMode = !0),
                        this.initializingPromise = this.loadPokiSettings()),
                        this.initializingPromise;
                    console.error("%cPOKI:%c SDK has already been initialized", "font-weight: bold", "")
                }
            }
            ,
            t.prototype.loadPokiSettings = function() {
                var t = this
                  , n = this.initOptions
                  , i = n.debug
                  , o = void 0 === i ? void 0 : i
                  , r = n.logging
                  , a = void 0 === r ? void 0 : r
                  , s = n.wrapper;
                L.init(o, a),
                L.debug && ie(),
                this.setupDefaultEvents(),
                Ki.setupDefaultEvents(),
                Ji(),
                this.playerSkin = new ia({
                    wrapper: s
                }),
                window.addEventListener("resize", this.resizeVideoAd.bind(this), !1);
                var d = la;
                (L.debug || D.isPlayground) && (d = function() {
                    return Promise.resolve()
                }
                );
                var c = D.ccpaApplies
                  , l = void 0 !== this.initOptions.isCCPA ? this.initOptions.isCCPA : "" !== c ? "1" === c : void 0
                  , u = Aa
                  , p = (this.initOptions.country || D.country).toUpperCase();
                p && void 0 !== l && (u = function() {
                    return Promise.resolve({
                        ISO: p,
                        ccpaApplies: l
                    })
                }
                );
                var A = [d(), u()]
                  , h = Ea(Ea([], A, !0), [fa()], !1);
                return Promise.allSettled(h).then((function(n) {
                    var i, o, r;
                    try {
                        var a = n[0]
                          , s = n[1]
                          , d = n[2];
                        if ("fulfilled" === a.status) {
                            var c = a.value;
                            if (c) {
                                D.gameID || B("gameID", c.gameID),
                                c.cachedContentGameID && B("contentGameID", c.cachedContentGameID),
                                t.setAdTimings(c.adTiming),
                                t.specialConditions = c.specialConditions;
                                try {
                                    Gi(c)
                                } catch (e) {
                                    console.warn("%cPOKI:%c error in maybeStartPlaytest", "font-weight: bold", "", e)
                                }
                            }
                            if (!(c && c.gameID || L.debug || (null === window || void 0 === window ? void 0 : window.isPokiPlayground) || "test" === (null === (o = null === (i = null === window || void 0 === window ? void 0 : window.process) || void 0 === i ? void 0 : i.env) || void 0 === o ? void 0 : o.NODE_ENV))) {
                                // console.error("%cALERT", "background-color: red; border-radius: 3px; color: white; padding: 1px 5px", ["Possible Unauthorized Game Hosting Detected❗", "We've noticed that this game, which is part of Poki, is being played on a site that isn't currently allowed.", "If you're a developer who is hosting this game on your site, no worries! Please reach out to us to get your domain approved and we'll hook you up.", "However, if you are hosting this game without proper authorization, be advised: this is a violation of our terms and infringes upon copyright laws. Consider this message as a formal Digital Millennium Copyright Act (DMCA) Takedown Notice. Please remove the game from your site immediately to avoid further action."].join("\n\n"))
                            }
                        }
                        var u = {
                            ISO: "ZZ",
                            ccpaApplies: !1
                        };
                        if ("fulfilled" === s.status && (u = s.value),
                        B("country", (p || (null == u ? void 0 : u.ISO) || "ZZ").toUpperCase()),
                        B("gdprApplies", f(D.country)),
                        B("ccpaApplies", void 0 === l ? (null == u ? void 0 : u.ccpaApplies) || !1 : l),
                        D.gdprApplies && (t.strictConsentMode = !0),
                        oo(),
                        "fulfilled" === d.status) {
                            var A = d.value;
                            A && (t.adSettings = A)
                        }
                        r = t.adSettings.blocklist,
                        _o = r || [],
                        t.strictConsentMode && U.dispatchEvent(e.ready),
                        D.isPlayground || t.loadMonetizationCore()
                    } catch (t) {
                        U.dispatchEvent(e.adblocked, {
                            message: "".concat(t)
                        })
                    }
                }
                )).catch((function(t) {
                    U.dispatchEvent(e.adblocked, {
                        message: "".concat(t)
                    })
                }
                ))
            }
            ,
            t.prototype.loadMonetizationCore = function() {
                return Ia(this, void 0, void 0, (function() {
                    var t, n, i, o, r, a, s, d, c, l, u, p, A, h, m, f, v = this;
                    return Sa(this, (function(g) {
                        switch (g.label) {
                        case 0:
                            return t = this.initOptions,
                            n = t.prebid,
                            i = void 0 === n ? {} : n,
                            o = t.a9Signals,
                            r = void 0 === o ? {} : o,
                            a = t.volume,
                            s = void 0 === a ? 1 : a,
                            d = t.waterfallRetries,
                            c = t.displayOnly,
                            l = void 0 !== c && c,
                            u = _a({}, this.initOptions),
                            p = u.nonPersonalized,
                            A = void 0 !== p && p,
                            h = u.familyFriendly,
                            m = void 0 !== h && h,
                            D.isInspector ? (this.strictConsentMode || U.dispatchEvent(e.ready),
                            [2]) : (A = A || !!D.nonPersonalized,
                            m = m || !!D.familyFriendly,
                            B("nonPersonalized", A),
                            B("familyFriendly", m),
                            f = [],
                            this.displayOnly = l,
                            !this.strictConsentMode || D.familyFriendly ? [3, 2] : [4, new Promise((function(e) {
                                D.gdprApplies && !L.debug || e();
                                var t = 0
                                  , n = function() {
                                    if (!$i)
                                        return t++,
                                        void setTimeout(n, 50 * t);
                                    window.__tcfapi("addEventListener", 2, (function(t, n) {
                                        var i, o;
                                        n && ["tcloaded", "useractioncomplete"].includes(t.eventStatus) && (null === (o = null === (i = null == t ? void 0 : t.purpose) || void 0 === i ? void 0 : i.consents) || void 0 === o ? void 0 : o[1]) && (t.listenerId && window.__tcfapi("removeEventListener", 2, (function() {}
                                        ), t.listenerId),
                                        e())
                                    }
                                    ))
                                };
                                n()
                            }
                            ))]);
                        case 1:
                            g.sent(),
                            g.label = 2;
                        case 2:
                            return f.push(y("./patch/null.js?https://securepubads.g.doubleclick.net/tag/js/gpt.js")),
                            l ? f.push(Promise.resolve()) : f.push(y("./patch/null.js?https://imasdk.googleapis.com/js/sdkloader/ima3.js")),
                            D.familyFriendly || D.nonPersonalized ? (f.push(Promise.resolve(), Promise.resolve(), Promise.resolve()),
                            D.familyFriendly && ba.enforceFamilyFriendlyFlow(),
                            B("nonPersonalized", "true"),
                            ba.enforceNonPersonalized()) : f.push(function() {
                                return x(this, void 0, void 0, (function() {
                                    var e, t, n, i, o, r;
                                    return _(this, (function(a) {
                                        switch (a.label) {
                                        case 0:
                                            return e = D.AYMode,
                                            t = D.country,
                                            D.isPlayground ? e === k.NOT_APPLICABLE || e === k.DISABLED ? [2] : (n = C(),
                                            i = [k.ON, k.PBS_DPF_CSTS, k.DPF_ONLY].includes(e),
                                            o = [k.ON, k.PBS_DPF_CSTS, k.CSTS_ONLY].includes(e),
                                            window.assertive = {
                                                entityId: "WxopjWtNMn2mCEStE",
                                                analytics: {
                                                    integrations: {
                                                        ima: !0
                                                    },
                                                    logUnfilled: !0,
                                                    useHistoryChangeTrigger: !0,
                                                    custom: {
                                                        custom_1: D.experiment,
                                                        custom_2: e
                                                    },
                                                    sampleRate: .1,
                                                    override: {
                                                        normalizeSlotId: function(e, t) {
                                                            return t || e
                                                        }
                                                    }
                                                },
                                                hash: {
                                                    generator: "server",
                                                    values: 1,
                                                    key: "control"
                                                },
                                                reduction: {
                                                    enabled: o,
                                                    limit: {
                                                        percentage: o ? 1 : 0
                                                    }
                                                },
                                                floor: {
                                                    enabled: i,
                                                    addToHashKey: !1,
                                                    currency: "EUR",
                                                    prebid: !0,
                                                    gptHook: !1,
                                                    prebidMinFloor: .03,
                                                    priceBuckets: [{
                                                        min: .03,
                                                        max: .5,
                                                        increment: .01
                                                    }, {
                                                        min: .5,
                                                        max: 2,
                                                        increment: .02
                                                    }, {
                                                        min: 2,
                                                        max: 5.3,
                                                        increment: .05
                                                    }],
                                                    optimizeThreshold: "m_0.4",
                                                    optimizePrebidThreshold: "q_2",
                                                    exploreRate: .1,
                                                    limit: {
                                                        percentage: .9,
                                                        excludeSlotIds: ["video", "rewarded"]
                                                    }
                                                }
                                            },
                                            "US" === t && (window.googletag.cmd.push((function() {
                                                window.googletag.pubads().setTargeting("ay_hb_house", "1")
                                            }
                                            )),
                                            window.assertive.floor.optimizeThreshold = "m_0.3",
                                            window.assertive.floor.optimizePrebidThreshold = "1st_1.2"),
                                            [4, y("https://a.poki-cdn.com/ay/client-v2_1742913016.js")]) : [2];
                                        case 1:
                                            return a.sent(),
                                            n ? [4, y("https://a.poki-cdn.com/ay/s2s-client-v1_1742913017.js")] : [3, 3];
                                        case 2:
                                            a.sent(),
                                            null === (r = null === window || void 0 === window ? void 0 : window.ayS2STag) || void 0 === r || r.init({
                                                orgId: "saWdJc9SuSG9wLYDz",
                                                entityId: "WxopjWtNMn2mCEStE",
                                                bidders: ["openx", "ix", "richaudience", "rubicon", "pubmatic", "sharethrough", "triplelift", "adagio"],
                                                serverOnlyBidders: [],
                                                pbjs: "pbjs",
                                                continent: {
                                                    AF: "AS",
                                                    AL: "EU",
                                                    AQ: "AN",
                                                    DZ: "AF",
                                                    AS: "OC",
                                                    AD: "EU",
                                                    AO: "AF",
                                                    AG: "NA",
                                                    AZ: "AS",
                                                    AR: "SA",
                                                    AU: "OC",
                                                    AT: "EU",
                                                    BS: "NA",
                                                    BH: "AS",
                                                    BD: "AS",
                                                    AM: "AS",
                                                    BB: "NA",
                                                    BE: "EU",
                                                    BM: "NA",
                                                    BT: "AS",
                                                    BO: "SA",
                                                    BA: "EU",
                                                    BW: "AF",
                                                    BV: "AN",
                                                    BR: "SA",
                                                    BZ: "NA",
                                                    IO: "AF",
                                                    SB: "OC",
                                                    VG: "NA",
                                                    BN: "AS",
                                                    BG: "EU",
                                                    MM: "AS",
                                                    BI: "AF",
                                                    BY: "EU",
                                                    KH: "AS",
                                                    CM: "AF",
                                                    CA: "NA",
                                                    CV: "AF",
                                                    KY: "NA",
                                                    CF: "AF",
                                                    LK: "AS",
                                                    TD: "AF",
                                                    CL: "SA",
                                                    CN: "AS",
                                                    TW: "AS",
                                                    CX: "AS",
                                                    CC: "AS",
                                                    CO: "SA",
                                                    KM: "AF",
                                                    YT: "AF",
                                                    CG: "AF",
                                                    CD: "AF",
                                                    CK: "OC",
                                                    CR: "NA",
                                                    HR: "EU",
                                                    CU: "NA",
                                                    CY: "AS",
                                                    CZ: "EU",
                                                    BJ: "AF",
                                                    DK: "EU",
                                                    DM: "NA",
                                                    DO: "NA",
                                                    EC: "SA",
                                                    SV: "NA",
                                                    GQ: "AF",
                                                    ET: "AF",
                                                    ER: "AF",
                                                    EE: "EU",
                                                    FO: "EU",
                                                    FK: "SA",
                                                    GS: "AN",
                                                    FJ: "OC",
                                                    FI: "EU",
                                                    AX: "EU",
                                                    FR: "EU",
                                                    GF: "SA",
                                                    PF: "OC",
                                                    TF: "AF",
                                                    DJ: "AF",
                                                    GA: "AF",
                                                    GE: "AS",
                                                    GM: "AF",
                                                    DE: "EU",
                                                    GH: "AF",
                                                    GI: "EU",
                                                    KI: "OC",
                                                    GR: "EU",
                                                    GL: "NA",
                                                    GD: "NA",
                                                    GP: "NA",
                                                    GU: "OC",
                                                    GT: "NA",
                                                    GN: "AF",
                                                    GY: "SA",
                                                    HT: "NA",
                                                    HM: "AN",
                                                    VA: "EU",
                                                    HN: "NA",
                                                    HK: "AS",
                                                    HU: "EU",
                                                    IS: "EU",
                                                    IN: "AS",
                                                    ID: "AS",
                                                    IR: "AS",
                                                    IQ: "AS",
                                                    IE: "EU",
                                                    IL: "AS",
                                                    IT: "EU",
                                                    CI: "AF",
                                                    JM: "NA",
                                                    JP: "AS",
                                                    KZ: "AS",
                                                    JO: "AS",
                                                    KE: "AF",
                                                    KP: "AS",
                                                    KR: "AS",
                                                    XK: "EU",
                                                    KW: "AS",
                                                    KG: "AS",
                                                    LA: "AS",
                                                    LB: "AS",
                                                    LS: "AF",
                                                    LV: "EU",
                                                    LR: "AF",
                                                    LY: "AF",
                                                    LI: "EU",
                                                    LT: "EU",
                                                    LU: "EU",
                                                    MO: "AS",
                                                    MG: "AF",
                                                    MW: "AF",
                                                    MY: "AS",
                                                    MV: "AS",
                                                    ML: "AF",
                                                    MT: "EU",
                                                    MQ: "NA",
                                                    MR: "AF",
                                                    MU: "AF",
                                                    MX: "NA",
                                                    MC: "EU",
                                                    MN: "AS",
                                                    MD: "EU",
                                                    ME: "EU",
                                                    MS: "NA",
                                                    MA: "AF",
                                                    MZ: "AF",
                                                    OM: "AS",
                                                    NA: "AF",
                                                    NR: "OC",
                                                    NP: "AS",
                                                    NL: "EU",
                                                    CW: "NA",
                                                    AW: "NA",
                                                    SX: "NA",
                                                    BQ: "NA",
                                                    NC: "OC",
                                                    VU: "OC",
                                                    NZ: "OC",
                                                    NI: "NA",
                                                    NE: "AF",
                                                    NG: "AF",
                                                    NU: "OC",
                                                    NF: "OC",
                                                    NO: "EU",
                                                    MP: "OC",
                                                    UM: "OC",
                                                    FM: "OC",
                                                    MH: "OC",
                                                    PW: "OC",
                                                    PK: "AS",
                                                    PS: "AS",
                                                    PA: "NA",
                                                    PG: "OC",
                                                    PY: "SA",
                                                    PE: "SA",
                                                    PH: "AS",
                                                    PN: "OC",
                                                    PL: "EU",
                                                    PT: "EU",
                                                    GW: "AF",
                                                    TL: "AS",
                                                    PR: "NA",
                                                    QA: "AS",
                                                    RE: "AF",
                                                    RO: "EU",
                                                    RU: "EU",
                                                    RW: "AF",
                                                    BL: "NA",
                                                    SH: "AF",
                                                    KN: "NA",
                                                    AI: "NA",
                                                    LC: "NA",
                                                    MF: "NA",
                                                    PM: "NA",
                                                    VC: "NA",
                                                    SM: "EU",
                                                    ST: "AF",
                                                    SA: "AS",
                                                    SN: "AF",
                                                    RS: "EU",
                                                    SC: "AF",
                                                    SL: "AF",
                                                    SG: "AS",
                                                    SK: "EU",
                                                    VN: "AS",
                                                    SI: "EU",
                                                    SO: "AF",
                                                    ZA: "AF",
                                                    ZW: "AF",
                                                    ES: "EU",
                                                    SS: "AF",
                                                    SD: "AF",
                                                    EH: "AF",
                                                    SR: "SA",
                                                    SJ: "EU",
                                                    SZ: "AF",
                                                    SE: "EU",
                                                    CH: "EU",
                                                    SY: "AS",
                                                    TJ: "AS",
                                                    TH: "AS",
                                                    TG: "AF",
                                                    TK: "OC",
                                                    TO: "OC",
                                                    TT: "NA",
                                                    AE: "AS",
                                                    TN: "AF",
                                                    TR: "AS",
                                                    TM: "AS",
                                                    TC: "NA",
                                                    TV: "OC",
                                                    UG: "AF",
                                                    UA: "EU",
                                                    MK: "EU",
                                                    EG: "AF",
                                                    GB: "EU",
                                                    GG: "EU",
                                                    JE: "EU",
                                                    IM: "EU",
                                                    TZ: "AF",
                                                    US: "NA",
                                                    VI: "NA",
                                                    BF: "AF",
                                                    UY: "SA",
                                                    UZ: "AS",
                                                    VE: "SA",
                                                    WF: "OC",
                                                    WS: "OC",
                                                    YE: "AS",
                                                    ZM: "AF",
                                                    XD: "AS",
                                                    XS: "AS"
                                                }[D.country] || "NA",
                                                analytics: !1,
                                                aliasRegistry: null,
                                                suffix: "_s2s",
                                                abPercentage: 100,
                                                customEndpoint: {
                                                    us: "pbs-poki-us",
                                                    eu: "pbs-poki-eu"
                                                }
                                            }),
                                            a.label = 3;
                                        case 3:
                                            return [2]
                                        }
                                    }
                                    ))
                                }
                                ))
                            }(), y("./patch/null.js?https://a.poki-cdn.com/prebid/prebid8.52.2-ay_1738677541.js"), y("./patch/null.js?https://c.amazon-adsystem.com/aax2/apstag.js")),
                            this.display.setupSlotRenderEndedListener(),
                            [2, Promise.allSettled(f).then((function(t) {
                                try {
                                    var n = t[0]
                                      , o = t[1]
                                      , a = t[2]
                                      , c = t[3]
                                      , u = t[4];
                                    "rejected" === n.status && (v.GPTRejected = !0),
                                    "rejected" === a.status && Ki.track(e.tracking.ads.ay.failed, {
                                        reason: H(a.reason),
                                        ayMode: D.AYMode,
                                        gptRejected: "rejected" === n.status,
                                        imaRejected: "rejected" === o.status,
                                        prebidRejected: "rejected" === c.status,
                                        a9Rejected: "rejected" === u.status,
                                        displayOnly: l,
                                        fullStack: D.familyFriendly || D.nonPersonalized ? 0 : 1
                                    }),
                                    Sr(i, v.adSettings.bidderLimitation),
                                    Ir(r, v.adSettings.bidderLimitation),
                                    window.googletag.cmd.push((function() {
                                        googletag.pubads().addEventListener("rewardedSlotReady", (function(t) {
                                            Ki.track(e.tracking.ads.rewardedWeb.ready),
                                            t.makeRewardedVisible()
                                        }
                                        )),
                                        googletag.pubads().addEventListener("rewardedSlotGranted", (function() {
                                            Nr = !0
                                        }
                                        )),
                                        googletag.pubads().addEventListener("rewardedSlotClosed", (function() {
                                            var t, n, i;
                                            Nr ? Ki.track(e.tracking.ads.rewardedWeb.closedGranted) : Ki.track(e.tracking.ads.rewardedWeb.closedDeclined),
                                            (null === (n = null === (t = null === window || void 0 === window ? void 0 : window.location) || void 0 === t ? void 0 : t.toString()) || void 0 === n ? void 0 : n.includes("#goog_rewarded")) && (null === (i = null === window || void 0 === window ? void 0 : window.history) || void 0 === i || i.go(-1)),
                                            U.dispatchEvent(e.ads.completed, {
                                                rewardAllowed: Nr
                                            })
                                        }
                                        )),
                                        googletag.pubads().addEventListener("slotRenderEnded", (function(t) {
                                            var n;
                                            jr() === (null === (n = null == t ? void 0 : t.slot) || void 0 === n ? void 0 : n.getAdUnitPath()) && t.isEmpty && (Ki.track(e.tracking.ads.rewardedWeb.empty),
                                            U.dispatchEvent(e.ads.video.startHouseAdFlow))
                                        }
                                        )),
                                        googletag.pubads().addEventListener("slotRequested", (function(t) {
                                            t || (Ki.track(e.tracking.ads.rewardedWeb.empty),
                                            U.dispatchEvent(e.ads.video.startHouseAdFlow))
                                        }
                                        ))
                                    }
                                    )),
                                    "rejected" === o.status && (v.IMARejected = !0);
                                    var p = _a({}, co);
                                    L.debug && (p.adTiming.startAdsAfter = 0,
                                    v.setAdTimings(p.adTiming));
                                    var A = D.forceAd;
                                    if (A && (v.setAdTimings({
                                        preroll: !0,
                                        timeBetweenAds: 12e4,
                                        timePerTry: 7e3,
                                        startAdsAfter: 0
                                    }),
                                    p.customCriteria = _a(_a({}, p.customCriteria), {
                                        force_ad: A
                                    })),
                                    v.criteria = _a(_a({}, p.customCriteria), {
                                        ay_mode: D.AYMode
                                    }),
                                    v.ima = new sa(s),
                                    v.playerSkin.setupEvents(v),
                                    v.startStartAdsAfterTimerOnInit && Ca.startStartAdsAfterTimer(),
                                    v.waterfall = new Hr(v.ima,{
                                        timing: Ca,
                                        totalRetries: d
                                    }),
                                    v.monetizationCoreLoaded = !0,
                                    v.GPTRejected && v.IMARejected)
                                        return void U.dispatchEvent(e.adblocked, {
                                            message: "Both core sdks failed to boot"
                                        });
                                    v.strictConsentMode || U.dispatchEvent(e.ready)
                                } catch (t) {
                                    U.dispatchEvent(e.adblocked, {
                                        message: "".concat(t)
                                    })
                                }
                            }
                            )).catch((function(t) {
                                console.warn("%cPOKI:%c", "font-weight: bold", "", t),
                                U.dispatchEvent(e.adblocked, {
                                    message: "".concat(t)
                                })
                            }
                            ))]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.requestAd = function(t) {
                var n, i, o, r, a = this;
                void 0 === t && (t = {});
                var s = t.autoStart
                  , d = void 0 === s || s
                  , c = t.onFinish
                  , l = void 0 === c ? null : c
                  , u = t.onStart
                  , p = void 0 === u ? null : u
                  , A = t.position
                  , m = void 0 === A ? null : A
                  , f = U.getVideoDataAnnotations();
                if (Ki.track(m === e.ads.position.rewarded ? e.tracking.screen.rewardedBreak : e.tracking.screen.commercialBreak, f),
                this.videoRequestInFlight) {
                    if (l)
                        try {
                            l({
                                type: e.ads.busy,
                                rewardAllowed: !1
                            })
                        } catch (e) {
                            console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                        }
                } else if (this.videoRequestInFlight = !0,
                this.autoStartOnReady = !1 !== d,
                this.registerHandler("onFinish", (function(e) {
                    if (p && a.deregisterHandler("onStart"),
                    l) {
                        a.deregisterHandler("onFinish");
                        try {
                            l(e)
                        } catch (e) {
                            console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                        }
                    }
                }
                )),
                this.registerHandler("onFinish", (function(t) {
                    if (U.dispatchEvent(e.playtest.stopVideo),
                    l)
                        try {
                            l(t)
                        } catch (e) {
                            console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                        }
                }
                )),
                this.registerHandler("onStart", (function(t) {
                    U.dispatchEvent(e.playtest.startVideo, {
                        position: m
                    }),
                    p && p(t)
                }
                )),
                null !== m && h(m, e.ads.position))
                    if (this.displayOnly)
                        U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                            message: "Video disabled"
                        }));
                    else {
                        if (!this.sdkBooted)
                            return U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                                message: "Requesting ad on unbooted SDK"
                            })),
                            void this.sdkNotBootedButCalled();
                        if ((null === (i = null === (n = this.ima) || void 0 === n ? void 0 : n.isAdRunning) || void 0 === i ? void 0 : i.call(n)) || (null === (r = null === (o = this.waterfall) || void 0 === o ? void 0 : o.isRunning) || void 0 === r ? void 0 : r.call(o)))
                            U.dispatchEvent(e.ads.busy, f);
                        else if (m !== e.ads.position.preroll || Ca.prerollPossible())
                            if (m === e.ads.position.rewarded || Ca.requestPossible())
                                if (m !== e.ads.position.rewarded && this.adSettings.countryExclusion.includes(D.country))
                                    U.dispatchEvent(e.ads.limit, _a(_a({}, f), {
                                        reason: e.info.messages.disabled
                                    }));
                                else {
                                    if (D.kioskMode)
                                        return m === e.ads.position.rewarded ? void this.runNonIMAVideoHouseAd() : void U.dispatchEvent(e.ads.limit, _a(_a({}, f), {
                                            reason: e.info.messages.disabled
                                        }));
                                    if (this.strictConsentMode && !this.monetizationCoreLoaded)
                                        return m === e.ads.position.rewarded || L.debug ? void this.runNonIMAVideoHouseAd() : void U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                                            messaage: "Ad libraries not yet loaded"
                                        }));
                                    if (!this.ima || this.sdkImaError || this.IMARejected)
                                        m === e.ads.position.rewarded ? this.runNonIMAVideoHouseAd() : U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                                            message: "Bot, IMA or Adblocker error"
                                        }));
                                    else if (ro())
                                        U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                                            messaage: "No TCFv2 CMP detected, please contact developersupport@poki.com for more information"
                                        }));
                                    else if (ao())
                                        U.dispatchEvent(e.ads.error, _a(_a({}, f), {
                                            messaage: "No USP detected, please contact developersupport@poki.com for more information"
                                        }));
                                    else if (this.adReady)
                                        U.dispatchEvent(e.ads.ready, f);
                                    else {
                                        var v = _a(_a(_a({}, this.genericCriteria()), this.criteria), {
                                            position: m,
                                            ab: Math.floor(100 * Math.random()).toString(),
                                            refresh_number: this.refreshNumber[m],
                                            total_refresh_number: this.totalRefreshNumber[m]
                                        });
                                        this.refreshNumber[m]++,
                                        this.totalRefreshNumber[m]++,
                                        this.playerSkin.show(),
                                        this.resizeVideoAd(),
                                        this.waterfall.start(v, m)
                                    }
                                }
                            else
                                U.dispatchEvent(e.ads.limit, _a(_a({}, f), {
                                    reason: e.info.messages.timeLimit
                                }));
                        else
                            U.dispatchEvent(e.ads.limit, _a(_a({}, f), {
                                reason: e.info.messages.prerollLimit
                            }))
                    }
                else
                    console.error("%cPOKI:%c invalid position", "font-weight: bold", "")
            }
            ,
            t.prototype.displayAd = function(e) {
                var t = e.container
                  , n = e.size;
                return e.criteria = _a(_a(_a({
                    ab: Math.floor(100 * Math.random()).toString()
                }, this.genericCriteria()), this.criteria), e.criteria || {}),
                e.platformAd && (delete e.criteria.p4d_game_id_cond,
                delete e.criteria.p4d_game_id),
                !D.kioskMode && (L.debug ? (this.display.renderAd(e),
                !0) : this.strictConsentMode && !this.monetizationCoreLoaded ? (console.error("%cPOKI:%c", "font-weight: bold", "", "Ad libraries not yet loaded"),
                !1) : this.GPTRejected ? (console.error("%cPOKI:%c", "font-weight: bold", "", "Bot, IMA or Adblocker error"),
                !1) : ro() ? (console.error("%cPOKI:%c", "font-weight: bold", "", "No TCFv2 CMP detected, please contact developersupport@poki.com for more information"),
                !1) : ao() ? (console.error("%cPOKI:%c", "font-weight: bold", "", "No USP detected, please contact developersupport@poki.com for more information"),
                !1) : n ? this.sdkBooted ? t ? void 0 === window.googletag ? (console.error("%cPOKI:%c", "font-weight: bold", "", "Adblocker has been detected"),
                !1) : this.adSettings.countryExclusion.includes(D.country) ? (console.error("%cPOKI:%c", "font-weight: bold", "", "Country is excluded from ads"),
                !1) : this.display.validateDisplaySettings(n) ? (this.display.renderAd(e),
                !0) : (console.error("%cPOKI:%c", "font-weight: bold", "", "Display size ".concat(n, " is not supported on this device")),
                !1) : (console.error("%cPOKI:%c", "font-weight: bold", "", "Provided container does not exist"),
                !1) : (console.error("%cPOKI:%c", "font-weight: bold", "", "Requesting ad on unbooted SDK"),
                this.sdkNotBootedButCalled(),
                !1) : (console.error("%cPOKI:%c", "font-weight: bold", "", "No ad size given, usage: displayAd(<container>, <size>)"),
                !1))
            }
            ,
            t.prototype.destroyAd = function(e) {
                this.adSettings.countryExclusion.includes(D.country) || (e = e || document.body,
                this.display.clearAd(e))
            }
            ,
            t.prototype.startStartAdsAfterTimer = function() {
                this.sdkNotBootedButCalled() ? this.startStartAdsAfterTimerOnInit = !0 : Ca.startStartAdsAfterTimer()
            }
            ,
            t.prototype.muteAd = function() {
                this.sdkNotBootedButCalled() || this.ima.muteAd()
            }
            ,
            t.prototype.setVolume = function(e) {
                var t;
                this.sdkNotBootedButCalled() || null === (t = this.ima) || void 0 === t || t.setVolume(e)
            }
            ,
            t.prototype.forcePreroll = function() {
                if (!this.sdkNotBootedButCalled()) {
                    var t = Ca.prerollPossible;
                    Ca.prerollPossible = function() {
                        return !0
                    }
                    ,
                    this.requestAd({
                        position: e.ads.position.preroll
                    }),
                    Ca.prerollPossible = t
                }
            }
            ,
            t.prototype.resumeAd = function() {
                this.sdkNotBootedButCalled() || (this.playerSkin.hidePauseButton(),
                this.ima.resumeAd())
            }
            ,
            t.prototype.startAdClicked = function() {
                this.sdkNotBootedButCalled() || an() && this.startAdEnabled && (this.startAdEnabled = !1,
                this.playerSkin.hideStartAdButton(),
                this.ima.startIOSPlayback())
            }
            ,
            t.prototype.stopVideoAd = function() {
                this.playerSkin.hide(),
                U.dispatchEvent(e.ads.stopped),
                this.sdkNotBootedButCalled() || (this.waterfall.stopWaterfall(),
                this.ima.stopPlayback(),
                Pr && googletag.destroySlots([Pr]))
            }
            ,
            t.prototype.resizeVideoAd = function() {
                var e = this;
                if (!this.sdkNotBootedButCalled() && this.ima) {
                    var t = this.playerSkin.getVideoBounds();
                    if (0 === t.width || 0 === t.height)
                        return this.resizeTimeout && clearTimeout(this.resizeTimeout),
                        void (this.resizeTimeout = setTimeout((function() {
                            e.resizeVideoAd()
                        }
                        ), 100));
                    this.ima.resize(t.width, t.height)
                }
            }
            ,
            t.prototype.setAdTimings = function(t) {
                var n;
                void 0 === t && (t = {}),
                this.refreshNumber = ((n = {})[e.ads.position.preroll] = 0,
                n[e.ads.position.midroll] = 0,
                n[e.ads.position.rewarded] = 0,
                n),
                Ca.setTimings(t),
                Ca.resetAll()
            }
            ,
            t.prototype.setSpecialConditions = function(e) {
                this.specialConditions = e || []
            }
            ,
            t.prototype.startAd = function() {
                if (!this.sdkNotBootedButCalled())
                    if (this.adReady)
                        try {
                            this.resizeVideoAd(),
                            this.ima.startPlayback() || this.stopVideoAd()
                        } catch (t) {
                            U.dispatchEvent(e.ads.error, {
                                message: "Playback error"
                            })
                        }
                    else
                        U.dispatchEvent(e.ads.error, {
                            message: "No ads ready to start"
                        })
            }
            ,
            t.prototype.registerHandler = function(e, t) {
                this.handlers[e] = t
            }
            ,
            t.prototype.callHandler = function(e, t) {
                void 0 === t && (t = void 0),
                "function" == typeof this.handlers[e] && this.handlers[e](t)
            }
            ,
            t.prototype.setupDefaultEvents = function() {
                var t = this;
                U.addEventListener(e.ready, (function() {
                    t.sdkBooted = !0,
                    t.setVolume(.6),
                    t.callHandler("onReady")
                }
                )),
                U.addEventListener(e.adblocked, (function() {
                    t.sdkBooted = !0,
                    t.sdkImaError = !0
                }
                )),
                U.addEventListener(e.ads.ready, (function() {
                    t.adReady = !0,
                    t.autoStartOnReady && t.startAd()
                }
                )),
                U.addEventListener(e.ads.started, (function() {
                    t.playerSkin.hideSpinner(),
                    t.callHandler("onStart", {
                        type: e.ads.limit
                    })
                }
                )),
                U.addEventListener(e.ads.video.paused, (function() {
                    t.playerSkin.showPauseButton()
                }
                )),
                U.addEventListener(e.ads.video.error, (function() {
                    var t, n = U.getVideoDataAnnotations();
                    (null == n ? void 0 : n.HBVastUrl) && (t = null == n ? void 0 : n.HBVastUrl,
                    y("https://a.poki.com/ads/vast-client-2.js", !0).then((function() {
                        if (window.VASTClient)
                            try {
                                var n = []
                                  , i = new window.VASTClient;
                                i.getParser().on("VAST-resolved", (function(e) {
                                    n.push(e)
                                }
                                )),
                                i.get(t).then((function() {
                                    U.dispatchEvent(e.ads.extendedVideoError, {
                                        vastChain: JSON.stringify(n),
                                        vastResolved: !0
                                    })
                                }
                                )).catch((function(t) {
                                    U.dispatchEvent(e.ads.extendedVideoError, {
                                        vastChain: JSON.stringify(n),
                                        vastResolved: !1,
                                        vastResolveErr: JSON.stringify(t)
                                    })
                                }
                                ))
                            } catch (e) {
                                console.warn("%cPOKI:%c Error parsing VAST", "font-weight: bold", "", e)
                            }
                    }
                    )).catch((function() {}
                    )))
                }
                )),
                U.addEventListener(e.ads.limit, (function() {
                    t.videoRequestInFlight = !1,
                    t.callHandler("onFinish", {
                        type: e.ads.limit,
                        rewardAllowed: !1
                    })
                }
                )),
                U.addEventListener(e.ads.stopped, (function() {
                    t.videoRequestInFlight = !1,
                    t.callHandler("onFinish", {
                        type: e.ads.stopped,
                        rewardAllowed: !1
                    })
                }
                )),
                U.addEventListener(e.ads.error, (function(n) {
                    t.videoRequestInFlight = !1,
                    t.callHandler("onFinish", {
                        type: e.ads.error,
                        rewardAllowed: !!n.rewardAllowed
                    })
                }
                )),
                U.addEventListener(e.ads.busy, (function() {
                    t.videoRequestInFlight = !1,
                    t.callHandler("onFinish", {
                        type: e.ads.busy,
                        rewardAllowed: !1
                    })
                }
                )),
                U.addEventListener(e.ads.completed, (function(n) {
                    t.videoRequestInFlight = !1,
                    t.callHandler("onFinish", {
                        type: e.ads.completed,
                        rewardAllowed: !!n.rewardAllowed
                    })
                }
                )),
                [e.ads.limit, e.ads.stopped, e.ads.error, e.ads.completed].forEach((function(e) {
                    U.addEventListener(e, (function() {
                        t.playerSkin && t.playerSkin.hide(),
                        t.adReady = !1
                    }
                    ))
                }
                ))
            }
            ,
            t.prototype.deregisterHandler = function(e) {
                delete this.handlers[e]
            }
            ,
            t.prototype.setNrAds = function(e, t) {
                var n;
                this.sdkBooted && (null === (n = null == this ? void 0 : this.playerSkin) || void 0 === n || n.setNrAds(e, t))
            }
            ,
            t
        }();
        var Ta = new fi(new Pa);
        for (var Ba in Ta)
            window.PokiSDK[Ba] = Ta[Ba]
    }
    )()
}
)();
