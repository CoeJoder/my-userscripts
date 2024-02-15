// ==UserScript==
// @name         ProxMox noVNC cookie setter
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/proxmox_novnc_cookie.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/proxmox_novnc_cookie.user.js
// @version      0.2
// @description  Sets a cookie based on the URL param provided by vm.sh.
// @author       CoeJoder
// @include      /^https://pve\.local:8006/\?console=kvm&novnc=1.*$/
// @grant        none
// ==/UserScript==

// if the PVE auth ticket is in the URL params, add it to the document as a cookie
// if it's not present, load the site as usual
const param = "PVEAuthCookie"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has(param)) {
    const value = urlParams.get(param);
    document.cookie = `${param}=${decodeURIComponent(value)}`;
    // load page with the param removed
    urlParams.delete(param);
    window.location.search = urlParams.toString();
}
