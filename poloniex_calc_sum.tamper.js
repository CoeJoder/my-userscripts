// ==UserScript==
// @name         Poloniex -- calc sum
// @namespace    https://poloniex.com
// @version      0.1
// @description  Calculate sums of selected table values.
// @author       CoeJoder
// @match        https://poloniex.com/exchange*
// @grant        none
// ==/UserScript==

(function($) {
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
		td[data-selected-sum="true"] {
			background-color: aquamarine;
		}
		div.summation_container {
			float: right;
		}
		div.selectedSum {
			background-color: aquamarine;
		}
		div.info.summation {
			padding-right: 10px;
		}
		/* extreme specificity to override built-in style */
		ul.button-group.summation > li > button.summation_clear.button {
		    text-transform: uppercase;
			font-size: 14px;
			border-radius: 5px 5px 5px 5px;
		}
		ul.button-group.summation {
			float: right;
			margin-right: 5px;
		}
    `);
	
	$(() => {
		$('.mainBox').each(function() {
			addSummationRowToHead($(this));
		});
	});
	
	$(document).on('click', 'button.summation_clear', function() {
		var $main_box = $(this).closest('.mainBox');
		$main_box.find('td[data-selected-sum="true"]').attr('data-selected-sum', 'false');
		setSum($main_box, 0);
	});
	
	$(document).on('click', '.mainBox table td', function() {
		var $this = $(this);
		if ($this.is('[data-selected-sum="true"]')) {
			$this.attr('data-selected-sum', 'false');
		}
		else {
			$this.attr('data-selected-sum', 'true');
		}
		calculateSum($this.closest('.mainBox'));
	});
	
	function addSummationRowToHead($main_box) {
		var $sum_row = $main_box.find('div.selectedSum');
		if ($sum_row.length === 0) {
			$main_box.find('div.head').append(`
				<div class="info summation">
					<div class="desc">Sum:</div>
					<div class="details">
						<div class="num selectedSum">0</div>
					</div>
				</div>
				<ul class="button-group summation">
					<li>
						<button class="summation_clear button" value="Clear Sum">Clear Sum</button>
					</li>
				</ul>
			`);
		}
	}
	
	function setSum($main_box, sum) {
		return $main_box.find('div.selectedSum').text(sum);
	}
	
	function calculateSum($main_box) {
		var sum = 0;
		$main_box.find('td[data-selected-sum="true"]').each(function() {
			var val = Number($(this).text());
			if (!isNaN(val)) {
				sum += val;
			}
		});
		setSum($main_box, sum);
	}

})(jQuery);