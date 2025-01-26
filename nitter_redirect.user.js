// ==UserScript==
// @name         Nitter.net Redirect
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/nitter_redirect.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/nitter_redirect.user.js
// @description  Redirect all X/Twitter links through a Nitter instance
// @match        https://x.com/*
// @match        https://twitter.com/*
// @version      1.2
// @run-at       document-start
// @author       CoeJoder
// @grant        none
// ==/UserScript==

// known working Nitter instances
const NITTER_POAST_ORG = 'https://nitter.poast.org';
const NITTER_XCANCEL_COM = 'https://xcancel.com';

// xcancel.com seems quickest and works with embedded media
const SELECTED_NITTER_INSTANCE = NITTER_XCANCEL_COM;

window.location.replace(SELECTED_NITTER_INSTANCE + window.location.pathname + window.location.search);
