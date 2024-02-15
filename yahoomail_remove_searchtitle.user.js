// ==UserScript==
// @name         Yahoo! mail remove search title
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/yahoomail_remove_searchtitle.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/yahoomail_remove_searchtitle.user.js
// @version      0.2
// @description  Removes the magnifying glass popup when hovering an email subject
// @author       CoeJoder
// @match        https://mail.yahoo.com/*
// @icon         https://www.google.com/s2/favicons?domain=mail.yahoo.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// ==/UserScript==
(async function ({ addCss }) {
	addCss(`
	button[title="Search for messages with this subject"] {
		display: none !important;
	}
	`);
})(GM_wrench);
