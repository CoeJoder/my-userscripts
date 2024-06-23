// ==UserScript==
// @name         rumble: enable timestamps
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/rumble_enable_timestamps.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/rumble_enable_timestamps.user.js
// @version      0.3
// @description  Turn timestamps in the comment section into seekable links, similar to how YouTube does it.
// @author       CoeJoder
// @match        *://rumble.com/*.html
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.5/dist/GM_wrench.min.js
// @icon         https://www.google.com/s2/favicons?domain=rumble.com
// ==/UserScript==

(function() {

    //TODO pretty close, just need a way to unmute programmatically

    const commentsSelector = ".comment-text";
    const waitOnce = true;
    const interval = 200;

    // replaces the text timestamps in comments with seek-buttons
    const processComment = (replayComment) => {
        let replaced = false;
        const html = replayComment.innerHTML.replace(/(?:(\d+):)?(\d+):(\d+)/, (match, h, m, s, offset, string) => {
            replaced = true;
            h = parseInt(h || "0");
            m = parseInt(m);
            s = parseInt(s);
            const seekTo = h*3600 + m*60 + s;
            return `<a href="#" style='color: #37c;' onclick="const vid = document.querySelector('video');
                    vid.muted = false; vid.volume = 1; vid.currentTime = ${seekTo}; vid.play();">${match}</a>`;
        });
        if (replaced) {
            replayComment.innerHTML = html;
        }
    };

    GM_wrench.waitForKeyElements(commentsSelector, processComment, waitOnce, interval);
})();
