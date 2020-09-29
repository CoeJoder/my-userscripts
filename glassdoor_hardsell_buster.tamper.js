// ==UserScript==
// @name         glassdoor.com: hard-sell wall buster
// @namespace    https://www.glassdoor.com
// @version      0.1
// @description  Allows browsing of glassdoor.com reviews without compromising privacy.
// @author       CoeJoder
// @match        *://www.glassdoor.com/Reviews/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(() => {
    function addCss(css) {
        var style = document.createElement('style');
        style.type ='text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

	// show full text of reviews
	// hide nag buttons
    addCss(`
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
	waitForKeyElements("#ContentWallHardsell", (wall) => {
		wall.remove();
		// disable scroll-blocking
		// (scroll-blocking is performed late in the page load, so wrap it in a setTimeout)
		setTimeout(() => {
			window.onscroll = null;
			document.body.style.removeProperty("overflow");
			document.body.style.removeProperty("height");
		}, 1000);
	}, waitOnce, interval, maxIntervals);
})();
