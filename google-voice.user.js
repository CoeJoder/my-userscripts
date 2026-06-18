// ==UserScript==
// @name         Google Voice
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/google-voice.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/google-voice.user.js
// @version      0.4
// @description  Forcibly enables the hidden "dark theme" feature of Google Voice.
// @author       CoeJoder
// @match        *://voice.google.com/*
// @icon         https://fonts.gstatic.com/s/i/productlogos/voice_2020q4/v1/web-32dp/logo_voice_2020q4_color_1x_web_32dp.png
// @resource     IMPORTED_CSS https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts@9c7049c4/google-voice.user.js.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==
GM_addStyle(GM_getResourceText('IMPORTED_CSS'));
