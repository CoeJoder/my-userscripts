// ==UserScript==
// @name         Youtube remove tile ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/youtube_remove_tile_ads.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/youtube_remove_tile_ads.user.js
// @version      0.3
// @description  Removes tile ads and replaces them with a based meme image
// @author       CoeJoder
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        GM.getResourceUrl
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// @resource     absolutely_comped https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/resources/images/absolutely_comped.png
// ==/UserScript==
(async function ({ isCssSelectorSupported, addCss }) {

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
            opacity: 0.5;
			background-repeat: no-repeat;
			background-attachment: inherit;
			background-position: bottom; 
			background-image: url("${absolutely_comped}");
		}
	`);
})(GM_wrench);
