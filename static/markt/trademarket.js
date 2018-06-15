var market = {
	cnyDigit : $("#cnyDigit").val(),
	coinDigit : $("#coinDigit").val(),
	resizeWidth : function() {
		var $width = $(window).width();
		var $height = $(window).height();
		var $login = $("#login").val();
		if ($width < 1170) {
			$width = 1170;
		}
		var leftWidth = $width - 505;
		var topLeftHeight = $height - 55;
		var topRightHight = $height - 55;
		if ($login == 1) {
			var topLeftHeight = $height - 55 - 159;
			var topRightHight = $height - 55 - 288;
		}
		$("#marketLeft").width(leftWidth);
		$("#marketStart").width(leftWidth).height(topLeftHeight);
		$("#marketData").height(topRightHight);
		$("#marketEntruts").width(leftWidth);
		$("#marketSuccessData").height(topRightHight - 30);
		$("#marketDepthData").height(topRightHight - 30);
		if ($width < 1600) {
			$("span", "#entrutsHead").removeClass("entruts-head-nav-full").addClass("entruts-head-nav-small");
			$("span:first-child", "#entrutsHead").css({
				color : "#bababa"
			});
			$("#entrutsHis").hide();
			$(".entruts-head").css({
				"border-right" : "1px solid #000"
			});
			$(".entruts-data").width("99%");
			$(".entruts-head-nav-small").on("click", function() {
				$(".entruts-head-nav-small").css({
					color : "#707070"
				});
				$(this).css({
					color : "#bababa"
				});
				var showId = $(this).data().show;
				var hideId = $(this).data().hide;
				$("#" + showId).show();
				$("#" + hideId).hide();
			});
		} else {
			$("span", "#entrutsHead").removeClass("entruts-head-nav-small").addClass("entruts-head-nav-full");
			$("#entrutsCur").show();
			$("#entrutsHis").show();
			$(".entruts-data").width("49%");
			$(".entruts-head-nav-full").css({
				color : "#707070"
			});
			$(".entruts-head-nav-full").unbind();
			$(".entruts-head").css({
				"border-right" : "none"
			});
		}
	},
	loginUser : function(ele) {
		var login_acc = $("#login_acc").val();
		var login_pwd = $("#login_pwd").val();

        //验证码
        var validateCode = $("#register-imgcode").val();
        if (validateCode == "") {
            util.layerTips("register-imgcode", util.getLan("user.register.qsrtpyzm"));
            return;
        }

		if (login_acc == "") {
			util.layerTips("login_acc", util.getLan("markt.trademarket.enterMailOrMobile"), false, 3);
			return;
		}
		if (login_pwd == "") {
			util.layerTips("login_pwd", util.getLan("matkt.trademarket.enterPassWord"), false, 3);
			return;
		}
		var longLogin = 0;
		if (util.checkEmail(login_acc)) {
			longLogin = 1;
		}
		var url = "/login.html";
		var param = {
			loginName : login_acc,
			password : login_pwd,
			type : longLogin,
            vcode : validateCode
		};
		var callback = function(data) {
			if (data.code == 200) {
				window.location.reload(true);
			} else {
                if(data.code == -20) {
                    util.layerTips("register-imgcode", data.msg);
				}else
					util.layerTips("login_acc", data.msg, true, 3);
                $("#yzmImgMarket").attr("src","/servlet/ValidateImageServlet.html?r=" + Math.round(Math.random() * 100));


            }
		};

    // login请求
		util.network({
			btn : ele,
			url : url,
			param : param,
			success : callback,
		});
	},
	lastprice : 0,
	fristprice : true,

	//
	autoRefresh : function() {
		var symbol = $("#symbol").val();
		var coinshortName = $("#coinshortName").val();
		if (symbol == "" || typeof (symbol) == "undefined" || coinshortName == "" || typeof (coinshortName) == "undefined") {
			return;
		}
		var globalurl = util.globalurl[coinshortName];
		if (typeof (globalurl) == "undefined") {
			globalurl = util.globalurl["DEFAULT"];
		}

    // market url
		var url = globalurl.market;
		var buysellcount = 20;
		var successcount = 60;
		var url = url.format(symbol, buysellcount, successcount);
		var priceOffset = function(value, type) {
			var offset = $("#tradePrice").val().split("#");
			if (offset.length == 2 && globalurl.isremote) {
				if (type == 0) {
					return util.accSub(value, offset[0]);
				}
				if (type == 1) {
					return util.accAdd(value, offset[1]);
				}
			}
			return value;
		};
		var amountOffset = function(value, type) {
			var offset = $("#tradeAmount").val().split("#");
			if (offset.length == 2 && globalurl.isremote) {
				if (type == 0) {
					return util.accMul(value, offset[0]);
				}
				if (type == 1) {
					return util.accMul(value, offset[1]);
				}
			}
			return value;
		};

		// TODO: 获取深度
		var depthUrl = globalurl.depth;
		if (!globalurl.isremote) {
			depthUrl = depthUrl + "?symbol=" + symbol;
		}

    // 深度数据 response data process
		var depthCallback = function(data) {
			if (!globalurl.isremote) {
				data = data.data.depth;
			}
			var asksdata = new Array();
			var asks = data.asks;
			var length = asks.length - 1;
			for (var i = length; i >= 0; i--) {
				asksdata.push(asks[i]);
			}

      // 渲染买单挂单
			$.each(data.bids, function(key, value) {
				if (key >= buysellcount) {
					return;
				}
				var buyele = $("#buy" + key, "#marketDepthBuy");
				if (buyele.length == 0) {
					var html = '<article id="buy' + key + '">';
					html += '<span class="depth-des market-font-buy">'+util.getLan("user.trade.m") + (key + 1) + '</span>';
					html += '<span class="depth-price">' + util.numFormat(priceOffset(Number(value[0]), 1), util.DEF_CNY_SCALE) + '</span>';
					html += '<span class="depth-amount">' + util.numFormat(amountOffset(Number(value[1]), 1), util.DEF_COIN_SCALE) + '</span>';
					html += '</article>';
					$("#marketDepthBuy").append(html);
				} else {
					buyele.children()[1].innerHTML = util.numFormat(priceOffset(Number(value[0]), 0), util.DEF_CNY_SCALE);
					buyele.children()[2].innerHTML = util.numFormat(amountOffset(Number(value[1]), 0), util.DEF_COIN_SCALE);
				}
			});
			for (var i = data.bids.length; i < buysellcount; i++) {
				$("#buy" + i, "#marketDepthBuy").remove();
			}

      // 渲染卖单挂单
			$.each(data.asks, function(key, value) {
				if (key >= buysellcount) {
					return;
				}
				var sellele = $("#sell" + key, "#marketDepthSell");
				if (sellele.length == 0) {
					var html = '<article id="sell' + key + '">';
					html += '<span class="depth-des market-font-sell">'+util.getLan("markt.trademarket.sell") + (key + 1) + '</span>';
					html += '<span class="depth-price">' + util.numFormat(priceOffset(Number(value[0]), 1), util.DEF_CNY_SCALE) + '</span>';
					html += '<span class="depth-amount">' + util.numFormat(amountOffset(Number(value[1]), 1), util.DEF_COIN_SCALE) + '</span>';
					html += '</article>';
					$("#marketDepthSell").prepend(html);
				} else {
					sellele.children()[1].innerHTML = util.numFormat(priceOffset(Number(value[0]), 1), util.DEF_CNY_SCALE);
					sellele.children()[2].innerHTML = util.numFormat(amountOffset(Number(value[1]), 1), util.DEF_COIN_SCALE);
				}
			});
			for (var i = data.asks.length; i < buysellcount; i++) {
				$("#sell" + i, "#marketDepthSell").remove();
			}
		};

    // 请求深度数据
		util.network({
			url : depthUrl,
			method : "get",
			success : depthCallback,
		});


		// 实时成交记录 response data process
		var tradesCallback = function(result) {
			data = globalurl.isremote ? result : result.data;
			var loghtml = "";
			$.each(data.trades, function(key, value) {
				if (key >= successcount) {
					return;
				}
				loghtml += '<article>';
				loghtml += '<span class="success-time">' + value.time + '</span>';  // 时间
				loghtml += '<span class="success-price">' + util.numFormat(Number(value.price), util.DEF_CNY_SCALE) + '</span>';  // 价格
				loghtml += '<span class="success-amount ' + (value.en_type == 'ask' ? "market-font-sell" : "market-font-buy") + ' market-font-sell">' + util.numFormat(Number(value.amount), market.coinDigit) + '</span>';  // 成交方向与成交量
				loghtml += '</article>';
			});
			$("#marketSuccessData").html("").append(loghtml);

      // 最新价格？
			if (market.fristprice) {
				if (data.buys.length <= 0) {
					$("#buy-price").val(util.numFormat(Number(data.p_new), market.cnyDigit));
					$("#buy-amount").val(util.numFormat(0, market.coinDigit));
				} else {
					$("#buy-price").val(util.numFormat(Number(data.buys[0].price), market.cnyDigit));
					$("#buy-amount").val(util.numFormat(0, market.coinDigit));
				}
				if (data.sells.length <= 0) {
					$("#sell-price").val(util.numFormat(Number(data.p_new), market.cnyDigit));
					$("#sell-amount").val(util.numFormat(0, market.coinDigit));
				} else {
					$("#sell-price").val(util.numFormat(Number(data.sells[0].price), market.cnyDigit));
					$("#sell-amount").val(util.numFormat(0, market.coinDigit));
				}
				market.fristprice = false;
			}
			var p_new = util.numFormat(Number(data.p_new), util.DEF_CNY_SCALE);
			var p_open = util.numFormat(Number(data.p_open), util.DEF_CNY_SCALE);
			if (p_new >= market.lastprice) {
				$("#marketPrice").html(p_new).removeClass("market-font-buy").addClass("market-font-sell");
			} else {
				$("#marketPrice").html(p_new).removeClass("market-font-sell").addClass("market-font-buy");
			}

      // 涨跌幅
			var rose = 0;
			if (p_open != 0) {
				var rose = util.accMul(util.accDiv(util.accSub(p_new, p_open), p_open), 100);
			}
			rose = util.numFormat(rose, util.OTHER_SCALE);
			if (rose < 0) {
				$("#marketRose").removeClass("market-font-buy").addClass("market-font-sell").html(rose + "%");
			} else {
				$("#marketRose").removeClass("market-font-sell").addClass("market-font-buy").html(rose + "%");
			}
			market.lastprice = p_new;
		};

    // 请求实时成交记录数据
		util.network({
			url : url,
			method : "get",
			success : tradesCallback,
		});

		var $login = $("#login").val();
		if ($login == 0) {
			window.setTimeout(function() {
				market.autoRefresh();
			}, 1000);
			return;
		}
		var entrutsUrl = "/real/getEntruts.html";
		var entrutsParam = {
            symbol : symbol
		};

		// 委单资产 response data process
		var entrutsCallbcack = function(result) {
			if (result.code == 200) {
				$("#totalCny").html(util.numFormat(result.data.totalCny, util.DEF_CNY_SCALE));
				$("#totalCoin").html(util.numFormat(result.data.totalCoin, util.DEF_COIN_SCALE));
				var entrutsCur = "";
				$.each(result.data.entrutsCur, function(key, value) {
					entrutsCur += '<article>';
					entrutsCur += '<span class="col-1">' + value.time + '</span>';
					entrutsCur += '<span class="col-2 ' + (value.type == '1' ? "market-font-sell" : "market-font-buy") + '">' + value.types + '</span>';
					entrutsCur += '<span class="col-3">' + util.numFormat(value.price, util.DEF_CNY_SCALE) + '</span>';
					entrutsCur += '<span class="col-3">' + util.numFormat(value.count, util.DEF_COIN_SCALE) + '</span>';
					entrutsCur += '<span class="col-3">' + util.numFormat(value.leftcount, util.DEF_COIN_SCALE) + '</span>';
					entrutsCur += '<span class="col-3">' + value.status + '</span>';
					if (value.status != util.getLan("markt.trademarket.chedanTreatment")) {
						entrutsCur += '<span class="col-2"><span class="entruts-cancel" data-fid="' + value.id + '">'+util.getLan("markt.trademarket.revoke")+'</span></span>';
					}
					entrutsCur += '</article>';
				});
				if (entrutsCur == "") {
					$("#entrutsCurData").html('<span style="height: 100%;width: 100%;text-align: center;padding-top: 40px;">'+util.getLan("markt.trademarket.noCommission")+'</span>');
				} else {
					$("#entrutsCurData").html("").append(entrutsCur);
				}
				$(".entruts-cancel").on("click", function() {
					var id = $(this).data().fid;
					market.cancelEntrustBtc(this, id);
				});
				var entrutsHis = "";
				$.each(result.data.entrutsHis, function(key, value) {
					entrutsHis += '<article>';
					entrutsHis += '<span class="col-1">' + value.time + '</span>';
					entrutsHis += '<span class="col-2 ' + (value.type == '1' ? "market-font-sell" : "market-font-buy") + '">' + value.types + '</span>';
					entrutsHis += '<span class="col-3">' + util.numFormat(value.price, util.DEF_CNY_SCALE) + '</span>';
					entrutsHis += '<span class="col-3">' + util.numFormat(value.count, util.DEF_COIN_SCALE) + '</span>';
					entrutsHis += '<span class="col-3">' + util.numFormat(value.leftcount, util.DEF_COIN_SCALE) + '</span>';
					entrutsHis += '<span class="col-3">' + value.status + '</span>';
					entrutsHis += '</article>';
				});
				if (entrutsHis == "") {
					$("#entrutsHisData").html('<span style="height: 100%;width: 100%;text-align: center;padding-top: 40px;">'+util.getLan("markt.trademarket.noCommission")+'</span>');
				} else {
					$("#entrutsHisData").html("").append(entrutsHis);
				}
			}
		};

    // 请求委单记录
		util.network({
			url : entrutsUrl,
			param : entrutsParam,
			success : entrutsCallbcack,
		});
		window.setTimeout(function() {
			market.autoRefresh();
		}, 1000);
	},
	cancelEntrustBtc : function(ele, id) {
		var url = "/trade/cny_cancel.html";
		var param = {
			id : id
		};
		var callbcack = function(data) {
			if (data.code == 200) {
				$(ele).remove();
			}
		};

    // 请求撤单
		util.network({
			url : url,
			param : param,
			success : callbcack,
		});
	},

	onPortion : function(portion, tradeType) {
		portion = util.accDiv(portion, 100);
		if (tradeType == 0) {
			var money = Number($("#buy-price").val());
			var tradecnymoney = Number($("#totalCny").html());
			var mtcNum = util.accDiv(tradecnymoney, money);
			mtcNum = util.accMul(mtcNum, portion);
			var portionMoney = util.accMul(money, mtcNum);
			var money = util.numFormat(money, market.cnyDigit);
			var portionMoney = util.numFormat(portionMoney, market.cnyDigit);
			var mtcNum = util.numFormat(mtcNum, market.coinDigit);
			this.antoTurnover(money, portionMoney, mtcNum, tradeType);
		} else {
			var money = Number($("#sell-price").val());
			var trademtccoin = Number($("#totalCoin").html());
			var mtcNum = util.accMul(trademtccoin, portion);
			var portionMoney = util.accMul(money, mtcNum);
			var money = util.numFormat(money, market.cnyDigit);
			var portionMoney = util.numFormat(portionMoney, market.cnyDigit);
			var mtcNum = util.numFormat(mtcNum, market.coinDigit);
			this.antoTurnover(money, portionMoney, mtcNum, tradeType);
		}
	},
	antoTurnover : function(price, money, mtcNum, tradeType) {
		if (tradeType == 0) {
			$("#buy-price").val(util.numFormat(price, market.cnyDigit));
			$("#buy-amount").val(util.numFormat(mtcNum, market.coinDigit));
			var tradeTurnover = util.numFormat(util.accMul(price, mtcNum), market.cnyDigit);
			var tradecnymoney = util.numFormat(Number($("#totalCny").html()), market.cnyDigit);
			if (parseFloat(tradeTurnover) > parseFloat(tradecnymoney)) {
				util.layerTips("buy_sub", util.getLan("markt.trademarket.balanceNotEnough"), false, 1);
				return;
			}
			$("#buy-limit").html(util.numFormat(tradeTurnover, util.DEF_CNY_SCALE));
		} else {
			$("#sell-price").val(util.numFormat(price, market.cnyDigit));
			$("#sell-amount").val(util.numFormat(mtcNum, market.coinDigit));
			var tradeTurnover = util.accMul(price, mtcNum);
			var trademtccoin = util.numFormat(Number($("#totalCoin").html()), market.coinDigit);
			if (parseFloat(mtcNum) > parseFloat(trademtccoin)) {
				util.layerTips("sell_sub", util.getLan("markt.trademarket.balanceNotEnough"), false, 1);
				return;
			}
			$("#sell-limit").html(util.numFormat(tradeTurnover, util.DEF_CNY_SCALE));
		}
	},
	numVerify : function(tradeType) {
		if (tradeType == 0) {
			var userCnyBalance = $("#buy-price").val();
			if (userCnyBalance == "") {
				userCnyBalance = 0;
			}
			var tradebuyAmount = $("#buy-amount").val();
			if (tradebuyAmount == "") {
				tradebuyAmount = 0;
			}
			var tradeTurnover = util.accMul(userCnyBalance, tradebuyAmount);
			var tradecnymoney = Number($("#totalCny").html());
			if (tradeTurnover > tradecnymoney) {
				util.layerTips("buy_sub", util.getLan("markt.trademarket.balanceNotEnough"), false, 1);
				return;
			}
			$("#buy-limit").html(util.numFormat(tradeTurnover, util.DEF_CNY_SCALE));
		} else {
			var usersellCnyBalance = $("#sell-price").val();
			if (usersellCnyBalance == "") {
				usersellCnyBalance = 0;
			}
			var tradesellAmount = $("#sell-amount").val();
			if (tradesellAmount == "") {
				tradesellAmount = 0;
			}
			var tradeTurnover = util.accMul(usersellCnyBalance, tradesellAmount);
			var trademtccoin = Number($("#totalCoin").html());
			if (tradesellAmount > trademtccoin) {
				util.layerTips("sell_sub", util.getLan("markt.trademarket.balanceNotEnough"), false, 1);
				return;
			}
			$("#sell-limit").html(util.numFormat(tradeTurnover, util.DEF_CNY_SCALE));
		}
	},
	saveCoinTrade : function(tradeType, flag) {
		if ($("#login").val() == "false") {
			window.location.href = "/user/login.html?forwardUrl=" + window.location.pathname;
			return;
		}
		var errorele = "";
		if (tradeType == 0) {
			errorele = "buy_sub";
		} else {
			errorele = "sell_sub";
		}
		var tradePassword = $("#tradePassword").val();
		if (tradePassword == "true") {
			util.layerTips(errorele, util.getLan("markt.trademarket.setTransactionPassword")+"<a href='/user/security.html#traingtr'>"+util.getLan("markt.trademarket.setImmediately")+"</a>", false, 1);
			return;
		}
		var isTelephoneBind = $("#isTelephoneBind").val();
		if (isTelephoneBind == "false") {
			util.layerTips(errorele, util.getLan("markt.trademarket.bindMobilePhone")+"<a href='/user/security.html'>"+util.getLan("markt.trademarket.bindImmediately")+"</a>", false, 1);
			return;
		}
		var symbol = $("#symbol").val();
		var coinName = $("#coinshortName").val();
		var tradeAmount = 0;
		var tradeCnyPrice = 0;
		if (tradeType == 0) {
			tradeAmount = $("#buy-amount").val();
			tradeCnyPrice = $("#buy-price").val();
		} else {
			tradeAmount = $("#sell-amount").val();
			tradeCnyPrice = $("#sell-price").val();
		}
		var limited = 0;
		if (tradeType == 0) {
			var tradeTurnover = util.accMul(tradeAmount, tradeCnyPrice);
			if ($("#totalCny").length > 0 && Number($("#totalCny").html()) < Number(tradeTurnover)) {
				util.layerTips(errorele, language["comm.error.tips.41"], false, 1);
				return;
			}
		} else {
			if ($("#totalCoin").length > 0 && Number($("#totalCoin").html()) < Number(tradeAmount)) {
				util.layerTips(errorele, language["comm.error.tips.42"].format(coinName), false, 1);
				return;
			}
		}
		var reg = new RegExp("^[0-9]+\.{0,1}[0-9]{0,8}$");
		if (!reg.test(tradeAmount)) {
			util.layerTips(errorele, language["comm.error.tips.43"], false, 1);
			return;
		}
		if (tradeAmount < 0.0001) {
			util.layerTips(errorele, language["comm.error.tips.44"].format(0.0001, coinName), false, 1);
			return;
		}
		if (!reg.test(tradeCnyPrice)) {
			util.layerTips(errorele, language["comm.error.tips.45"], false, 1);
			return;
		}
		if (tradeCnyPrice < 0.0001) {
			util.layerTips(errorele, util.getLan("markt.trademarket.bidMustNotbelessthan"), false, 1);
			return;
		}
		var total = util.numFormat(util.accMul(tradeAmount, tradeCnyPrice), util.DEF_CNY_SCALE);
		if (parseFloat(total) < 0.0001) {
			util.layerTips(errorele, util.getLan("markt.trademarket.transactionAmountShallNotbelessThan"), false, 1);
			return;
		}
		var isopen = $("#isopen").val();
		if (isopen == "true" && flag) {
			$("#tradeType").val(tradeType);
			$('#tradepass').modal({
				backdrop : 'static',
				keyboard : false,
				show : true
			});
			return;
		}
		var tradePwd = "";
		if ($("#tradePwd").length > 0) {
			tradePwd = util.trim($("#tradePwd").val());
		}
		if (tradePwd == "" && isopen == "true") {
			util.layerTips(errorele, language["comm.error.tips.46"], false, 1);
			$("#isopen").val("true");
			return;
		}
		var url = "";
		if (tradeType == 0) {
			url = "/trade/cny_buy.html";
		} else {
			url = "/trade/cny_sell.html";
		}
		tradePwd = isopen == "true" ? "" : tradePwd;
		var param = {
			tradeAmount : tradeAmount,
			tradePrice : tradeCnyPrice,
			tradePwd : tradePwd,
            symbol : symbol,
			limited : limited
		};
		var btntext = "";
		var btn = "";
		if (tradeType == 0) {
			btn = $("#buy_sub");
			btntext = btn.html();
			btn.html(util.getLan("markt.trademarket.buyingNow"));
		} else {
			btn = $("#sell_sub");
			btntext = btn.html();
			btn.html(util.getLan("markt.trademarket.sellingNow"));
		}
		var callbcack = function(data) {
			btn.html(btntext);
			util.layerTips(errorele, data.msg, false, 1);
			if (data.code == -2) {
				$("#isopen").val("true");
			}
		};

    // 下单请求
		util.network({
			btn : btn[0],
			url : url,
			param : param,
			success : callbcack,
			enter : true
		});
	},
	submitTradePwd : function() {
		var tradePwd = $("#tradePwd").val();
		if (tradePwd != "") {
			$("#tradePwd").val(tradePwd);
			$("#isopen").val("false");
		}
		$('#tradepass').modal('hide');
		var tradeType = $("#tradeType").val();
		market.saveCoinTrade(tradeType, false);
	},
	hideLoading : function() {
		$('body').addClass('loaded');
		$('#loader-wrapper .loader-inner').remove();
	}
}
$(function() {
	market.resizeWidth();
	$(window).on("resize", function() {
		market.resizeWidth();
	});
	market.autoRefresh();
	$("#login_sub").on("click", function() {
		market.loginUser(this);
	});
	$("#buyslider").on("change", function(e, val) {
		market.onPortion(val, 0);
	});
	$("#sellslider").on("change", function(e, val) {
		market.onPortion(val, 1);
	});

	$("#buy-price").on("keyup", function() {
		market.numVerify(0);
	}).on("keypress", function(event) {
		return util.goIngKeypress(this, event, market.cnyDigit);
	});
	$("#sell-price").on("keyup", function() {
		market.numVerify(1);
	}).on("keypress", function(event) {
		return util.goIngKeypress(this, event, market.cnyDigit);
	});
	$("#buy-amount").on("keyup", function() {
		market.numVerify(0);
	}).on("keypress", function(event) {
		return util.goIngKeypress(this, event, market.coinDigit);
	});
	$("#sell-amount").on("keyup", function() {
		market.numVerify(1);
	}).on("keypress", function(event) {
		return util.goIngKeypress(this, event, market.coinDigit);
	});
	$('#tradepass').on('shown.bs.modal', function(e) {
		util.callbackEnter(market.submitTradePwd);
	});
	$('#tradepass').on('hidden.bs.modal', function(e) {
		document.onkeydown = function() {
		};
	});
	$("#buy_sub").on("click", function() {
		market.saveCoinTrade(0, true);
	});
	$("#sell_sub").on("click", function() {
		market.saveCoinTrade(1, true);
	});
	$("#modalbtn").on("click", function() {
		market.submitTradePwd();
	});
});
