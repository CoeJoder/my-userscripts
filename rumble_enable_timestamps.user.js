// ==UserScript==
// @name         rumble: enable timestamps
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/rumble_enable_timestamps.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/rumble_enable_timestamps.user.js
// @version      0.2
// @description  Turn timestamps in the comment section into seekable links, similar to how YouTube does it.
// @author       CoeJoder
// @match        *://rumble.com/*.html
// @require      https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @icon         https://www.google.com/s2/favicons?domain=rumble.com
// ==/UserScript==

VM.observe(document.body, () => {
  const comments = document.querySelectorAll('.comment-text');
  if (comments.length > 0) {
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
    // disconnect observer
    return true;
  }
});
