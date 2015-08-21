/* -----------------------------------------------
Colorful Responsive Movie Skin for Blogger
By		: Phimini.com
URL		: http://www.phimini.com/
----------------------------------------------- */


/***************
aToolTip
***************/
/*
	jQuery Version:				jQuery 1.3.2+
	Plugin Name:				aToolTip V 1.5
	Plugin by: 					Ara Abcarians: http://ara-abcarians.com
	License:					aToolTip is licensed under a Creative Commons Attribution 3.0 Unported License
								Read more about this license at --> http://creativecommons.org/licenses/by/3.0/			
*/
(function($) {
    $.fn.aToolTip = function(options) {
    	/**
    		setup default settings
    	*/
    	var defaults = {
    		// no need to change/override
    		closeTipBtn: 'aToolTipCloseBtn',
    		toolTipId: 'aToolTip',
    		// ok to override
    		fixed: false,
    		clickIt: false,
    		inSpeed: 200,
    		outSpeed: 100,
    		tipContent: '',
    		toolTipClass: 'defaultTheme',
    		xOffset: 5,
    		yOffset: 5,
    		onShow: null,
    		onHide: null
    	},
    	// This makes it so the users custom options overrides the default ones
    	settings = $.extend({}, defaults, options);
    
		return this.each(function() {
			var obj = $(this);
			/**
				Decide weather to use a title attr as the tooltip content
			*/
			if(obj.attr('title')){
				// set the tooltip content/text to be the obj title attribute
				var tipContent = obj.attr('title');	 
			} else {
				// if no title attribute set it to the tipContent option in settings
				var tipContent = settings.tipContent;
			}
			
			/**
				Build the markup for aToolTip
			*/
			var buildaToolTip = function(){
				if( $(obj).hasClass('post') && !$(obj).hasClass('bar') )
					return;
				$('body').append("<div id='"+settings.toolTipId+"' class='"+settings.toolTipClass+"'><p class='aToolTipContent'>"+tipContent+"</p></div>");

				if(tipContent && settings.clickIt){
					$('#'+settings.toolTipId+' p.aToolTipContent')
					.append("<a id='"+settings.closeTipBtn+"' href='#' title='close'></a>");
				}
			},
			/**
				Position aToolTip
			*/
			positionaToolTip = function(){
					
				pos_top	= (obj.offset().top - $('#'+settings.toolTipId).outerHeight() - settings.yOffset);
				pos_left= (obj.offset().left + obj.outerWidth() + settings.xOffset);

				if( obj.offset().top < ($(document).scrollTop() + $('#'+settings.toolTipId).outerHeight()) )
					pos_top = (obj.pageY + settings.xOffset);

				if( (obj.offset().left + $('#'+settings.toolTipId).outerWidth()*2) > $(window).width())
					pos_left = (obj.offset().left - $('#'+settings.toolTipId).outerWidth() - settings.xOffset);

				$('#'+settings.toolTipId).css({
					top: pos_top + 'px',
					left: pos_left + 'px'
				})
				.stop().fadeIn(settings.inSpeed, function(){
					if ($.isFunction(settings.onShow)){
						settings.onShow(obj);
					}
				});				
			},
			/**
				Remove aToolTip
			*/
			removeaToolTip = function(){
				// Fade out
				$('#'+settings.toolTipId).stop().fadeOut(settings.outSpeed, function(){
				    $(this).remove();
				    if($.isFunction(settings.onHide)){
						settings.onHide(obj);
					}
				});				
			};
			
			/**
				Decide what kind of tooltips to display
			*/
			// Regular aToolTip
			if(tipContent && !settings.clickIt){	
				// Activate on hover	
				obj.hover(function(){
					// remove already existing tooltip
					$('#'+settings.toolTipId).remove();
					obj.attr({title: ''});
					buildaToolTip();
					positionaToolTip();
			    }, function(){ 
					removeaToolTip();
			    });	
		    } 		    
		    
		    // Click activated aToolTip
		    if(tipContent && settings.clickIt){
				// Activate on click	
				obj.click(function(el){
					// remove already existing tooltip
					$('#'+settings.toolTipId).remove();
					obj.attr({title: ''});
					buildaToolTip();
					positionaToolTip();
					// Click to close tooltip
					$('#'+settings.closeTipBtn).click(function(){
						removeaToolTip();
						return false;
					});		 
					return false;			
			    });
		    }
		    
		    // Follow mouse if enabled
		    if(!settings.fixed && !settings.clickIt){
				obj.mousemove(function(el){
					el = el ? el : window.event;
					
					pos_top	= el.pageY - $('#'+settings.toolTipId).outerHeight() - settings.yOffset;
					pos_left= el.pageX + settings.xOffset;

					if( el.pageY < ($(document).scrollTop() + $('#'+settings.toolTipId).outerHeight()) )
						pos_top = (el.pageY + settings.xOffset);

					if( (el.pageX + $('#'+settings.toolTipId).outerWidth()) > $(window).width())
						pos_left = (el.pageX - $('#'+settings.toolTipId).outerWidth() - settings.xOffset);

					$('#'+settings.toolTipId).css({
						top: pos_top,
						left: pos_left
					});
				});			
			}		    
		  
		}); // END: return this
    };
})(jQuery);

