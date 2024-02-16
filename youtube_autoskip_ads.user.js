// ==UserScript==
// @name         YouTube: auto-skip ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/youtube_autoskip_ads.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/youtube_autoskip_ads.user.js
// @version      0.1
// @description  Stealthily skips skippable ads on YouTube videos.
// @author       CoeJoder
// @match        *://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// @grant        none
// ==/UserScript==

(async function({ waitForKeyElements, wait }) {

	const tag = (str) => `[${GM_info.script.name}] ${str}`;
	const log = (str) => console.log(tag(str));
	log("Script loaded");

	// Strategy:
	// Although the 'Skip' button exists immediately once an ad begins playing,
	// wait until it is displayed to click it, so as to avoid adblock detection.
	//   [outer loop] wait for the 'Skip' button to exist
	//   [inner loop] wait for the 'Skip' button to be visible

	// When ad appears, countdown until 'Skip' displays is about 5 seconds.
	// Outer-loop < 2x countdown
	// Outer-loop > inner-loop > countdown 
	const OUTER_INTERVAL = 7000;
	const INNER_INTERVAL = 6000;
	const INNER_POLL = 100;

	// handle ads throughout the video, not just the first one
	const OUTER_JUST_ONCE = false;
	
	// `display` is actually toggled on 'Skip' button's container
	const isDisplayed = (skipButtonContainer) => 
			window.getComputedStyle(skipButtonContainer).display !== "none";
	
	// CSS selectors
	const AD_SKIP_BUTTON_CSS = ".ytp-ad-skip-button-text";
	const AD_SKIP_BUTTON_CONTAINER_CSS = ".ytp-ad-skip-button-container";
	
	// outer-wait for an ad to appear, repeated indefinitely
	waitForKeyElements(AD_SKIP_BUTTON_CONTAINER_CSS, (skipButtonContainer) => {

		log("Ad encountered.  Waiting for 'Skip' button to appear...");
		// inner-wait for the 'Skip' button to be visible, once
		wait({
			condition: isDisplayed,
			input: skipButtonContainer,
			timeout: INNER_INTERVAL,
			pollTimeout: INNER_POLL,
			message: tag("Timed out waiting for 'Skip' button to appear"),
		}).then(() => {
			const skipButton = document.querySelector(AD_SKIP_BUTTON_CSS);
			if (skipButton === null) {
				throw new Error(tag("'Skip' button not found"));
			}
			log("Clicking 'Skip' button...");
			skipButton.click();
		});

	}, OUTER_JUST_ONCE, OUTER_INTERVAL);

})(GM_wrench);

