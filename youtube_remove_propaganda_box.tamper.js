// ==UserScript==
// @name         YouTube: remove propaganda box
// @namespace    https://www.youtube.com
// @version      0.1
// @description  Removes the propaganda box that Big Brother places under "controversial" videos.
// @author       CoeJoder
// @match        *://www.youtube.com/watch?*
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.1/dist/GM_wrench.min.js
// @grant        none
// ==/UserScript==

const PROPAGANDA_BOX_CSS = "#clarify-box";

// remove it initially right away
const box = document.querySelector(PROPAGANDA_BOX_CSS);
if (box) {
    box.remove();
}

// box might reappear due to in-page navigation,
// check every 3 seconds for it to reappear
const waitOnce = false;
const interval = 3000;
GM_wrench.waitForKeyElements(PROPAGANDA_BOX_CSS, (box) => {
    box.remove();
}, waitOnce, interval);
