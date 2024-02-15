// ==UserScript==
// @name         pypi.org: page reloader
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/pypi_reloader.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/pypi_reloader.user.js
// @version      0.2
// @description  Reloads the page immediately so that proper Dark Reader styling is applied.
// @author       CoeJoder
// @match        *://pypi.org/*
// @grant        none
// ==/UserScript==
(() => {
    const FLAG_NAME = encodeURIComponent("pageReloadFlag_" + location.pathname);
    if (localStorage.getItem(FLAG_NAME) == null) {
        localStorage.setItem(FLAG_NAME, true);
        location.reload();
    } else {
        localStorage.removeItem(FLAG_NAME);
    }
})();
