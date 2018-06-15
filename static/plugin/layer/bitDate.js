;!function(window) {
    var BitDatePicker, BitDate;
    BitDatePicker = function(op, cb) {
        BitDate.apply(this, arguments),
        new this.FN
    }
    ,
    BitDate = function(option, callback) {
        var _CAL = {};
        _CAL.Body = document.getElementsByTagName("body")[0],
        _CAL.format = ["YYYY-MM-DD hh:mm:ss", "YYYY-MM-DD", "hh:mm:ss"],
        this.FN = function() {
            var _this = this;
            _this.OP = option || {},
            _this.CB = callback,
            _this.OP.week = _this.OP.week || ['日', '一', '二', '三', '四', '五', '六'],
            _this.OP.month = _this.OP.month || ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            _this.OP.lang = _this.OP.lang || ['选取日期', '选取时间'],
            _this.OP.multi = _this.OP.multi || 1,
            _this.versions = "1.2.160726",
            _this.Init = function(date) {
                _this.nowDate = _this.GetNow();
                for (var _oLeg = _this.OP.input.length, o = 0; o < _oLeg; o++)
                    BUI.EventAdd(_this.OP.input[o][0], "click", function(e) {
                        var _tH = BUI.$getSize(this).height
                          , _offset = BUI.$getOffset(this) || {}
                          , _wH = window.outerHeight
                          , _cH = BUI.$getSize(_CAL.wrap).height;
                        _this.curInput = this,
                        _this.curOffset = [this.getBoundingClientRect().top + _cH + _tH > _wH ? _offset.top - _cH : _offset.top + _tH, _offset.left],
                        _this.OP.time = "datetime" == this.getAttribute("data-datetype") || "datetime" == _this.OP.datetime,
                        _this.OP.format = this.getAttribute("data-format") || (_this.OP.dateFormat || _this.OP.time ? _CAL.format[0] : _CAL.format[1]),
                        _this.OP.dateMin = this.getAttribute("data-date-min") && this.getAttribute("data-date-min").split(/\/|\-|\:|\s/),
                        _this.OP.dateMax = this.getAttribute("data-date-max") && this.getAttribute("data-date-max").split(/\/|\-|\:|\s/),
                        _this.OP.dateMin = _this.OP.dateMin && _this.NewDate({
                            Y: _this.OP.dateMin[0],
                            M: _this.OP.dateMin[1],
                            D: _this.OP.dateMin[2]
                        }),
                        _this.OP.dateMax = _this.OP.dateMax && _this.NewDate({
                            Y: _this.OP.dateMax[0],
                            M: _this.OP.dateMax[1],
                            D: _this.OP.dateMax[2]
                        }),
                        _CAL.cal_panel_time.style.display = "none",
                        _CAL.cal_panel_year.style.display = "none",
                        _CAL.cal_panel_month.style.display = "none",
                        this.value ? (_this.inputVal = this.value.split(/\/|\-|\:|\s/),
                        _this.inputVal = {
                            Y: _this.inputVal[0],
                            M: _this.inputVal[1],
                            D: _this.inputVal[2],
                            h: _this.inputVal[3],
                            m: _this.inputVal[4],
                            s: _this.inputVal[5]
                        },
                        _this.Update(_this.inputVal)) : _this.Update(_this.nowDate[1]),
                        _this.Redraw(),
                        _this.Show(),
                        _CAL.isFocus = 1,
                        BUI.EventStop(e)
                    });
                _this.Update(_this.nowDate[1]),
                _this.Redraw(),
                _this.Events()
            }
            ,
            _this.Update = function(date) {
                date ? (_this.curDate = _this.GetNow(date)[1],
                _this.curDateString = _this.GetNow(date)[0]) : (_this.curDate = _this.GetNow()[1],
                _this.curDateString = _this.GetNow()[0]),
                _this.curDate.Ds = _this.GetNow({
                    Y: _this.curDate.Y,
                    M: _this.curDate.M + 1
                })[1].D,
                _this.curDate.PrevDs = _this.GetNow({
                    Y: _this.curDate.Y,
                    M: _this.curDate.M
                })[1].D,
                _this.curDate.NextDs = _this.GetNow({
                    Y: _this.curDate.Y,
                    M: _this.curDate.M + 2
                })[1].D,
                _this.curDate.FirstW = _this.GetNow({
                    Y: _this.curDate.Y,
                    M: _this.curDate.M + 1,
                    D: 1
                })[1].W,
                _this.curDate.PrevTail = _this.curDate.PrevDs - _this.curDate.FirstW + 1
            }
            ,
            _this.DrawWrap = function() {
                _CAL.Html = {
                    wrap: "",
                    week: "",
                    month: "",
                    time: "",
                    output: ""
                },
                _CAL.wrap = _CAL.wrap || BUI.$class("date_picker").length && BUI.$class("date_picker")[0] || document.createElement("div");
                var _time_li = {
                    h: 24,
                    m: 60,
                    s: 60
                };
                for (var tl in _time_li) {
                    if (_CAL.Html.time += '<div class="time_select time_select_' + tl + '">',
                    _time_li.hasOwnProperty(tl))
                        for (var ti = 0; ti < _time_li[tl]; ti++)
                            ti = ti < 10 ? "0" + ti : ti,
                            _this.curDate[tl] == ti ? _CAL.Html.time += '<span class="cal_cur">' + ti + "</span>" : _CAL.Html.time += "<span>" + ti + "</span>";
                    _CAL.Html.time += "</div>"
                }
                for (var pi = 0; pi < _this.OP.multi; pi++) {
                    _CAL.Html.week += '<div class="cal_panel_week"><div class="cal_now_date"><span class="cal_now_year"></span> / <span class="cal_now_month"></span></div><div class="cal_week">';
                    for (var wi = 0; wi < _this.OP.week.length; wi++)
                        _CAL.Html.week += "<span>" + _this.OP.week[wi] + "</span>";
                    _CAL.Html.week += '</div><div class="cal_day"></div></div>'
                }
                _CAL.Html.output += ' <span class="input cal_out_date">' + _this.OP.lang[0] + '</span><span class="input cal_out_time">' + _this.OP.lang[1] + '</span><span class="button cal_out_btn">' + 'OK' + "</span>",
                _CAL.Html.wrap += '<div class="cal_hd"><div class="cal_output">' + _CAL.Html.output + '</div><div class="cal_handle"><div class="h_l"><span class="cal_year_prev">&laquo;</span><span class="cal_month_prev">&lsaquo;</span></div><div class="h_r"><span class="cal_month_next">&rsaquo;</span><span class="cal_year_next">&raquo;</span></div></div></div><div class="cal_bd">',
                _CAL.Html.wrap += _CAL.Html.week,
                _CAL.Html.wrap += ' <div class="cal_panel_month"></div><div class="cal_panel_year"></div><div class="cal_panel_time">' + _CAL.Html.time + "</div>",
                _CAL.Html.wrap += '</div><div class="cal_ft"></div>',
                _CAL.wrap.className = "date_picker",
                _CAL.wrap.innerHTML = _CAL.Html.wrap,
                _CAL.wrap.setAttribute("tabindex", "0"),
                _CAL.cal_bd = BUI.$class("cal_bd", _CAL.wrap)[0],
                _CAL.cal_output = BUI.$class("cal_output", _CAL.wrap)[0],
                _CAL.cal_out_date = BUI.$class("cal_out_date", _CAL.wrap)[0],
                _CAL.cal_out_time = BUI.$class("cal_out_time", _CAL.wrap)[0],
                _CAL.cal_out_btn = BUI.$class("cal_out_btn", _CAL.wrap)[0],
                _CAL.cal_handle = BUI.$class("cal_handle", _CAL.wrap)[0],
                _CAL.cal_day = BUI.$class("cal_day", _CAL.wrap)[0],
                _CAL.cal_panel_year = BUI.$class("cal_panel_year", _CAL.wrap)[0],
                _CAL.cal_panel_month = BUI.$class("cal_panel_month", _CAL.wrap)[0],
                _CAL.cal_panel_time = BUI.$class("cal_panel_time", _CAL.wrap)[0],
                _CAL.cal_time_h = BUI.$class("time_select_h", _CAL.wrap)[0],
                _CAL.cal_time_m = BUI.$class("time_select_m", _CAL.wrap)[0],
                _CAL.cal_time_s = BUI.$class("time_select_s", _CAL.wrap)[0],
                _CAL.cal_now_date = BUI.$class("cal_panel_week", _CAL.wrap)[0],
                _CAL.cal_now_year = BUI.$class("cal_now_year", _CAL.wrap)[0],
                _CAL.cal_now_month = BUI.$class("cal_now_month", _CAL.wrap)[0],
                _CAL.cal_year_prev = BUI.$class("cal_year_prev", _CAL.wrap)[0],
                _CAL.cal_year_next = BUI.$class("cal_year_next", _CAL.wrap)[0],
                _CAL.cal_month_prev = BUI.$class("cal_month_prev", _CAL.wrap)[0],
                _CAL.cal_month_next = BUI.$class("cal_month_next", _CAL.wrap)[0],
                _CAL.Body.appendChild(_CAL.wrap)
            }
            ,
            _this.DrawWeek = function() {
                for (var _html = "", _col = 0, _col2 = 0, _now = (_this.curDate.PrevTail,
                BUI.CloneObj(_this.curDate)), _drawNow = {}, w = _this.curDate.PrevTail; w < _this.curDate.PrevDs + 1; w++)
                    _now.D = w,
                    _drawNow = _this.NewDate(_now),
                    _html += _this.OP.dateMin && _this.OP.dateMax && (_drawNow < _this.OP.dateMin || _drawNow > _this.OP.dateMax) ? '<span class="disabled prev_month">' + w + "</span>" : '<span class="available prev_month">' + w + "</span>",
                    _col++;
                _now = BUI.CloneObj(_this.curDate),
                _now.M = _this.curDate.M + 1;
                for (var i = 1; i < _this.curDate.Ds + 1; i++)
                    _now.D = i,
                    _drawNow = _this.NewDate(_now),
                    _col++,
                    _html += _this.OP.dateMin && _this.OP.dateMax && (_drawNow < _this.OP.dateMin || _drawNow > _this.OP.dateMax) ? i == _this.curDate.D ? '<span class="disabled cal_cur">' + i + "</span>" : '<span class="disabled">' + i + "</span>" : i == _this.curDate.D ? '<span class="available cal_cur">' + i + "</span>" : i == _this.nowDate[1].D ? '<span class="available cal_today">' + i + "</span>" : '<span class="available">' + i + "</span>",
                    _col % 7 == 0 && (_html += "<br>");
                if (_now = BUI.CloneObj(_this.curDate),
                _now.M = _this.curDate.M + 2,
                42 - _col) {
                    _col2 = _col;
                    for (var s = 1; s - 1 < 42 - _col; s++)
                        _col2++,
                        _now.D = s,
                        _drawNow = _this.NewDate(_now),
                        _html += _this.OP.dateMin && _this.OP.dateMax && (_drawNow < _this.OP.dateMin || _drawNow > _this.OP.dateMax) ? '<span class="disabled next_month">' + s + "</span>" : '<span class="available next_month">' + s + "</span>",
                        _col2 % 7 == 0 && (_html += "<br>")
                }
                return _CAL.cal_now_year.innerHTML = _this.curDate.Y,
                _CAL.cal_now_month.innerHTML = _this.curDate.M + 1,
                _html
            }
            ,
            _this.DrawMonth = function() {
                for (var _html = "", mi = 0; mi < _this.OP.month.length; mi++)
                    _html += mi == _this.curDate.M ? '<span data-month="' + (mi + 1) + '" class="cal_cur">' + _this.OP.month[mi] + "</span>" : '<span data-month="' + (mi + 1) + '">' + _this.OP.month[mi] + "</span>";
                return _html
            }
            ,
            _this.DrawYear = function() {
                for (var _html = "", y = _this.curDate.Y - 4; y < _this.curDate.Y + 8; y++)
                    _html += y == _this.curDate.Y ? '<span class="cal_cur">' + y + "</span>" : "<span>" + y + "</span>";
                return _html
            }
            ,
            _this.DrawTime = function() {
                for (var _obj = ["h", "m", "s"], o = 0; o < 3; o++)
                    for (var _wrap = _CAL["cal_time_" + _obj[o]], _list = BUI.$getChild(_CAL["cal_time_" + _obj[o]]), i = 0; i < _list.length; i++)
                        1 * _list[i].innerText == _this.curDate[_obj[o]] ? (_list[i].className = "cal_cur",
                        _wrap.scrollTop = 26 * i) : _list[i].className = ""
            }
            ,
            _this.Redraw = function(out) {
                _CAL.wrap || _this.DrawWrap(),
                _CAL.cal_day.innerHTML = _this.DrawWeek(),
                _CAL.cal_panel_month.innerHTML = _this.DrawMonth(),
                _CAL.cal_panel_year.innerHTML = _this.DrawYear(),
                _this.OP.time ? (_CAL.cal_out_time.style.display = "block",
                _this.DrawTime()) : _CAL.cal_out_time.style.display = "none",
                _CAL.cal_out_date && _this.Output(_CAL.cal_out_date, "", "text"),
                _CAL.cal_out_time && _this.Output(_CAL.cal_out_time, _CAL.format[2], "text"),
                _this.curInput && out && _this.Output(_this.curInput, _this.OP.format)
            }
            ,
            _this.Show = function() {
                _CAL.wrap.style.display = "block",
                _CAL.wrap.style.top = _this.curOffset[0] + "px",
                _CAL.wrap.style.left = _this.curOffset[1] + "px"
            }
            ,
            _this.Hide = function() {
                _CAL.wrap.style.display = "none"
            }
            ,
            _this.GetNow = function(date) {
                var _date, _now = {};
                return date ? (_date = _this.NewDate(date),
                _now.M = _date.getMonth()) : (_date = new Date,
                _now.M = _date.getMonth() + 1),
                _now.Y = _date.getFullYear(),
                _now.D = _date.getDate(),
                _now.h = _date.getHours(),
                _now.m = _date.getMinutes(),
                _now.s = _date.getSeconds(),
                _now.mi = _date.getMilliseconds(),
                _now.W = _date.getDay(),
                [_date, _now]
            }
            ,
            _this.NewDate = function(arr) {
                var date = new Date;
                return date.setFullYear(arr.Y, arr.D ? arr.M - 1 : arr.M, arr.D || 0),
                date.setHours(arr.h || 0, arr.m || 0, arr.s || 0, arr.mi || 0),
                date
            }
            ,
            _this.Output = function(obj, format, type) {
                obj && ("text" == type ? obj.innerHTML = _this.Format(format) : obj.value = _this.Format(format));
                if("text" !== type && typeof(_this.CB) === "function"){
                	_this.CB.call(this);
                }
            }
            ,
            _this.Format = function(format) {
                var _fmt = format || _CAL.format[1]
                  , _date = {
                    "Y+": _this.curDate.Y,
                    "M+": _this.curDate.M + 1,
                    "D+": _this.curDate.D,
                    "h+": _this.curDate.h,
                    "m+": _this.curDate.m,
                    "s+": _this.curDate.s,
                    "q+": _this.curDate.q,
                    "S+": _this.curDate.S
                };
                /(Y+)/.test(_fmt) && (_fmt = _fmt.replace(RegExp.$1, (_date["Y+"] + "").substr(4 - RegExp.$1.length)));
                for (var k in _date)
                    _date.hasOwnProperty(k) && new RegExp("(" + k + ")").test(_fmt) && (_fmt = _fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? _date[k] : ("00" + _date[k]).substr(("" + _date[k]).length)));
                return _fmt
            }
            ,
            _this.Position = function() {}
            ,
            _this.Events = function() {
                function BlurHide() {
                    _CAL.isFocus || _this.Hide()
                }
                BUI.EventAdd(_CAL.cal_now_year, "click", function() {
                    var _dis = _CAL.cal_panel_year.style.display;
                    _CAL.cal_panel_year.style.display = "block" == _dis ? "none" : "block",
                    _CAL.cal_panel_month.style.display = "none",
                    _CAL.cal_panel_time.style.display = "none"
                }),
                BUI.EventAdd(_CAL.cal_now_month, "click", function() {
                    var _dis = _CAL.cal_panel_month.style.display;
                    _CAL.cal_panel_month.style.display = "block" == _dis ? "none" : "block",
                    _CAL.cal_panel_year.style.display = "none",
                    _CAL.cal_panel_time.style.display = "none"
                }),
                BUI.EventAdd(_CAL.cal_out_time, "click", function(e) {
                    _CAL.cal_panel_time.style.display = "block",
                    _this.DrawTime()
                }),
                BUI.EventAdd(_CAL.cal_out_date, "click", function() {
                    _CAL.cal_panel_time.style.display = "none"
                }),
                BUI.EventAdd(_CAL.cal_year_prev, "click", function() {
                    _this.curDate.Y--,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(1)
                }),
                BUI.EventAdd(_CAL.cal_year_next, "click", function() {
                    _this.curDate.Y++,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(1)
                }),
                BUI.EventAdd(_CAL.cal_month_prev, "click", function() {
                    _this.Update(_this.curDate),
                    _this.Redraw(1)
                }),
                BUI.EventAdd(_CAL.cal_month_next, "click", function() {
                    _this.curDate.M += 2,
                    _this.Update(_this.curDate),
                    _this.Redraw(1)
                }),
                BUI.EventAdd(_CAL.cal_panel_month, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    _t != this && (_this.curDate.M = _t.getAttribute("data-month"),
                    _this.Update(_this.curDate),
                    _this.Redraw(),
                    _CAL.cal_panel_month.style.display = "none")
                }),
                BUI.EventAdd(_CAL.cal_panel_year, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    _t != this && (_this.curDate.Y = _t.innerText,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(),
                    _CAL.cal_panel_year.style.display = "none")
                }),
                BUI.EventAdd(_CAL.cal_day, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    if (_t != this) {
                        if (BUI.$hashClass(_t, "disabled"))
                            return !1;
                        _this.curDate.D = 1 * _t.innerText,
                        BUI.$hashClass(_t, "prev_month") || (BUI.$hashClass(_t, "next_month") ? _this.curDate.M += 2 : _this.curDate.M++),
                        _this.Update(_this.curDate),
                        _this.Redraw(1),
                        _this.OP.time || _this.Hide()
                    }
                }),
                BUI.EventAdd(_CAL.cal_time_h, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    _t != this && (_this.curDate.h = 1 * _t.innerText,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(1))
                }),
                BUI.EventAdd(_CAL.cal_time_m, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    _t != this && (_this.curDate.m = 1 * _t.innerText,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(1))
                }),
                BUI.EventAdd(_CAL.cal_time_s, "click", function(e) {
                    var _t = BUI.EventTarget(e);
                    _t != this && (_this.curDate.s = 1 * _t.innerText,
                    _this.curDate.M++,
                    _this.Update(_this.curDate),
                    _this.Redraw(1),
                    _CAL.cal_panel_time.style.display = "none")
                }),
                _CAL.cal_out_btn && BUI.EventAdd(_CAL.cal_out_btn, "click", function(e) {
                    _this.curInput && _this.Output(_this.curInput, _this.OP.format),
                    _this.Hide()
                }),
                BUI.EventAdd(document, "click", function(e) {
                    for (var _tar = BUI.EventTarget(e); _tar; ) {
                        if (_tar == _CAL.wrap)
                            return void (_CAL.isFocus = 1);
                        _tar = _tar.parentNode
                    }
                    _CAL.isFocus = 0,
                    BlurHide();
                }),
                BUI.EventAdd(_CAL.wrap, "click", function(e) {
                    _CAL.isFocus = 1,
                    BUI.EventStop(e),
                    BlurHide();
                }),
                BUI.EventAdd(document, "keydown", function(e) {
                    var _dis = _CAL.cal_panel_time.style.display;
                    if (27 == e.keyCode)
                        return "block" == _dis ? _CAL.cal_panel_time.style.display = "none" : _this.Hide(),
                        !1
                })
            }
            ,
            _this.Init();
        }
    }
    ,    
    window.BUI = {EventAdd: function(o, t, f) {
        var obj = o;
        obj && (document.addEventListener ? obj.addEventListener(t, f, !1) : obj.attachEvent("on" + t, f))
    },
    $class: function(oClass, oParent, sTag) {
        var _parent = oParent || document
          , _reg = null
          , _str = ""
          , _elem = []
          , _arr = [];
        if (_parent.getElementsByClassName) {
            if ("string" == typeof oClass)
                _elem = _parent.getElementsByClassName(oClass);
            else if ("object" == typeof oClass)
                for (var _i = 0; _i < oClass.length; _i++)
                    _elem.push(_parent.getElementsByClassName(oClass[_i])[0])
        } else {
            if (_arr = sTag ? _parent.getElementsByTagName(sTag) : _parent.getElementsByTagName("*"),
            "string" == typeof oClass)
                _reg = new RegExp("(^|\\s)" + oClass + "(\\s|$)");
            else if ("object" == typeof oClass) {
                for (var i = 0; i < oClass.length; i++)
                    _str += i != oClass.length - 1 ? oClass[i] + "|" : oClass[i];
                _reg = new RegExp("(^|\\s)(" + _str + ")(\\s|$)")
            }
            for (var ii = 0, len = _arr.length; ii < len; ii++)
                _reg.test(_arr[ii].className) && _elem.push(_arr[ii])
        }
        return _elem
    },CloneObj: function(original) {
        function cloneObject(original) {
            var copy = new (original.constructor || Object)
              , properties = Object.getOwnPropertyNames(original);
            if (Array.isArray(properties))
                for (var i = 0, l = properties.length; i < l; i++) {
                    var property = properties[i]
                      , descriptor = Object.getOwnPropertyDescriptor(original, property);
                    descriptor.hasOwnProperty("value") && (descriptor.value = clone(descriptor.value)),
                    Object.defineProperty(copy, property, descriptor)
                }
            return copy
        }
        function cloneArray(original) {
            for (var copy = [], i = 0, l = original.length; i < l; i++)
                copy.push(clone(original[i]));
            return copy
        }
        function cloneDate(original) {
            return new Date(original.getTime())
        }
        function clone(original) {
            return Array.isArray(original) ? cloneArray(original) : "function" == typeof original ? original : original instanceof Date ? cloneDate(original) : original instanceof Object ? cloneObject(original) : original
        }
        return clone(original)
    },$getSize: function(obj) {
        if ("none" != this.$getStyle(obj, "display"))
            return {
                width: obj.offsetWidth || this.$getStyleNum(obj, "width"),
                height: obj.offsetHeight || this.$getStyleNum(obj, "height")
            };
        var _addCss = {
            display: "block",
            position: "absolute",
            visibility: "hidden"
        }
          , _oldCss = {};
        for (var i in _addCss)
            _oldCss[i] = this.$getStyle(obj, i);
        this.$setStyle(obj, _addCss);
        var _width = obj.clientWidth || obj.outerWidth
          , _height = obj.clientHeight || this.$getStyleNum(obj, "height");
        return this.$setStyle(obj, _oldCss),
        {
            width: _width,
            height: _height
        }
    },EventTarget: function(e) {
        return e.target ? e.target : window.event.srcElement
    },$getStyle: function(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, !1)[attr]
    },$getOffset: function(obj) {
        var rect = obj.getBoundingClientRect()
        , top = document.documentElement.clientTop
        , left = document.documentElement.clientLeft;
      return {
          top: rect.top - top + (window.pageYOffset || obj.scrollTop) - (obj.clientTop || 0),
          left: rect.left - left + (window.pageXOffset || obj.scrollLeft) - (obj.clientLeft || 0)
      }
  },$setStyle: function(obj, style) {
      if ("object" == typeof style)
          for (var s in style) {
              for (var cssArrt = s.split("-"), i = 1; i < cssArrt.length; i++)
                  cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
              var cssArrtnew = cssArrt.join("");
              obj.style[cssArrtnew] = style[s]
          }
      else
          "string" == typeof style && (obj.style.cssText = style)
  },EventStop: function(e) {
      e && e.stopPropagation ? (e.stopPropagation(),
    	        e.preventDefault()) : (window.event.cancelBubble = !0,
    	        window.event.returnValue = !1)
    	    }, $removeClass: function(obj, name) {
    	        avatars.hasClass(obj, name) && (obj.className = obj.className.replace(new RegExp("(^|\\s)*" + name + "(\\s|$)*","g"), ""))
    	    },
    	    $hashClass: function(obj, name) {
    	        return new RegExp("(^|\\s)" + name + "(\\s|$)").test(obj.className)
    	    },}
    window.bitDates = BitDatePicker;
}(window)