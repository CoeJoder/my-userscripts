// ==UserScript==
// @name         Google Voice
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/google-voice.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/google-voice.user.js
// @version      0.3
// @description  Applies a dark theme based on google.com results style.
// @author       CoeJoder
// @match        *://voice.google.com/*
// @icon         https://fonts.gstatic.com/s/i/productlogos/voice_2020q4/v1/web-32dp/logo_voice_2020q4_color_1x_web_32dp.png
// @resource     IMPORTED_CSS https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts@278d5412/google-voice.user.js.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==
const IMPORTED_CSS = GM_getResourceText('IMPORTED_CSS');

const TARGET_PATHNAMES = Object.freeze([
  '/u/0/',
  '/u/0/calls',
  '/u/0/messages',
  '/u/0/voicemail',
]);

let styleElm = null;
const onPathnameChange = () => {
  if (TARGET_PATHNAMES.includes(document.location.pathname)) {
    if (styleElm === null) {
      styleElm = GM_addStyle(IMPORTED_CSS);
    }
  } else {
    styleElm?.remove();
    styleElm = null;
  }
};

onPathnameChange();

let oldPathname = document.location.pathname;
const observer = new MutationObserver(_ => {
  if (oldPathname !== document.location.pathname) {
    oldPathname = document.location.pathname;
    onPathnameChange();
  }
});
observer.observe(document.querySelector('body'), {
  childList: true,
  subtree: true,
});
