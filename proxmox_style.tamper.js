// ==UserScript==
// @name         Proxmox style
// @namespace    https://www.proxmox.com
// @version      0.1
// @description  Improve text readability.
// @author       CoeJoder
// @match        https://www.proxmox.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/userscriptUtils.js@v1.0/userscriptUtils.js
// ==/UserScript==

(function() {
    const utils = new UserscriptUtils();

    utils.addCss(`
        * {
            color: lightgray;
            background-color: darkslategray;
        }
    `);
})();