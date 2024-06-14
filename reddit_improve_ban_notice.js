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
	/*
	TODO this script has some kinks in it, such as not dealing with in-page navigation.
	Can be fixed but for now just refresh page to have the changes applied
	*/
	const banReason = "**WARNING** REDDIT ADMINS ARE POMPOUS AND FAGGY!! **WARNING**";
	const banColor = 'green';
	let globalFaceplate = document.querySelector('faceplate-tracker[source=global]');
	if (JSON.parse(globalFaceplate?.dataset?.faceplateTrackingContext)?.banner?.id === 'account_suspended') {
		const globalFaceplateBanner = globalFaceplate.querySelector('faceplate-banner');
		globalFaceplateBanner.setAttribute('msg', banReason);
		if (globalFaceplateBanner?.shadowRoot !== null && typeof CSSStyleSheet === 'function') {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(`
				.banner.error {
					background-color: ${banColor} !important;
				}
				#banner-text {
					font-weight: bold;
				}
			`);
			globalFaceplateBanner.shadowRoot.adoptedStyleSheets.push(sheet);
			const inboxButton = globalFaceplateBanner.querySelector('a.button');
			if (inboxButton !== null) {
				inboxButton.style.backgroundColor = banColor;
			}
		}
	}
})();
