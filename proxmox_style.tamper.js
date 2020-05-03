// ==UserScript==
// @name         Proxmox style
// @namespace    https://www.proxmox.com
// @version      0.1
// @description  Improve text readability.
// @author       CoeJoder
// @match        https://www.proxmox.com/*
// @grant        none
// ==/UserScript==

(function() {
    function addStylesheet(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

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

    addCss(`
        * {
            color: lightgray;
            background-color: darkslategray;
        }
    `);
})();