/***************
jCarousel
***************/

(function ($) {
	$.fn.jCarouselLite = function (o) {
		o = $.extend({
			btnPrev: null,
			btnNext: null,
			btnGo: null,
			mouseWheel: false,
			auto: null,
			speed: 200,
			easing: null,
			vertical: false,
			circular: true,
			visible: 3,
			start: 0,
			scroll: 1,
			beforeStart: null,
			afterEnd: null
		},
		o || {});
		return this.each(function () {
			var running = false,
			animCss = o.vertical ? "top": "left",
			sizeCss = o.vertical ? "height": "width";
			var div = $(this),
			ul = $("ul:first", div),
			tLi = $(".car", ul),
			tl = tLi.size(),
			v = o.visible;
			if (o.circular) {
				ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone());
				o.start += v
			}
			var li = $(".car", ul),
			itemLength = li.size(),
			curr = o.start;
			div.css("visibility", "visible");
			li.css({
				overflow: "hidden",
				float: o.vertical ? "none": "left"
			});
			ul.css({
				padding: "0",
				position: "relative",
				"list-style-type": "none",
				"z-index": "1"
			});
			div.css({
				overflow: "hidden",
				"z-index": "2"
			});
			var liSize = o.vertical ? height(li) : width(li);
			var ulSize = liSize * itemLength;
			var divSize = liSize * v;
			li.css({
				width: li.width()
			});
			ul.css(sizeCss, ulSize + "px").css(animCss, -(curr * liSize));
			div.css(sizeCss, divSize + "px");
			if (o.btnPrev) $(o.btnPrev).click(function () {
				return go(curr - o.scroll)
			});
			if (o.btnNext) $(o.btnNext).click(function () {
				return go(curr + o.scroll)
			});
			if (o.btnGo) $.each(o.btnGo, function (i, val) {
				$(val).click(function () {
					return go(o.circular ? o.visible + i: i)
				})
			});
			if (o.mouseWheel && div.mousewheel) div.mousewheel(function (e, d) {
				return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll)
			});
			if (o.auto) setInterval(function () {
				go(curr + o.scroll)
			},
			o.auto + o.speed);
			function vis() {
				return li.slice(curr).slice(0, v)
			};
			function go(to) {
				if (!running) {
					if (o.beforeStart) o.beforeStart.call(this, vis());
					if (o.circular) {
						if (to <= o.start - v - 1) {
							ul.css(animCss, -((itemLength - (v * 2)) * liSize) + "px");
							curr = to == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll
						} else if (to >= itemLength - v + 1) {
							ul.css(animCss, -((v) * liSize) + "px");
							curr = to == itemLength - v + 1 ? v + 1 : v + o.scroll
						} else curr = to
					} else {
						if (to < 0 || to > itemLength - v) return;
						else curr = to
					}
					running = true;
					ul.animate(animCss == "left" ? {
						left: -(curr * liSize)
					}: {
						top: -(curr * liSize)
					},
					o.speed, o.easing, function () {
						if (o.afterEnd) o.afterEnd.call(this, vis());
						running = false
					});
					if (!o.circular) {
						$(o.btnPrev + "," + o.btnNext).removeClass("disabled");
						$((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled")
					}
				}
				return false
			}
		})
	};
	function css(el, prop) {
		return parseInt($.css(el[0], prop)) || 0
	};
	function width(el) {
		return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight')
	};
	function height(el) {
		return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom')
	}
})(jQuery);
(function($)
{
    $.tiny = $.tiny ||
    {};
    $.tiny.carousel = {
        options:
        {
            start: 1,
            display: 1,
            axis: 'x',
            controls: true,
            pager: false,
            interval: false,
            intervaltime: 3000,
            rewind: false,
            animation: true,
            duration: 1000,
            callback: null
        }
    };
    $.fn.tinycarousel = function(options)
    {
        var options = $.extend(
        {}, $.tiny.carousel.options, options);
        this.each(function()
        {
            $(this).data('tcl', new Carousel($(this), options))
        });
        return this
    };
    $.fn.tinycarousel_start = function()
    {
        $(this).data('tcl').start()
    };
    $.fn.tinycarousel_stop = function()
    {
        $(this).data('tcl').stop()
    };
    $.fn.tinycarousel_move = function(iNum)
    {
        $(this).data('tcl').move(iNum - 1, true)
    };

    function Carousel(root, options)
    {
        var oSelf = this;
        var oViewport = $('.viewport:first', root);
        var oContent = $('.overview:first', root);
        var oPages = oContent.children();
        var oBtnNext = $('.next:first', root);
        var oBtnPrev = $('.prev:first', root);
        var oPager = $('.pager:first', root);
        var iPageSize, iSteps, iCurrent, oTimer, bPause, bForward = true,
            bAxis = options.axis == 'x';

        function initialize()
        {
            iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
            var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) - 1);
            iSteps = Math.max(1, Math.ceil(oPages.length / options.display) - iLeftover);
            iCurrent = Math.min(iSteps, Math.max(1, options.start)) - 2;
            oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length));
            oViewport.parent().addClass(bAxis ? '' : 'vertical');
            oSelf.move(1);
            setEvents();
            return oSelf
        };

        function setEvents()
        {
            if(options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0)
            {
                oBtnPrev.click(function()
                {
                    oSelf.move(-1);
                    return false
                });
                oBtnNext.click(function()
                {
                    oSelf.move(1);
                    return false
                })
            }
            if(options.interval)
            {
                root.hover(oSelf.stop, oSelf.start)
            }
            if(options.pager && oPager.length > 0)
            {
                $('a', oPager).click(setPager)
            }
        };

        function setButtons()
        {
            if(options.controls)
            {
                oBtnPrev.toggleClass('disable', !(iCurrent > 0));
                oBtnNext.toggleClass('disable', !(iCurrent + 1 < iSteps))
            }
            if(options.pager)
            {
                var oNumbers = $('.pagenum', oPager);
                oNumbers.removeClass('active');
                $(oNumbers[iCurrent]).addClass('active')
            }
        };

        function setPager(oEvent)
        {
            if($(this).hasClass('pagenum'))
            {
                oSelf.move(parseInt(this.rel), true)
            }
            return false
        };

        function setTimer()
        {
            if(options.interval && !bPause)
            {
                clearTimeout(oTimer);
                oTimer = setTimeout(function()
                {
                    iCurrent = iCurrent + 1 == iSteps ? -1 : iCurrent;
                    bForward = iCurrent + 1 == iSteps ? false : iCurrent == 0 ? true : bForward;
                    oSelf.move(bForward ? 1 : -1)
                }, options.intervaltime)
            }
        };
        this.stop = function()
        {
            clearTimeout(oTimer);
            bPause = true
        };
        this.start = function()
        {
            bPause = false;
            setTimer()
        };
        this.move = function(iDirection, bPublic)
        {
            iCurrent = bPublic ? iDirection : iCurrent += iDirection;
            if(iCurrent > -1 && iCurrent < iSteps)
            {
                var oPosition = {};
                oPosition[bAxis ? 'left' : 'top'] = -(iCurrent * (iPageSize * options.display));
                oContent.stop().animate(oPosition,
                {
                    queue: false,
                    duration: options.animation ? options.duration : 0,
                    easing: "swing",
                    complete: function()
                    {
                        if(typeof options.callback == 'function') options.callback.call(this, oPages[iCurrent], iCurrent)
                    }
                });
                setButtons();
                setTimer()
            }
        };
        return initialize()
    }
})(jQuery);
(function(a)
{
    a.wdxnewpost = function(c, b)
    {
        var d = this;
        d.$el = a(c);
        d.init = function()
        {
            d.options = a.extend(
            {}, a.wdxnewpost.defaultOptions, b);
            d.$el.html('<div class="wdxtaglistco ' + d.options.postType + '"><ul class="wdxnewponew"></ul></div>').addClass(d.options.loadingClass);
            a.get((d.options.blogURL === "" ? window.location.protocol + "//" + window.location.host : d.options.blogURL) + "/feeds/posts/default" + (d.options.tagName === false ? "" : "/-/" + d.options.tagName) + "?max-results=" + d.options.MaxPost + "&orderby=published&alt=json-in-script", function(B)
            {
                var E, h, D, r, H, t, G, s, q, w, F, y, C, n = "",
                    f = B.feed.entry;
                if(f !== undefined)
                {
                    for(var z = 0, p = f.length; z < p; z++)
                    {
                        for(var x = 0, v = f[z].link.length; x < v; x++)
                        {
                            if(f[z].link[x].rel == "alternate")
                            {
                                E = f[z].link[x].href;
                                break;
                            }
                        }
                        for(var u = 0, A = f[z].link.length; u < A; u++)
                        {
                            if(f[z].link[u].rel == "replies" && f[z].link[u].type == "text/html")
                            {
                                H = f[z].link[u].title.split(" ")[0];
                                break;
                            }
                        }
                        D = ("content" in f[z]) ? f[z].content.$t : ("summary" in f[z]) ? f[z].summary.$t : "";
                        var e = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                        t = a("<div></div>").append(D.replace(e, ""));
                        G = t.find("img");
                        if("media$thumbnail" in f[z])
                        {
                            s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.ImageSize);
                            if(f[z] === f[0] && d.options.postType !== "s")
                            {
                                s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.FirstImageSize)
                            }
                            else
                            {
                                if(f[z].media$thumbnail.url.indexOf("img.youtube.com") != -1)
                                {
                                    s = f[z].media$thumbnail.url.replace("default", "0")
                                }
                            }
                        }
                        else
                        {
                            if(G.length != 0)
                            {
                                s = G[0].src
                            }
                            else
                            {
                                s = d.options.pBlank
                            }
                        }
                        D = D.replace(/<\S[^>]*>/g, "");
                        if(D.length > d.options.Summarylength)
                        {
                            D = D.substring(0, d.options.Summarylength) + "..."
                        }
                        h = f[z].title.$t;
                        C = f[z].published.$t.substring(0, 10);
                        q = C.substring(0, 4);
                        w = C.substring(5, 7);
                        F = C.substring(8, 10);
                        y = d.options.MonthNames[parseInt(w, 10) - 1];
                        n += '<li class="a' + z + '"><div class="inner" ><a title="' + h + '" class="imagethubnailwithtagin" href="' + E + '"><img src="' + s + '"/></a><strong><a href="' + E + '">' + h + '</a></strong><div class="info">' + (d.options.ShowDate === true ? '<span id="dayclass">' + y + " " + F + ", " + q + "</span>" : "") + (d.options.ShowComment === true ? '<span id="comclass"><a href="' + E + '#comment-form">' + H + "</a> Comment(s)</span>" : "") + "</div><p " + (d.options.ShowDesc === false ? "" : 'style="display:block"') + ">" + D + "</p></div></li>"
                    }
                    a("ul", d.$el).append(n);
                    if(d.options.postType === "s")
                    {
                        var o = a(c).parents(".widget");
                        var I = o.children("h2");
                        if(d.options.tagName != false)
                        {
                            I.wrapInner('<a href="/search/label/' + encodeURIComponent(d.options.tagName) + '"/>')
                        }
                        var m, g;
                        var k = d.$el.width();
                        if(a(window).width() < 479)
                        {
                            g = 1;
                            m = k / g
                        }
                        else
                        {
                            if(a(window).width() < 979)
                            {
                                g = 2;
                                m = k / g
                            }
                            else
                            {
                                if(a(window).width() < 1025)
                                {
                                    g = 3;
                                    m = k / g
                                }
                                else
                                {
                                    g = 4;
                                    m = k / g
                                }
                            }
                        }
                        a(".wdxtaglistco", d.$el).flexslider(
                        {
                            animation: "slide",
                            selector: ".wdxnewponew > li",
                            animationLoop: true,
                            itemWidth: m,
                            minItems: 1,
                            move: g,
                            mousewheel: true,
                            maxItems: 3
                        });
                        d.$el.removeClass(d.options.loadingClass)
                    }
                    else
                    {}
                    d.$el.removeClass(d.options.loadingClass)
                }
                else
                {
                    d.$el.html("<span>No result! Or Error Loading Feed</span>")
                }
            }, "jsonp")
        };
        d.init()
    };
    a.wdxnewpost.defaultOptions = {
        blogURL: "",
        MaxPost: 6,
        FirstImageSize: "s360-p",
        ImageSize: "s200-p",
        ShowDesc: false,
        ShowDate: true,
        ShowComment: true,
        Summarylength: 170,
        postType: "v",
        loadingClass: "loadingxxnewcontent",
        pBlank: "//cdn.phimini.com/ColorRespMov/img/grey.png",
        MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tagName: false
    };
    a.fn.wdxnewpost = function(b)
    {
        return this.each(function()
        {
            (new a.wdxnewpost(this, b))
        })
    }
})(jQuery);

