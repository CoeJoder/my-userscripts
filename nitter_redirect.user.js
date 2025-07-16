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
// @version      1.3
// @run-at       document-start
// @author       CoeJoder
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @top-level-await
// ==/UserScript==

/*
  twitter/x and nitter sites will all have the nitter selection menu,
  but only twitter/x will perform the initial redirection,
  and all sites will forward when menu selection changes the current site
*/

// script storage key
const KEY_SELECTED_NITTER_INSTANCE = 'selected-nitter-instance';

/// known working Nitter instances
const NITTER_INSTANCES = {
  xcancel_com: 'https://xcancel.com',
  poast_org: 'https://nitter.poast.org',
}

const TWITTER_ALIASES = [
  'https://x.com',
  'https://twitter.com',
]

// using xcancel.com as default, as it seems quickest and works with embedded media
const DEFAULT_NITTER_INSTANCE = NITTER_INSTANCES.xcancel_com;

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

// populate the nitter selection menu
for (const [key, value] of Object.entries(NITTER_INSTANCES))  {
  GM.registerMenuCommand(key, async () => {
    console.log(`Setting nitter instance to: ${key}`);
    await GM.setValue(KEY_SELECTED_NITTER_INSTANCE, value);
    goToNitterIfNotAlreadyThere(value);
  });
}

// initial redirection from twitter/x only
if (Object.values(TWITTER_ALIASES).includes(window.location.origin)) {
  goToNitterIfNotAlreadyThere();
}
