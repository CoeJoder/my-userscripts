// ==UserScript==
// @name         Washington Post paywall
// @namespace    https://www.washingtonpost.com
// @version      0.1
// @description  Removes the paywall from article pages on WaPo.
// @author       CoeJoder
// @match        *://washingtonpost.com/*
// @grant        none
// ==/UserScript==

(function($) {
    "use strict";
    $(function() {
        $('#wp_Signin').remove();
        $('.wp_signin').remove();
        $('body').css('overflow-y', '');
        $('*').enableSelection();   // WaPo custom

        $('*').css("webkitUserSelect", "");
        $('*').on('selectstart', function() { return 1; });
        $('*').on('dragstart', function() { return 1; });

        (function($){
            $.fn.disableSelection = function() {
                return this
                         .attr('unselectable', 'off')
                         .css('user-select', 'auto')
                         .on('selectstart', true);
            };
        })(jQuery);
    });
})(jQuery);