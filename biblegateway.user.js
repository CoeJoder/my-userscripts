// ==UserScript==
// @name        BibleGateway
// @namespace   https://github.com/CoeJoder/my-userscripts
// @homepageURL https://github.com/CoeJoder/my-userscripts/blob/master/biblegateway.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/biblegateway.user.js
// @version     0.1
// @description Dark mode for biblegateway.com
// @author      CoeJoder
// @match       *://www.biblegateway.com/*
// @icon        https://www.google.com/s2/favicons?domain=biblegateway.com/
// @resource    IMPORTED_CSS https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts@cd1d4579/biblegateway.user.js.css
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @run-at      document-body
// ==/UserScript==

GM_addStyle(GM_getResourceText('IMPORTED_CSS'));
