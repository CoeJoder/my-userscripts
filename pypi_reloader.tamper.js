// ==UserScript==
// @name         pypi.org: page reloader
// @namespace    https://pypi.org/
// @version      0.1
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
