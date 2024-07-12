// ==UserScript==
// @name        YouTube: remove propaganda box
// @namespace   https://github.com/CoeJoder/my-userscripts
// @homepageURL https://github.com/CoeJoder/my-userscripts/blob/master/youtube_remove_propaganda_box.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/youtube_remove_propaganda_box.user.js
// @version     0.4
// @description Removes the propaganda box that Big Brother places under "controversial" videos.
// @author      CoeJoder
// @match       *://www.youtube.com/watch?*
// @icon        https://www.google.com/s2/favicons?domain=youtube.com
// @require     https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.5/dist/GM_wrench.min.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @grant       none
// ==/UserScript==

// Strategy: wait for the container to load, then remove propaganda box if
// present, then attach a permanent listener to the container which deletes
// the propaganda if it returns e.g. while navigating to other videos.

const CONTAINER_CSS = "#clarify-box";
const PROPAGANDA_BOX_CSS = "ytd-clarification-renderer";

(async ({wait}) => {
  const container = await wait({
    condition: () => document.querySelector(CONTAINER_CSS),
    timeout: 75 * 1000,
    pollTimeout: 1000,
    message: `Timed out waiting for "${CONTAINER_CSS}"`,
  });

  const removeIfPresent = () => {
    const propagandaBox = container.querySelector(PROPAGANDA_BOX_CSS);
    if (propagandaBox) {
      propagandaBox.remove();
    }
  };

  removeIfPresent();
  
  VM.observe(container, () => {
    removeIfPresent();
  }, {subtree: false});
})(GM_wrench);
