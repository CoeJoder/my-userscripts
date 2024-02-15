// ==UserScript==
// @name         Proxmox style
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/proxmox_style.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/proxmox_style.user.js
// @version      0.3
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
