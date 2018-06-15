String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] != undefined) {
				var reg = new RegExp("({[" + i + "]})", "g");
				result = result.replace(reg, arguments[i]);
			}
		}
	}
	return result;
};

function centerModals() {
	$('.modal').each(function(i) {
		var $clone = $(this);
		var display = $clone.css('display');
		if (display == "none") {
			$clone.css('display', 'block');
		}
		var modalHeight = $clone.find('.modal-content').height();
		var width = $clone.find('.modal-content').width();
		var top = Math.round(($clone.height() - modalHeight) / 2);
		top = top > 0 ? top : 0;
		$clone.css('display', display);
		$(this).find('.modal-content').css("margin-top", top);
		$(this).find('.modal-mark').css("height", modalHeight + 20).css("width", width + 20);
	});
}

$('.modal').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);

util.lrFixFooter("#allFooter");

$(function() {
	/*
	 * var speed = 8000; var count = 0; var newstoplist = jQuery("#newsList p");
	 * var sumCount = jQuery("#newsList p").length; function Marquee() {
	 * jQuery("#newsList p").hide(); if (count > sumCount) { count = 0; }
	 * jQuery("#newsList p:eq(" + count + ")").fadeToggle(2000); ++count; }
	 * Marquee(); var MyMar = setInterval(Marquee, speed);
	 * newstoplist.onmouseover = function() { clearInterval(MyMar); };
	 * newstoplist.onmouseout = function() { MyMar = setInterval(Marquee,
	 * speed); };
	 */
	var speed = 8000;
	var newstoplist = jQuery("#newsList p");
	var sumCount = jQuery("#newsList p").length;
	function Marquee() {
		var ele = $("#newsList p:eq(0)");
		ele.slideUp(2000, function() {
			ele.appendTo("#newsList");
			ele.show();
		});
	}
	var MyMar = setInterval(Marquee, speed);
	newstoplist.onmouseover = function() {
		clearInterval(MyMar);
	};
	newstoplist.onmouseout = function() {
		MyMar = setInterval(Marquee, speed);
	};
	$(".leftmenu-folding").on("click", function() {
		var that = $(this);
		$("." + that.data().folding).slideToggle("fast");
	});
	$(".help_list li").mousemove(function() {
		var long = 104;
		$(this).data("long") && (long = 134), $(this).find("span").stop().animate({
			width : long + "px"
		}, 100);
	}).mouseout(function() {
		$(this).find("span").stop().animate({
			width : "0px"
		}, 100);
	});

});