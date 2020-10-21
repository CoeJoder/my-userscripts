// ==UserScript==
// @name         Proxmox style
// @namespace    https://www.proxmox.com
// @version      0.2
// @description  Improve text readability.
// @author       CoeJoder
// @match        https://www.proxmox.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.0/dist/GM_wrench.min.js
// ==/UserScript==

(function() {
    GM_wrench.addCss(`
        * {
            color: lightgray;
            background-color: darkslategray;
        }
    `);
})();