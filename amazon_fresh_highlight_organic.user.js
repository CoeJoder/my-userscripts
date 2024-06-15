// ==UserScript==
// @name         Amazon Fresh: filter deals by 'organic'
// @namespace    https://github.com/CoeJoder/my-userscripts
// @homepageURL  https://github.com/CoeJoder/my-userscripts/blob/master/amazon_fresh_highlight_organic.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/CoeJoder/my-userscripts/amazon_fresh_highlight_organic.user.js
// @version      0.1
// @description  Highlight organic deals only
// @author       CoeJoder
// @match        *://*.amazon.com/fmc/alldeals*
// @icon         https://m.media-amazon.com/images/G/01/ALMStores/UFG/Fresh/Logos/fresh19_display_color.png
// ==/UserScript==
(() => {
	const PERIOD = 3000;
	const COLOR = 'green';
	const TARGET = 'organic';
	setInterval(() => {
		[...document.querySelectorAll('[data-a-card-type]')]
				.filter(card => card.innerText.toLowerCase().includes(TARGET))
				.forEach(card => { card.style.backgroundColor = COLOR });
	}, PERIOD);
})();
