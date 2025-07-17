// ==UserScript==
// @name         Nitter.net Redirect
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/nitter_redirect.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/nitter_redirect.user.js
// @description  Redirect all X/Twitter links through a Nitter instance
// @match        https://x.com/*
// @match        https://twitter.com/*
// @match        https://xcancel.com/*
// @match        https://nitter.poast.org/*
// @icon         https://www.google.com/s2/favicons?domain=nitter.net
// @version      1.4
// @run-at       document-start
// @author       CoeJoder
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @top-level-await
// ==/UserScript==

/*
  Nitter sites will have the nitter selection menu, and only twitter/x will
  perform the initial redirection.
*/

// script storage key
const KEY_SELECTED_NITTER_INSTANCE = 'selected-nitter-instance';

/// known working Nitter instances
const NITTER_INSTANCES = {
  xcancel_com: 'https://xcancel.com',
  poast_org: 'https://nitter.poast.org',
};

// using xcancel.com as default, as it seems quickest and works with embedded media
const DEFAULT_NITTER_INSTANCE = NITTER_INSTANCES.xcancel_com;

const TWITTER_ALIASES = [
  'https://x.com',
  'https://twitter.com',
];

// seed the selected instance with default value
if (typeof await GM.getValue(KEY_SELECTED_NITTER_INSTANCE) === 'undefined') {
  await GM.setValue(KEY_SELECTED_NITTER_INSTANCE, DEFAULT_NITTER_INSTANCE);
}

const goToNitterIfNotAlreadyThere = async (instance) => {
  if (typeof instance === 'undefined') {
    // incognito mode may not have access to script storage
    instance = await GM.getValue(KEY_SELECTED_NITTER_INSTANCE) ?? DEFAULT_NITTER_INSTANCE;
  }
  if (window.location.origin !== instance) {
    window.location.replace(instance + window.location.pathname + window.location.search);
  }
};

if (Object.values(TWITTER_ALIASES).includes(window.location.origin)) {
  // initial redirection
  goToNitterIfNotAlreadyThere();
} else {
  // populate the nitter selection menu
  for (const value of Object.values(NITTER_INSTANCES))  {
    GM.registerMenuCommand(value, async () => {
      console.log(`Setting nitter instance to: ${value}`);
      await GM.setValue(KEY_SELECTED_NITTER_INSTANCE, value);
      goToNitterIfNotAlreadyThere(value);
    });
  }
}
