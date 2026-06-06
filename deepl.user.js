// ==UserScript==
// @name        DeepL
// @namespace   https://github.com/CoeJoder/my-userscripts
// @homepageURL https://github.com/CoeJoder/my-userscripts/blob/master/deepl.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/deepl.user.js
// @version     0.1
// @description Dark mode for deepl.com
// @author      CoeJoder
// @match       *://www.deepl.com/*
// @icon        https://www.google.com/s2/favicons?domain=deepl.com/
// @resource    IMPORTED_CSS https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts@76938342/deepl.user.js.css
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @run-at      document-body
// ==/UserScript==

GM_addStyle(GM_getResourceText('IMPORTED_CSS'));
 