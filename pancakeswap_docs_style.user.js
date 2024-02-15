// ==UserScript==
// @name         PancakeSwap Documentation Style Mods
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/pancakeswap_docs_style.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/pancakeswap_docs_style.user.js
// @version      0.2
// @description  As the webpage isn't supported by DarkReader, apply a dark theme manually by stylesheet injection.
// @author       CoeJoder
// @match        *://docs.pancakeswap.finance/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/GM_wrench@v1.3/dist/GM_wrench.min.js
// ==/UserScript==
(function() {
    GM_wrench.addCss(`
        /* Page header */
        .r-14lw9ot {
            background-color: gray !important;
        }

        /* the left and right main panels */
        div[data-testid="page.desktopTableOfContents"], div[data-testid="page.desktopTableOfContents"] + div {
            background: rgb(40,40,40) !important;
        }

        /* the plaintext elements */
        .r-1nf4jbm, .r-1bnj018, .r-1rasi3h {
            color: rgb(240, 240, 240) !important;
        }

        /* the current menu item in the left main panel */
        .r-2yqpml {
            color: darkblue !important;
        }

        /* hovered menu item in the left main panel */
        body:not(.dragging) [data-rnwi-1b00too-hover]:hover {
            background-color: rgb(100, 100, 100) !important;
        }

        /* "Powered by Gitbook" button below menu */
        .r-1b00too {
            background-color: rgb(100, 100, 100) !important;
        }

        /* "Powered by Gitbook" gradient border */
        div.css-175oi2r.r-10ptun7 {
            background-image: linear-gradient(rgba(100, 100, 100, 0), rgb(100, 100, 100)) !important;
        }

        /* the table headers and code blocks */
        .r-1vckr1u {
            background-color: rgb(15, 15, 15) !important;
        }

        /* the nav buttons at the bottom of the right main panel */
        a[data-rnwi-handle="BaseCard"] {
            background-color: rgb(15, 15, 15) !important;
        }
    `);
})();
