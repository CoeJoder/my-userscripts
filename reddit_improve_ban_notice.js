// ==UserScript==
// @name         Reddit: improve ban notice
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/reddit_improve_ban_notice.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/reddit_improve_ban_notice.js
// @version      0.1
// @description  Changes the ban notice to be a nicer color, and provides the reason for the ban.
// @author       CoeJoder
// @match        *://*.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=reddit.com
// ==/UserScript==
(() => {
	const banReason = "**WARNING** REDDIT ADMINS ARE POMPOUS AND FAGGY!! **WARNING**";
	const banColor = 'green';
	let globalFaceplate = document.querySelector('faceplate-tracker[source=global]');
	if (JSON.parse(globalFaceplate?.dataset?.faceplateTrackingContext)?.banner?.id === 'account_suspended') {
		const globalFaceplateBanner = globalFaceplate.querySelector('faceplate-banner');
		globalFaceplateBanner.setAttribute('msg', banReason);
		if (globalFaceplateBanner?.shadowRoot !== null && typeof CSSStyleSheet === 'function') {
			const sheet = new CSSStyleSheet();
			sheet.replace(`
				.banner.error {
					background-color: ${color} !important;
				}
				#banner-text {
					font-weight: bold;
				}
			`);
			globalFaceplateBanner.querySelector('a.button').style.backgroundColor = color;
			globalFaceplateBanner.shadowRoot.adoptedStyleSheets.push(sheet);
		}
	}
})();
