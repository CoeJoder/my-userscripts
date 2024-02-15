// ==UserScript==
// @name         Yahoo! mail remove search title
// @namespace    https://github.com/CoeJoder/my-userscripts
// @version      0.1
// @description  Removes the magnifying glass popup when hoving an email subject
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
