// ==UserScript==
// @name         YouTube: auto-skip ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/youtube_autoskip_ads.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/youtube_autoskip_ads.user.js
// @version      0.2
// @description  Stealthily skips skippable ads on YouTube videos.
// @author       CoeJoder
// @match        *://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// @grant        none
// ==/UserScript==

(async function({ sleep, wait, until, By }) {

  const DEBUG = true;
  const tag = (str) => `[${GM_info.script.name}] ${str}`;
  const log = (str) => console.log(tag(str));
  const debug = (str) => DEBUG ? console.log(tag(str)) : undefined;
  const error = (str) => console.error(tag(str));
  log("Userscript loaded");

  // Strategy:
  // Although the 'Skip' button exists immediately once an ad begins playing,
  // wait until it is displayed to click it, so as to avoid adblock detection.

  const POLL_INTERVAL_LONG = 5000;
  const POLL_INTERVAL_SHORT = 500;
  const AD_SKIP_BUTTON_CSS = ".ytp-ad-skip-button-text";
  const AD_SKIP_BUTTON_CONTAINER_CSS = ".ytp-ad-skip-button-container";
  const MAX_ERRORS = 3;

  const isSkipButtonDisplayed = () => {
    debug("Waiting for 'Skip' to be displayed...");
    // check 'Skip' button's container for visibility
    const skipButtonContainer = document.querySelector(AD_SKIP_BUTTON_CONTAINER_CSS);
    return skipButtonContainer !== null &&
      	window.getComputedStyle(skipButtonContainer).display !== "none";
  };

  // stay running to handle all ads; abort if too many errors
  let errCount = 0;
  while (errCount < MAX_ERRORS) {
    try {
      // long-poll until ad is detected
      const skipButton = await wait({
        condition: until.elementLocated(By.css(AD_SKIP_BUTTON_CSS)),
        pollTimeout: POLL_INTERVAL_LONG,
      });

      debug("Ad found. Waiting for 'Skip' to be displayed...");
      // short-poll until 'Skip' is displayed
      await wait({
        condition: isSkipButtonDisplayed,
        pollTimeout: POLL_INTERVAL_SHORT,
      });
      
      if (skipButton === null) {
        throw new Error(tag("'Skip' button not found"));
      }
      debug("Clicking 'Skip' button...");
      skipButton.click();
    } catch (e) {
      error(e.message);
      errCount++;
    }

    // throttling
    await sleep(POLL_INTERVAL_LONG);
  }
  error(`Exceeded max-error count (${errCount}). Aborting...`);
})(GM_wrench);

