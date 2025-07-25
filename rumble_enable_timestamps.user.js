// THIS SCRIPT IS DEPRECATED
// Rumble has finally integrated this feature natively 🎉

// ==UserScript==
// @name        rumble: enable timestamps
// @namespace   https://github.com/CoeJoder/my-userscripts
// @homepageURL https://github.com/CoeJoder/my-userscripts/blob/master/rumble_enable_timestamps.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/rumble_enable_timestamps.user.js
// @version     0.3
// @description **DEPRECATED** Turn timestamps in the comment section into seekable links, similar to how YouTube does it.
// @author      CoeJoder
// @match       *://rumble.com/*.html
// @require     https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.5/dist/GM_wrench.min.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @icon        https://www.google.com/s2/favicons?domain=rumble.com
// ==/UserScript==

// Strategy:
// All comments are loaded at the start; pagination only toggles visibility.
// Changing the sort order reloads the comments from the server. So, 
// timestampify at initial load, then attach a persistent listener to the 
// comments container to timestampify again when the DOM changes.  When 
// a timestamp is clicked, unmute the video, set max-volume, and play.

// Caveat:
// There is an overlay image on top of the video player initially.
// On desktop, it disappears automatically when video starts playing, but
// not on mobile.

// TODO add automatic overlay-clearing on mobile when timestamp is clicked

(async ({ wait }) => {

  const PARENT_CONTAINER_CSS = '#video-comments';
  const COMMENT_CSS = '.comment-text';
  const TIMEOUT_CONTAINER_EXIST = 30 * 1000;
  const POLL_CONTAINER_EXIST = 1 * 1000;

  const processComments = (container) => {
    const comments = container.querySelectorAll(COMMENT_CSS);
    comments.forEach(comment => {
    let replaced = false;
      const html = comment.innerHTML.replace(/(?:(\d+):)?(\d+):(\d+)/, (match, h, m, s, offset, string) => {
        replaced = true;
        h = parseInt(h || "0");
        m = parseInt(m);
        s = parseInt(s);
        const seekTo = h*3600 + m*60 + s;
        return `<a href="#" style='color: #37c;' onclick="const vid = document.querySelector('video');
            vid.muted = false; vid.volume = 1; vid.currentTime = ${seekTo}; vid.play();">${match}</a>`;
      });
      if (replaced) {
        comment.innerHTML = html;
      }
    });
    return comments.length > 0;
  };

  const container = await wait({
      condition: () => document.querySelector(PARENT_CONTAINER_CSS),
      timeout: TIMEOUT_CONTAINER_EXIST,
      pollTimeout: POLL_CONTAINER_EXIST,
      message: 'Unable to timestampify: comments container not found'
  });

  processComments(container);

  VM.observe(container, () => {
    processComments(container);
  }, {subtree: false});

})(GM_wrench);
