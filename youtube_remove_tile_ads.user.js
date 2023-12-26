// ==UserScript==
// @name         Youtube remove tile ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @version      0.1
// @description  Removes tile ads and replaces them with a based meme image
// @author       CoeJoder
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        GM.getResourceUrl
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// @resource     absolutely_comped https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/resources/images/absolutely_comped.png
// ==/UserScript==
(async function({isCssSelectorSupported, addCss}) {

	if (!isCssSelectorSupported(':has(x)')) {
		throw new Error("Browser does not support the ':has(x)' pseodoselector, please upgrade.");
	}

	const absolutely_comped = await GM.getResourceUrl('absolutely_comped');

	addCss(`
		/* Replaces ad tiles with ABSOLUTELY COMPED meme */
	
		ytd-ad-slot-renderer {
			display: none;
		}
		.ytd-rich-item-renderer:has(> ytd-ad-slot-renderer) {
			background-repeat: no-repeat;
			background-attachment: inherit;
			background-position: bottom; 
			background-image: url("${absolutely_comped}")
		}
	`);
})(GM_wrench);
