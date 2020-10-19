// ==UserScript==
// @name         YouTube: remove propaganda box
// @namespace    https://www.youtube.com
// @version      0.1
// @description  Removes the propaganda box that Big Brother places under "controversial" videos.
// @author       CoeJoder
// @match        *://www.youtube.com/watch?*
// @grant        none
// ==/UserScript==

const box = document.querySelector("#clarify-box");
if (box) {
    box.remove();
}
