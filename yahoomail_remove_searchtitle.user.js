// ==UserScript==
// @name         Yahoo! mail remove search title and ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/yahoomail_remove_searchtitle.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/yahoomail_remove_searchtitle.user.js
// @version      0.3
// @description  Removes the magnifying glass popup when hovering an email subject, and ad rows.
// @author       CoeJoder
// @match        https://mail.yahoo.com/*
// @icon         https://www.google.com/s2/favicons?domain=mail.yahoo.com
// @resource     absolutely_comped https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/resources/images/absolutely_comped.png
// @grant        GM.addStyle
// ==/UserScript==

GM.addStyle(`
	button[title="Search for messages with this subject"] {
		display: none !important;
	}

  li:has(> div > [data-test-id^="pencil-ad-messageList"]) {
		display: none !important;
  }
`);
