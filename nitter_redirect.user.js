// ==UserScript==
// @name         Nitter.net Redirect
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/nitter_redirect.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/nitter_redirect.user.js
// @description  Always redirects to nitter.net
// @include      *://twitter.com/*
// @version      1.1
// @run-at       document-start
// @author       CoeJoder
// @grant        none
// ==/UserScript==

window.location.replace("https://nitter.moomoo.me" + window.location.pathname + window.location.search);
