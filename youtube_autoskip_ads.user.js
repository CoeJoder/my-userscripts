// ==UserScript==
// @name         YouTube: auto-skip ads
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/youtube_autoskip_ads.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/youtube_autoskip_ads.user.js
// @version      0.3
// @description  Stealthily skips skippable ads on YouTube videos.
// @author       CoeJoder
// @match        *://www.youtube.com/
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.4/dist/GM_wrench.min.js
// @grant        GM.notification
// ==/UserScript==

// TODO move `Logger` to GM_wrench project
(() => {
  function Logger(opts) {
    opts = { ...Logger._DEFAULT_OPTS, ...opts };
    if (!(opts.level in Logger._LEVELS)) {
      throw new Error("Invalid log level: " + opts.level);
    }
    if (typeof opts.formatter !== 'function') {
      throw new Error("Invalid formatter; expected function");
    }

    const check = (level) => Logger._LEVELS[level] >= Logger._LEVELS[opts.level];

    this.trace = (str) => check('trace') ? console.log(opts.formatter(str, 'trace', opts.prefix)) : undefined;
    this.debug = (str) => check('debug') ? console.log(opts.formatter(str, 'debug', opts.prefix)) : undefined;
    this.info = (str) => check('info') ? console.log(opts.formatter(str, 'info', opts.prefix)) : undefined;
    this.warn = (str) => check('warn') ? console.warn(opts.formatter(str, 'warn', opts.prefix)) : undefined;
    this.error = (str) => check('error') ? console.error(opts.formatter(str, 'error', opts.prefix)) : undefined;
    this.fatal = (str) => check('fatal') ? console.error(opts.formatter(str, 'fatal', opts.prefix)) : undefined;
  }
  Logger._LEVELS = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  };
  Logger._DEFAULT_OPTS = {
    level: 'info',
    prefix: GM_info.script.name,
    formatter: (msg, level, prefix) =>
        `${prefix !== null ? `[${prefix}]` : ''}[${level.toUpperCase()}] ${msg}`,
  };
  GM_wrench.Logger = Logger;
})();

(async function({ sleep, wait, TimeoutError, Logger }) {

  const logger = new Logger();
  logger.info("Userscript loaded");

  // Strategy:
  // The script will run on the homepage & watchpages in an infinite loop to handle
  // in-page navigation to (other) videos and multiple ads within a single video.
  //
  // Although the 'Skip' button exists immediately once an ad begins playing,
  // wait until it is displayed i.e. countdown has completed, to click it as to avoid
  // adblock detection.  Extended waiting periods e.g. when a video is paused while
  // an ad is displayed, will have their polling intervals increased to reduce page load.

  // Algorithm:
  // 1) Infinite loop (until error threshold=3 is met):
  //   A) 5-second poll for ad to be displayed
  //   B) 0.5-second poll, up to 10-seconds, for 'Skip' to be displayed (or ad to be over), click it if exists
  //   C) if timeout:
  //     C1) if ad is displayed: 3-second poll for 'Skip' to be displayed (or ad to be over), click it if exists
  //   D) 5-second sleep

  const POLL_INTERVAL_FIVE_SECONDS = 5000;
  const POLL_INTERVAL_HALF_SECOND = 500;
  const POLL_INTERVAL_THREE_SECONDS = 3000;
  const POLL_TIMEOUT_TEN_SECONDS = 10000;
  const CSS_SKIP_BUTTON = ".ytp-ad-skip-button-text";
  const CSS_AD_MODULE = ".ytp-ad-module";
  const CSS_SKIP_BUTTON_CONTAINER = ".ytp-ad-skip-button-container";
  const MAX_ERRORS = 3;

  const getSkipButton = () => document.querySelector(CSS_SKIP_BUTTON);

  const isAdDisplayed = () => {
    logger.trace("Is ad displayed?");
    const adModule = document.querySelector(CSS_AD_MODULE);
    return adModule !== null &&
      	window.getComputedStyle(adModule).display !== "none";
  };

  const isSkipDisplayed = () => {
    logger.trace("Is skip displayed?");
    // check 'Skip' button's container for visibility
    const skipButtonContainer = document.querySelector(CSS_SKIP_BUTTON_CONTAINER);
    return skipButtonContainer !== null &&
      	window.getComputedStyle(skipButtonContainer).display !== "none";
  };

  const isSkipDisplayedOrIsAdGone = () => {
    return !isAdDisplayed() || isSkipDisplayed();
  };

  // 1) Infinite loop (until error threshold met)
  let errCount = 0;
  while (errCount <= MAX_ERRORS) {
    try {
      // A) 5-second poll for ad to be displayed
      logger.debug("Waiting for ad to be displayed...");
      await wait({
        condition: isAdDisplayed,
        pollTimeout: POLL_INTERVAL_FIVE_SECONDS,
      });

      try {
        // B) 0.5-second poll, up to 10-seconds, for 'Skip' to be displayed (or ad to be over), click it if exists
        logger.debug("Ad found. Waiting for 'Skip' to be displayed (or ad to be over)...");
        await wait({
          condition: isSkipDisplayedOrIsAdGone,
          pollTimeout: POLL_INTERVAL_HALF_SECOND,
          timeout: POLL_TIMEOUT_TEN_SECONDS,
        });
        logger.debug("Clicking 'Skip' if it exists...");
        getSkipButton()?.click();
      } catch (e) {
        // C) if timeout
        if (e instanceof TimeoutError) {
          // C1) if ad is displayed: 3-second poll for 'Skip' to be displayed (or ad to be over), click it if exists
          if (isAdDisplayed()) {
            logger.debug("Long ad detected. Waiting for 'Skip' to be displayed (or ad to be over)...");
            await wait({
              condition: isSkipDisplayedOrIsAdGone,
              pollTimeout: POLL_INTERVAL_THREE_SECONDS,
            });
            logger.debug("Clicking 'Skip' if it exists...");
            getSkipButton()?.click();
          } else {
            logger.warn("Expected ad to be playing when timing-out on `is-skip-displayed`");
          }
        } else {
          // not a TimeoutError; rethrow
          throw e;
        }
      }
    } catch (e) {
      logger.error(e.message);
      errCount++;
    } finally {
      // D) 5-second sleep
      await sleep(POLL_INTERVAL_FIVE_SECONDS);
    }
  } // end of loop

  const killMsg = `Exceeded max-error limit (${MAX_ERRORS}). Aborting...`;
  logger.fatal(killMsg);
  GM.notification({
    text: killMsg,
    title: GM_info.script.name,
  });
})(GM_wrench);

