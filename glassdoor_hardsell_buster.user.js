// ==UserScript==
// @name         glassdoor.com: hard-sell wall buster
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/glassdoor_hardsell_buster.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/glassdoor_hardsell_buster.user.js
// @version      0.2
// @description  Allows browsing of glassdoor.com reviews without compromising privacy.
// @author       CoeJoder
// @match        *://www.glassdoor.com/Reviews/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.0/dist/GM_wrench.min.js
// ==/UserScript==

(() => {
    // show full text of reviews hide nag buttons
    GM_wrench.addCss(`
        p.v2__EIReviewDetailsV2__isCollapsed {
            max-height: none;
        }

        p.v2__EIReviewDetailsV2__isCollapsed::after {
            height: auto;
        }

        div.v2__EIReviewDetailsV2__verifyEmail {
            display: none;
        }
    `);


    // listen for the first ~30 seconds for a wall to show up, remove it, and stop polling
    let waitOnce = true;
    let interval = 300;
    let maxIntervals = 100;
    GM_wrench.waitForKeyElements("#ContentWallHardsell", (wall) => {
        wall.remove();
        // disable scroll-blocking (scroll-blocking is performed late in the page load, so wrap it in a setTimeout)
        setTimeout(() => {
            window.onscroll = null;
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("height");
        }, 1000);
    }, waitOnce, interval, maxIntervals);
})();