/***************
jQuery.cookie
***************/

jQuery(document).ready(function() {
	jQuery.cookie = function (key, value, options) {
		if (arguments.length > 1 && String(value) !== "[object Object]") {
			options = jQuery.extend({},
			options);
			if (value === null || value === undefined) {
				options.expires = -1
			}
			if (typeof options.expires === 'number') {
				var days = options.expires,
				t = options.expires = new Date();
				t.setDate(t.getDate() + days)
			}
			value = String(value);
			return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value: encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path: '', options.domain ? '; domain=' + options.domain: '', options.secure ? '; secure': ''].join(''))
		}
		options = value || {};
		var result, decode = options.raw ?
		function (s) {
			return s
		}: decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
	};
});
/**
 * Facebook Like to Reveal Content
 *
 * @author PreScriptZ.com
 * @package Like2Reveal
 * @version 1.0.0
 *
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6($){"1l 1m";$.g=6(M){c I={\'1i\':\'1a-g\',\'j\':\'\',\'1n\':C,\'2b\':D,\'1F\':D,\'2a\':D};c 5=1T;5.7={};c q=n,d=n,H=n;5.B=6(){5.7=$.1V({},I,M);1j();1v();k 5};5.1r=6(j){8(5.1x())k;5.q.h({\'F\':\'Q\',R:0}).1h({R:1},1y);5.d.h(\'F\',\'Q\');1G(j);1f()};5.r=6(){5.d.1Q("1K",6(){5.q.h({\'F\':\'29\',R:1}).1h({R:0},1y);$(\'f\').28(\'H.1a-g\')})};5.1x=6(){k 5.d.h(\'F\')==\'Q\'?C:D};c 1v=6(){8(5.7.1F){$(2f).G(\'16 T\',\'.m\',6(e){8($(e.1s).2e(\'H\')||$(e.1s).2h(\'.m\').A==0){5.r()}}).G(\'21\',6(e){8(e.1X==27){5.r()}}).G(\'T\',\'.J a.H\',6(){5.r()})}$(u).G(\'1W\',6(){1f()});8(5.7.1n)5.1r()},1j=6(){8($(\'f\').p(\'.m\').A==0){5.q=$(\'<z />\',{\'x\':\'m\'}).S(\'f\')}l{5.q=$(\'f\').p(\'.m\')}8(5.q.p(\'.J\').A==0){5.d=$(\'<z />\',{\'x\':\'J \'+5.7.1i}).S($(\'f\'))}l{5.d=$(\'f\').p(\'.J\');1Z(1)}},1f=6(){5.d.h({24:\'1Y\',2c:1E.1z(0,((y(u).2v()-5.d.2i())/2))+"1u", 2x:1E.1z(0,((y(u).1g()-5.d.2y())/2))+"1u"})},2A=6(){5.d.12();5.q.12()},1G=6(j){8(j!=\'\'&&j!==W){5.d.t(j)}l 8(5.7.j!=\'\'){5.d.t(5.7.j)}l 8($(\'f\').p(\'.g-1w\').A){5.d.t($(\'.g-1w\').t())}l{5.d.t(\'\')}};k 5.B()}})(y);8(1t U!=\'W\'&&1t 2p==\'W\'){U.1D.1B(\'1C.2u\',6(1k){y.1p(1q,1A,{2t:1A,1o:\'/\'});1e.r()});U.1D.1B(\'1C.12\',6(1k){y.1p(1q,\'0\',{1o:\'/\'})})}(6($){"1l 1m";$.1U=6(M){c I={2z:\'1a-1U\',b:\'\',9:\'\',14:V,2r:C,E:C,1b:D,L:{15:\'2q 15 2s \',17:\'17(s)\',Z:\'Z(s)\'}};c 4=1T;c b=n,9=n,N=n,1c=n;c o,O,K,w,E;c 11,13,X;4.7={};4.B=6(18){8(!18)4.7=$.1V({},I,M);8(4.7.14==0)k;4.1c=4.o=4.7.14;4.E=4.7.E;4.w=1;4.K=0;4.X=4.7.L.15;4.11=4.7.L.17;4.13=4.7.L.Z;1I();$(4.b).t(19());8(!18)4.1H();k 4};4.1H=6(){4.N=1J(6(){4.1R()},1M)};4.1R=6(){4.b=$(\'.\'+$(4.b).1P(\'x\'));4.9=$(\'.\'+$(4.9).1P(\'x\'));8(4.o==1&&4.w%10==0){u.1d(4.N);4.b.1Q(\'1K\',6(){c i=23;c Y=n;Y=1J(6(){4.b.P().1L(\'g-v-9-\'+i);4.9.1L(\'g-v-9-\'+i);i--;8(i<=3){u.1d(Y);8(4.E)2o(6(){1e.r()},2k);l{8(!4.7.1b){$(\'.m\').h({\'1N\':\'2j(2l/H.2m), 2n-2w\'});$(\'.m\').G(\'16 T\',6(){1e.r()})}}}},20)})}4.K+=(1M/4.1c/10);$(4.9).h(\'1g\',4.K+\'%\');8(4.w%10==0){$(4.b).t(19());4.o--;4.w=1}l 4.w++};4.22=6(){u.1d(4.N);25(c i=23;i>=3;i--){4.b.P().1O(\'g-v-9-\'+i);$(\'z.g-v-9\',4.b.P()).1O(\'g-v-9-\'+i)};4.b.h({\'F\':\'Q\'});$(\'z.g-v-9\',4.b.P()).h({\'1g\':\'0\'});8(!4.7.1b){$(\'.m\').h({\'1N\':\'2g-2d\'}).26(\'16 T\')}4.B(C);k 4};c 1I=6(){8($(\'f\').p(\'.\'+4.7.b).A==0){4.b=$(\'<z />\',{\'x\':4.7.b}).S(\'f\')}l{4.b=$(\'.\'+4.7.b)}8(4.7.9!=\'\'){8($(\'f\').p(\'.\'+4.7.9).A==0){4.9=$(\'<z />\',{\'x\':4.7.9}).S(\'f\')}l{4.9=$(\'.\'+4.7.9)}}};c 19=6(){c O=1S(4.o/V);c o=1S(4.o%V);k 4.X+\' \'+(O>0?O+\' \'+4.11:\'\')+\' \'+o+\' \'+4.13};k 4.B()}})(y);',62,161,'||||Instance|ANP|function|settings|if|bar||counter|var|popup||body|Like2Reveal|css|barChange|content|return|else|Like2Reveal_overlay|null|seconds_left|find|overlay|hide||html|window|loading|bTextChange|class|jQuery|div|length|init|true|false|hide_blocker|display|on|close|defaults|Like2Reveal_wrapper|bar_level|labels|options|interval|minutes|parent|block|opacity|appendTo|click|FB|60|undefined|labelWait|cInterval|second||labelMinute|remove|labelSecond|timeout|wait|touchstart|minute|bReset|_1|PSZ|isClosable|seconds|clearInterval|PSZ_Like2Reveal|_0|width|animate|popup_class|_3|response|use|strict|autoShow|path|cookie|PSZ_Like2Reveal_cookie|show|target|typeof|px|_2|container|opening|500|max|365|subscribe|edge|Event|Math|turnOFF|_4|run|_5|setInterval|slow|addClass|100|cursor|removeClass|attr|fadeOut|_6|parseInt|this|Countdown|extend|resize|keyCode|fixed|alert||keyup|reset||position|for|off||trigger|none|reOpen|closeButton|top|drop|hasClass|document|no|parents|outerHeight|url|300|common|png|all|setTimeout|PSZ_Like2Reveal_preview_mode|Please|auto_show|in|expires|create|height|scroll|left|outerWidth|class_name|_7'.split('|'),0,{}));


/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});
