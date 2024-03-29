// ==UserScript==
// @name         dlive: enable timestamps
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/dlive_enable_timestamps.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/dlive_enable_timestamps.user.js
// @version      0.3
// @description  Turn timestamps in the comment section into seekable links, similar to how YouTube does it.
// @author       CoeJoder
// @match        *://dlive.tv/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.0/dist/GM_wrench.min.js
// ==/UserScript==

// TODO works for replays; enable for clips too

(function() {

    function isReplayPage() {
        return window.location.pathname.startsWith("/p/");
    }
    
    // replaces the text timestamps in comments with seek-buttons
    function processComments(replayComment) {
        let replaced = false;
        const html = replayComment.innerHTML.replace(/(?:(\d+):)?(\d+):(\d+)/, (match, h, m, s, offset, string) => {
            replaced = true;
            h = parseInt(h || "0");
            m = parseInt(m);
            s = parseInt(s);
            const seekTo = h*3600 + m*60 + s;
            return `<button onclick="const vid = document.querySelector('video.dplayer-video');
                    vid.currentTime = ${seekTo}; vid.play();">${match}</button>`;
        });
        if (replaced) {
            replayComment.innerHTML = html;
        }
    }
    
    // polls the page in a timeout loop until comments are loaded, then processes them
    function loadAndProcessComments() {
        const commentsSelector = ".font-subtitle.mt-3 div";
        const waitOnce = true;
        const interval = 200;
        GM_wrench.waitForKeyElements(commentsSelector, processComments, waitOnce, interval);
    }
    
    // check if the starting page is a replay page
    if (isReplayPage()) {
        loadAndProcessComments();
    }
    
    // handle AJAX-loaded replay pages
    // required even if starting page is a replay page in order to handle future navigations
    let prevHref = document.location.href;
    window.addEventListener("load", (event) => {
        const bodyList = document.querySelector("body");
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (prevHref != document.location.href) {
                    prevHref = document.location.href;
                    if (isReplayPage()) {
                        loadAndProcessComments();
                    }
                }
            });
        });
        const config = {
            childList: true,
            subtree: true
        };
        observer.observe(bodyList, config);
    });
})();
