// ==UserScript==
// @name               Nitter.net Redirect
// @namespace          https://github.com/CoeJoder/my-userscripts/blob/master/nitter_redirect.tamper.js
// @description        Always redirects to nitter.net
// @include            *://twitter.com/*
// @version            1.0
// @run-at             document-start
// @author             CoeJoder
// @grant              none
// ==/UserScript==

window.location.replace("https://nitter.net" + window.location.pathname + window.location.search);
