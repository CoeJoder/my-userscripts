// ==UserScript==
// @name         Nitter.net Redirect
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/nitter_redirect.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/nitter_redirect.user.js
// @description  Always redirects to nitter.net
// @match        https://x.com/*
// @match        https://twitter.com/*
// @version      1.2
// @run-at       document-start
// @author       CoeJoder
// @grant        none
// ==/UserScript==

// this seems to be the last working Nitter instance...
const NITTER_INSTANCE = 'https://nitter.poast.org'

window.location.replace(NITTER_INSTANCE + window.location.pathname + window.location.search);
