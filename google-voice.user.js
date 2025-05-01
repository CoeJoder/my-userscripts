// ==UserScript==
// @name         Google Voice
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/google-voice.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/google-voice.user.js
// @version      0.1
// @description  Applies a dark theme based on google.com results style.
// @author       CoeJoder
// @match        *://voice.google.com/u/0/calls
// @match        *://voice.google.com/u/0/messages
// @match        *://voice.google.com/u/0/voicemail
// @icon         https://fonts.gstatic.com/s/i/productlogos/voice_2020q4/v1/web-32dp/logo_voice_2020q4_color_1x_web_32dp.png
// @resource     IMPORTED_CSS https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/google-voice.user.js.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==

GM_addStyle(GM_getResourceText('IMPORTED_CSS'));
