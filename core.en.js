/* -----------------------------------------------
Colorful Responsive Movie Skin for Blogger
By		: Phimini.com
URL		: http://www.phimini.com/
----------------------------------------------- */

var custom_categories_enabled = true,	// turn OFF if use Blogger's category system
	num_latest_post_by_author = 6,		// max latest movies to list
	num_related_posts = num_recent_posts = 8,	// max movies to list for Related & Recent sections
	dynamic_content = true,				// lazy-load option, set FALSE to load all movie detailed page
	latest_by_author_loaded = related_posts_loaded = false, // use with dynamic_content only
	no_img_url = '//raw.githubusercontent.com/mariahazel/BloggersZ/master/img/no-img.png'; /* //googledrive.com/host/0B-YUEkR0CdcwOXZUYjNobzV5dlk */

var imgr = new Array();
imgr[0] = no_img_url;

var showRandomImg = true;			// if movie page has more than 1 image, random to show as thumbnail; FALSE=first image

/* pagination settings */
var pageCount = 12;					// number movies showed per page, MUST be SAME VALUE in Blogger's Configure Blog Posts
var displayPageNum = 2;				// number pages displayed
var upPageWord ='&#171; newer';
var downPageWord ='older &#187;';
var home_page_url = location.href, 
	thisUrl = home_page_url;

var policy_content = "<b><a href='http://www.prescriptz.com/'>PREScriptZ.com</a></b> collects all movies from Google, Youtube, DailyMotion ... and other free resources.<br/><b><a href='http://www.prescriptz.com/'>PREScriptZ.com</a></b> is not responsible for any content that not published by <b><a href='http://www.prescriptz.com/'>PREScriptZ.com</a></b>.<br/>Please contact, <b><a href='http://www.prescriptz.com/'>PREScriptZ.com</a></b> is willing to remove copyright materials immediately<br/>All movies found on this website are hosted on third-party servers that are freely available to watch online for all internet users. Any legal issues regarding the free online movies on this website should be taken up with the actual file hosts themselves, as we\'re not affiliated with them.",

	page_loading_msg = 'Loading ...',					// loading text for page transitions
	vid_loading_msg = 'Loading, please wait ...',		// loading message for switching movie servers
	next_post_msg = 'Newer movie',							// label text for next movie button
	prev_post_msg = 'Older movie',							// label text for previous movie button
	light_on_msg = 'Light ON',							// label text for light switcher
	light_off_msg = 'Light OFF', 	// MUST be SAME TEXT in your SYSTEM configs
	latest_by_author_msg = 'Latest movies by ',	// label text for lazy-load option
	like2reveal_wait_msg = 'or please wait',	// Like2Reveal message, viewers must like to keep watching the movie
	like2reveal_timeout = 15,							// or wait timeout(default: 15 seconds) to keep watching
	like2reveal_min_msg = 'minute(s)',
	like2reveal_sec_msg = 'second(s)',
	vid_error_msg = 'Error: Movie can not be loaded',			// contact subject to report error movie
	vid_more = 'Message: ',
	or_msg = 'or',
	go_custom_page_msg = 'Enter page number you want to go',
	go_custom_page_error_msg = 'Error! Only numberic accept'
	;

/************************
DO NOT CHANGE FROM HERE
*************************/
var PSZ_Like2Reveal_cookie = 'PSZ-APP-L2R-//www.facebook.com/PREScriptZ';
var PSZ_Like2Reveal = PSZ_Like2Reveal_counter = recall_blocker_timeout = null;

var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
var htmlMap = new Array();

String.prototype.toKeywords = function() {
	var r, re = new Array();
	r = this.replace(/[0-9_-]|\(|\)+/g, "").split(' ');
								
	for(i=0,j=0; i<r.length; i++) {
		if( r[i]!='' )
			re[j++] = r[i];
	}
	return re;
};
function title_split(title) {
	vi_title = title.match(/\(([^)]+)\)/)[1];
	en_title = title.replace(/ *\([^)]*\) */g, "");
				
	return en_title + '<br/>' + (vi_title!='' ? '('+vi_title+')' : '');
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : results[1];
}

function lazying(part, paras) {
	jQuery(document).scroll(function(){
		posTopMargin = jQuery(window).scrollTop() + 100;
		switch( part ) {
			case 'latest_by_author':
				if( jQuery('.author-profile').length <= 0 )
					return;
				if( !latest_by_author_loaded ) {
					if( !dynamic_content || jQuery('.author-profile').offset().top<=posTopMargin) {
						jQuery.getScript('/feeds/posts/default/-/phimini.com?q='+paras+'&alt=json-in-script&callback=latest_by_author&max-results='+num_latest_post_by_author);
						latest_by_author_loaded = true;
					}
					/*if( jQuery('.media-player').offset().top <= posTopMargin ) {
						jQuery.getScript('http://testphimpd.blogspot.com/feeds/posts/default/-/phimini.com?q='+paras+'&alt=json-in-script&callback=latest_by_author&max-results='+num_latest_post_by_author);
						latest_by_author_loaded = true;
					*/
				}
				break;
			case 'related_posts':
				if( jQuery('.author-profile').length <= 0 )
					return;
				if( !related_posts_loaded ) {
					if( !dynamic_content || jQuery('.author-profile').offset().top<=posTopMargin ) {
						jQuery.getScript('/feeds/posts/default/-/phimini.com?q='+paras+'&alt=json-in-script&callback=related_results_labels_thumbs2&max-results='+num_related_posts);
						related_posts_loaded = true;
					}
				}
				break;
		}
	});
}

function resetBackTopButton($) {
	if( $('.back_to_top').length ) {
		posLeft = $('#outer-wrapper').offset().left + $('#outer-wrapper').outerWidth();
		if( posLeft + $('.back_to_top').outerWidth() > $(window).width() )
			posLeft -= ($('.back_to_top').outerWidth() + 5);

		$('.back_to_top').css({left: posLeft});
	}
}

function resetVideoToolbar() {
	if( $('.video-reporter').length ) {
		posLeft = $('#outer-wrapper').offset().left + $('#outer-wrapper').outerWidth();
		if( posLeft + $('.video-reporter').outerWidth() > $(window).width() )
			posLeft -= ($('.video-reporter').outerWidth() + 5);

		$('.video-reporter').css({left: posLeft});
	}
}

function resetMobileSearchButton(clicked) {
	if( clicked ) {
		$('.headline-left').toggle();
		$('.headline-right').toggle();
		$('.searchform').toggle();
		return;
	}
	
	/* rerender mobile search button */

	$('.headline-left').show();
	$('.headline-right').show();
	if( $(window).width() < 520 ) {
		$('.searchform').hide();
		$('.mobile-search-button').removeClass('active').show();
	}
	else {
		$('.searchform').show();
		$('.mobile-search-button').addClass('active').hide();
	}
}
function contact_modal() {
	$('.contact-form-widget form').modal();
	return false;
}
function removeHtmlTag(strx, chop) {
    if (strx.indexOf("<") != -1) {
        var s = strx.split("<");
        for (var i = 0; i < s.length; i++) {
            if (s[i].indexOf(">") != -1) {
                s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length)
            }
        }
        strx = s.join("")
    }
    chop = (chop < strx.length - 1) ? chop : strx.length - 2;
    while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
    strx = strx.substring(0, chop - 1);
    return strx + '...'
}
function masSummaryAndThumb(mas1, mas2) {
    var div = document.getElementById(mas1);
    var imgtag = "";
    var img = div.getElementsByTagName("img");
    var summ = 600;
    if (img.length >= 1) {
        imgtag = '<a href="' + mas2 + '"><span style="float:left; padding:0px 10px 0px 0px;"><img src="' + img[0].src + '" width="210px" height="275px"/></span></a>';
        summ = 600
    }
	
	moinfo = '<div class="entry">';
	if( $(div).find('ul.tab-content li.active').length ) {
		moinfo += $(div).find('ul.tab-content li.active').html();
	}
	if( $(div).find('ul.tab-content li').eq(1).length ) {
		moinfo += '<br/><br/>' + $(div).find('ul.tab-content li').eq(1).html().split(/<br\s*\/?>/)[0] + '...';
	}
	moinfo += '</div>';
	
	var summary = imgtag + moinfo;
    div.innerHTML = summary;
}

function showrecentposts(json) {
	j = (showRandomImg) ? Math.floor((imgr.length + 1) * Math.random()) : 0;
	img = new Array();
	document.write('<ul>');
	counter = num_recent_posts > json.feed.entry.length ? json.feed.entry.length : num_recent_posts;
	for (var i = 0; i < counter; i++) {
		var entry = json.feed.entry[i];
		var posttitle = entry.title.$t;
		if( posttitle == '') continue;
		var pcm;
		var posturl;
		if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'alternate') {
				posturl = entry.link[k].href;
				break
			}
		}
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
				pcm = entry.link[k].title.split(" ")[0];
				break
			}
		}
		if ("content" in entry) {
			var postcontent = entry.content.$t
		} else if ("summary" in entry) {
			var postcontent = entry.summary.$t
		} else var postcontent = "";
		postdate = entry.published.$t;
		if (j > imgr.length - 1) j = 0;
		img[i] = imgr[j];
		s = postcontent;
		a = s.indexOf("<img");
		b = s.indexOf("src=\"", a);
		c = s.indexOf("\"", b + 5);
		d = s.substr(b + 5, c - b - 5);
		if ((a != -1) && (b != -1) && (c != -1) && (d != "")) img[i] = d;
		else if(undefined!=entry.media$thumbnail) img[i] = entry.media$thumbnail.url.replace("s72-c/", "");
		else img[i] = imgr[0];
		var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		var month2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var day = postdate.split("-")[2].substring(0, 2);
		var m = postdate.split("-")[1];
		var y = postdate.split("-")[0];
		for (var u2 = 0; u2 < month.length; u2++) {
			if (parseInt(m) == month[u2]) {
				m = month2[u2];
				break
			}
		}
		vi_title = /\(([^)]+)\)/.test(posttitle) ? posttitle.match(/\(([^)]+)\)/)[1] : '';
		en_title = posttitle.replace(/ *\([^)]*\) */g, "");
				
		posttitle = en_title + (vi_title!=''?'<br/>('+vi_title+')':'');
		var daystr = day + ' ' + m + ' ' + y;
		var trtd = '<li class="car"><div class="thumb"><a href="' + posturl + '"><img width="308" height="400" class="alignnone" src="' + img[i] + '"/></a></div><a class="slider_title" href="' + posturl + '">' + posttitle + '</a></li>';
		document.write(trtd);
		j++
	}
	document.write('</ul>')
}

function related_results_labels_thumbs(json) {
	for (var i = 0; i < json.feed.entry.length; i++) {
		var entry = json.feed.entry[i];

		relatedTitles[relatedTitlesNum] = entry.title.$t != undefined ? entry.title.$t : '';
		try {
			thumburl[relatedTitlesNum] = entry.gform_foot.url
		} catch(error) {
			if( undefined == entry.content )
				return;

			s = entry.content.$t;
			a = s.indexOf("<img");
			b = s.indexOf("src=\"", a);
			c = s.indexOf("\"", b + 5);
			d = s.substr(b + 5, c - b - 5);
	
			if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
				thumburl[relatedTitlesNum] = d
			} else thumburl[relatedTitlesNum] = no_img_url;
		}
		if (relatedTitles[relatedTitlesNum].length > 35) relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 35) + "...";
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'alternate') {
				relatedUrls[relatedTitlesNum] = entry.link[k].href;
				relatedTitlesNum++
			}
		}
	}
}
function related_results_labels_thumbs2(json) {
	//if (json.feed.entry.length > 0) $('#related-posts').append( '<h1>'+relatedpoststitle+'</h1> <div style="clear:both;"/>');

	listing_posts = '';
	len = num_related_posts < json.feed.entry.length ? num_related_posts : json.feed.entry.length;

	for (var i = 0; i < len; i++) {
		var entry = json.feed.entry[i];
		if(entry == undefined ) return;
		var posttitle = entry.title.$t != undefined ? entry.title.$t : '';
		if( posttitle == '') continue;
		var pcm, postimg = no_img_url;
		var posturl;
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'alternate') {
				posturl = entry.link[k].href;
				break
			}
		}
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
				pcm = entry.link[k].title.split(" ")[0];
				break
			}
		}
		if ("content" in entry) {
			var postcontent = entry.content.$t
		} else if ("summary" in entry) {
			var postcontent = entry.summary.$t
		} else var postcontent = "";
		postdate = entry.published.$t;
		
		s = postcontent;
		a = s.indexOf("<img");
		b = s.indexOf("src=\"", a);
		c = s.indexOf("\"", b + 5);
		d = s.substr(b + 5, c - b - 5);
		if ((a != -1) && (b != -1) && (c != -1) && (d != "")) postimg = d;
		else postimg = entry.media$thumbnail.url.replace("s72-c/", "");
		
		vi_title = posttitle.match(/\(([^)]+)\)/)[1];
		en_title = posttitle.replace(/ *\([^)]*\) */g, "");

		posttitle = en_title + (vi_title!='' ? '<br/>('+vi_title+')' : '');

		//$('#related-posts').append( '<a href="'+posturl+'"><img class="maskolis_img" src="'+postimg+'"/><br/><div>'+posttitle+'</div></a> ');
		listing_posts += '<a href="'+posturl+'"><img class="maskolis_img" src="'+postimg+'"/><br/><div>'+posttitle+'</div></a> ';
	}
	if( listing_posts!= '' )
		$('#related-posts').append('<h1>'+relatedpoststitle+'</h1> <div style="clear:both;"/>' + listing_posts);
}
function latest_by_author(json) {
	if (json.feed.entry.length > 0) {
		len = num_latest_post_by_author < json.feed.entry.length ? num_latest_post_by_author : json.feed.entry.length;
		//$('.author-profile').append('<div class="pro-by"><br/><h4>'+latest_by_author_msg+latest_by_author_name+'</h4>');
		
		listing_posts = '';
		for (var i = 0; i < len; i++) {
			var entry = json.feed.entry[i];
			if(entry == undefined ) continue;
			var posttitle = entry.title.$t;
			if( posttitle == '') continue;
			var postimg = no_img_url;
			var posturl;
			for (var k = 0; k < entry.link.length; k++) {
				if (entry.link[k].rel == 'alternate') {
					posturl = entry.link[k].href;
					break
				}
			}
			if ("content" in entry) {
				var postcontent = entry.content.$t
			} else if ("summary" in entry) {
				var postcontent = entry.summary.$t
			} else var postcontent = "";
			postdate = entry.published.$t;
			
			s = postcontent;
			a = s.indexOf("<img");
			b = s.indexOf("src=\"", a);
			c = s.indexOf("\"", b + 5);
			d = s.substr(b + 5, c - b - 5);
			if ((a != -1) && (b != -1) && (c != -1) && (d != "")) postimg = d;
			else postimg = entry.media$thumbnail.url.replace("s72-c/", "");
					
			posttitle = title_split(posttitle);

			//$('.pro-by').append( '<a href="'+posturl+'"><img src="'+postimg+'"/><br/>'+posttitle+'</a> ');
			listing_posts += '<a href="'+posturl+'"><img src="'+postimg+'"/><br/>'+posttitle+'</a> ';
		}
		if( listing_posts!= '' )
			$('.author-profile').append('<div class="pro-by"><br/><h4>'+latest_by_author_msg+latest_by_author_name+'</h4>'+listing_posts+'</div>');
	}
}
function removeRelatedDuplicates_thumbs() {
	var tmp = new Array(0);
	var tmp2 = new Array(0);
	var tmp3 = new Array(0);
	for (var i = 0; i < relatedUrls.length; i++) {
		if (!contains_thumbs(tmp, relatedUrls[i])) {
			tmp.length += 1;
			tmp[tmp.length - 1] = relatedUrls[i];
			tmp2.length += 1;
			tmp3.length += 1;
			tmp2[tmp2.length - 1] = relatedTitles[i];
			tmp3[tmp3.length - 1] = thumburl[i]
		}
	}
	relatedTitles = tmp2;
	relatedUrls = tmp;
	thumburl = tmp3
}
function contains_thumbs(a, e) {
	for (var j = 0; j < a.length; j++) if (a[j] == e) return true;
	return false;
}
function printRelatedLabels_thumbs() {
	for (var i = 0; i < relatedUrls.length; i++) {
		if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
			relatedUrls.splice(i, 1);
			relatedTitles.splice(i, 1);
			thumburl.splice(i, 1);
			i--
		}
	}
	var r = Math.floor((relatedTitles.length - 1) * Math.random());
	var i = 0;
	if (relatedTitles.length > 0) document.write('<h1>' + relatedpoststitle + '</h1>');
	document.write('<div style="clear:both;"/>');
	while (i < relatedTitles.length && i < 20 && i < maxresults) {
		document.write('<a style="text-decoration:none;margin:0 10px 10px 0;float:left;background:#e6e6e6 url(//raw.githubusercontent.com/mariahazel/BloggersZ/master/img/bar-bg.png) repeat-x top;border:1px solid #c9c9c9;');
		if (i != 0) document.write('"');
		else document.write('"');
		document.write(' href="' + relatedUrls[r] + '"><img class="maskolis_img" src="' + thumburl[r] + '"/><br/><div style="width:190px;padding:0 10px;color:#4B4444;height:38px;text-align:center;margin:0px 0px; font-size:12px; line-height:16px;">' + relatedTitles[r] + '</div></a>');
		if (r < relatedTitles.length - 1) {
			r++
		} else {
			r = 0
		}
		i++
	}
	document.write('</div>');
	relatedUrls.splice(0, relatedUrls.length);
	thumburl.splice(0, thumburl.length);
	relatedTitles.splice(0, relatedTitles.length)
}

function showpageCount(json) {
    var thisUrl = home_page_url;
    //var htmlMap = new Array();
    var thisNum = 1;
    var postNum = 1;
    var itemCount = 0, fFlag = 0, eFlag = 0;
    var html 			= '',
		upPageHtml		= '',
		downPageHtml	= '',
		firstPage		= '',
		lastPage		= '';

	var q = getParameterByName('q');
	if( q != '' )
		q = 'q=' + q + '&';
	else q = '';
	
    for (var i = 0, post; post = json.feed.entry[i]; i++) {
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        timestamp = encodeURIComponent(timestamp1);
        var title = post.title.$t;
        if (title != '') {
            if (itemCount == 0 || (itemCount % pageCount == (pageCount - 1))) {
                if (thisUrl.indexOf(timestamp) != -1) {
                    thisNum = postNum;
                }
                if (title != '') postNum++;
                htmlMap[htmlMap.length] = '/search?' + q + 'updated-max=' + timestamp + '&max-results=' + pageCount;
            }
        }
        itemCount++;
    }
	//alert(htmlMap);
	// loop all posts then divide to pages
    for (var p = 0; p < htmlMap.length; p++) {
        if (p >= (thisNum - displayPageNum - 1) && p < (thisNum + displayPageNum)) {
            if( fFlag==0 && /* p==(thisNum-2) */ thisNum>(displayPageNum+1) ) {
				upPageHtml = '<span class="showpage firstPage"><a href="' + htmlMap[thisNum-2] + '">' + upPageWord + '</a></span>';
                /* if (thisNum == 2) {
                    upPageHtml = '<span class="showpage"><a href="/">' + upPageWord + '</a></span>';
                } else {
                    upPageHtml = '<span class="showpage"><a href="' + htmlMap[p] + '">' + upPageWord + '</a></span>';
                } */
                fFlag++;
            }
			
            if ( eFlag==0 && /* p == thisNum */ (thisNum+2)<htmlMap.length ) {
                downPageHtml = '<span class="showpage lastPage"> <a href="' + htmlMap[thisNum] + '">' + downPageWord + '</a></span>';
                eFlag++;
            }

            if (p == (thisNum - 1)) {
                html += '<span class="showpagePoint currentPage">' + thisNum + '</span>';
            } else {
                if (p==0) {
                    html += '<span class="showpageNum"><a href="/">1</a></span>';
                } else {
                    html += '<span class="showpageNum"><a href="' + htmlMap[p] + '">' + (p + 1) + '</a></span>';
                }
            }
        }
    }
	
	// first page
	//alert(html);
	if( thisNum>(displayPageNum+1) )
		firstPage = '<span class="showpage firstPage"><a href="/">1..</a></span>';
		//firstPage = '<span class="showpage firstPage"><a href="' + htmlMap[0] + '">1..</a></span>';

	// last page
	if( (thisNum+displayPageNum)<htmlMap.length )
		lastPage = '<span class="showpage lastPage"> <a href="' + htmlMap[htmlMap.length-1] + '">..' + htmlMap.length + '</a></span>';
	
	//alert(thisNum);
	//alert('p: ' + p + "\nthisNum: " + thisNum + "\ntotal: "+(postNum - 1));
    if (thisNum >= 1) {
        html = '' + upPageHtml + firstPage  + ' ' + html + ' ';
    }
    html = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages (' + (postNum - 1) + ')</span>' + html + lastPage;
    if (thisNum < (postNum - 1)) {
        html += downPageHtml;
    }
    if (postNum == 1) postNum++;
    html += '</div>';
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    if (postNum <= 2) {
        html = '';
    }
    for (var p = 0; p < pageArea.length; p++) {
        pageArea[p].innerHTML = html;
    }
    if (pageArea && pageArea.length > 0) {
        html = '';
    }
    if (blogPager) {
        blogPager.innerHTML = html;
    }
}

function showpageCount2(json) {
    var thisUrl = home_page_url;
    var htmlMap = new Array();
    var isLablePage = thisUrl.indexOf("/search/label/") != -1;
    var thisLable = isLablePage ? thisUrl.substr(thisUrl.indexOf("/search/label/") + 14, thisUrl.length) : "";
    thisLable = thisLable.indexOf("?") != -1 ? thisLable.substr(0, thisLable.indexOf("?")) : thisLable;
    var thisNum = 1;
    var postNum = 1;
    var itemCount = 0;
    var fFlag = 0;
    var eFlag = 0;
    var html = '';
    var upPageHtml = '';
    var downPageHtml = '';
    var labelHtml = '<span class="showpageNum"><a href="/search/label/' + thisLable + '?&max-results=' + pageCount + '">';
    var thisUrl = home_page_url;
    for (var i = 0, post; post = json.feed.entry[i]; i++) {
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        timestamp = encodeURIComponent(timestamp1);
        var title = post.title.$t;
        if (title != '') {
            if (itemCount == 0 || (itemCount % pageCount == (pageCount - 1))) {
                if (thisUrl.indexOf(timestamp) != -1) {
                    thisNum = postNum;
                }
                if (title != '') postNum++;
                htmlMap[htmlMap.length] = '/search/label/' + thisLable + '?updated-max=' + timestamp + '&max-results=' + pageCount;
            }
        }
        itemCount++
    }
    for (var p = 0; p < htmlMap.length; p++) {
        if (p >= (thisNum - displayPageNum - 1) && p < (thisNum + displayPageNum)) {
            if (fFlag == 0 && p == thisNum - 2) {
                if (thisNum == 2) {
                    upPageHtml = labelHtml + upPageWord + '</a></span>';
                } else {
                    upPageHtml = '<span class="showpage"><a href="' + htmlMap[p] + '">' + upPageWord + '</a></span>';
                }
                fFlag++
            }
            if (p == (thisNum - 1)) {
                html += '<span class="showpagePoint">' + thisNum + '</span>';
            } else {
                if (p == 0) {
                    html = labelHtml + '1</a></span>';
                } else {
                    html += '<span class="showpageNum"><a href="' + htmlMap[p] + '">' + (p + 1) + '</a></span>';
                }
            }
            if (eFlag == 0 && p == thisNum) {
                downPageHtml = '<span class="showpage"> <a href="' + htmlMap[p] + '">' + downPageWord + '</a></span>';
                eFlag++;
            }
        }
    }
    if (thisNum > 1) {
        if (!isLablePage) {
            html = '' + upPageHtml + ' ' + html + ' ';
        } else {
            html = '' + upPageHtml + ' ' + html + ' ';
        }
    }
    html = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages (' + (postNum - 1) + ')</span>' + html;
    if (thisNum < (postNum - 1)) {
        html += downPageHtml;
    }
    if (postNum == 1) postNum++;
    html += '</div>';
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    if (postNum <= 2) {
        html = '';
    }
    for (var p = 0; p < pageArea.length; p++) {
        pageArea[p].innerHTML = html;
    }
    if (pageArea && pageArea.length > 0) {
        html = '';
    }
    if (blogPager) {
        blogPager.innerHTML = html;
    }
}
/* function showpageCount(json){var thisUrl=home_page_url;var htmlMap=new Array();var thisNum=1;var postNum=1;var itemCount=0;var fFlag=0;var eFlag=0;var html='';var upPageHtml='';var downPageHtml='';for(var i=0,post;post=json.feed.entry[i];i++){var timestamp1=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);timestamp=encodeURIComponent(timestamp1);var title=post.title.$t;if(title!=''){if(itemCount==0||(itemCount%pageCount==(pageCount-1))){if(thisUrl.indexOf(timestamp)!=-1){thisNum=postNum}if(title!='')postNum++;htmlMap[htmlMap.length]='/search?updated-max='+timestamp+'&max-results='+pageCount}}itemCount++}for(var p=0;p<htmlMap.length;p++){if(p>=(thisNum-displayPageNum-1)&&p<(thisNum+displayPageNum)){if(fFlag==0&&p==thisNum-2){if(thisNum==2){upPageHtml='<span class="showpage"><a href="/">'+upPageWord+'</a></span>'}else{upPageHtml='<span class="showpage"><a href="'+htmlMap[p]+'">'+upPageWord+'</a></span>'}fFlag++}if(p==(thisNum-1)){html+='<span class="showpagePoint">'+thisNum+'</span>'}else{if(p==0){html+='<span class="showpageNum"><a href="/">1</a></span>'}else{html+='<span class="showpageNum"><a href="'+htmlMap[p]+'">'+(p+1)+'</a></span>'}}if(eFlag==0&&p==thisNum){downPageHtml='<span class="showpage"> <a href="'+htmlMap[p]+'">'+downPageWord+'</a></span>';eFlag++}}}if(thisNum>1){html=''+upPageHtml+' '+html+' '}html='<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages ('+(postNum-1)+')</span>'+html;if(thisNum<(postNum-1)){html+=downPageHtml}if(postNum==1)postNum++;html+='</div>';var pageArea=document.getElementsByName("pageArea");var blogPager=document.getElementById("blog-pager");if(postNum<=2){html=''}for(var p=0;p<pageArea.length;p++){pageArea[p].innerHTML=html}if(pageArea&&pageArea.length>0){html=''}if(blogPager){blogPager.innerHTML=html}}
function showpageCount2(json){var thisUrl=home_page_url;var htmlMap=new Array();var isLablePage=thisUrl.indexOf("/search/label/")!=-1;var thisLable=isLablePage?thisUrl.substr(thisUrl.indexOf("/search/label/")+14,thisUrl.length):"";thisLable=thisLable.indexOf("?")!=-1?thisLable.substr(0,thisLable.indexOf("?")):thisLable;var thisNum=1;var postNum=1;var itemCount=0;var fFlag=0;var eFlag=0;var html='';var upPageHtml='';var downPageHtml='';var labelHtml='<span class="showpageNum"><a href="/search/label/'+thisLable+'?&max-results='+pageCount+'">';var thisUrl=home_page_url;for(var i=0,post;post=json.feed.entry[i];i++){var timestamp1=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);timestamp=encodeURIComponent(timestamp1);var title=post.title.$t;if(title!=''){if(itemCount==0||(itemCount%pageCount==(pageCount-1))){if(thisUrl.indexOf(timestamp)!=-1){thisNum=postNum}if(title!='')postNum++;htmlMap[htmlMap.length]='/search/label/'+thisLable+'?updated-max='+timestamp+'&max-results='+pageCount}}itemCount++}for(var p=0;p<htmlMap.length;p++){if(p>=(thisNum-displayPageNum-1)&&p<(thisNum+displayPageNum)){if(fFlag==0&&p==thisNum-2){if(thisNum==2){upPageHtml=labelHtml+upPageWord+'</a></span>'}else{upPageHtml='<span class="showpage"><a href="'+htmlMap[p]+'">'+upPageWord+'</a></span>'}fFlag++}if(p==(thisNum-1)){html+='<span class="showpagePoint">'+thisNum+'</span>'}else{if(p==0){html=labelHtml+'1</a></span>'}else{html+='<span class="showpageNum"><a href="'+htmlMap[p]+'">'+(p+1)+'</a></span>'}}if(eFlag==0&&p==thisNum){downPageHtml='<span class="showpage"> <a href="'+htmlMap[p]+'">'+downPageWord+'</a></span>';eFlag++}}}if(thisNum>1){if(!isLablePage){html=''+upPageHtml+' '+html+' '}else{html=''+upPageHtml+' '+html+' '}}html='<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages ('+(postNum-1)+')</span>'+html;if(thisNum<(postNum-1)){html+=downPageHtml}if(postNum==1)postNum++;html+='</div>';var pageArea=document.getElementsByName("pageArea");var blogPager=document.getElementById("blog-pager");if(postNum<=2){html=''}for(var p=0;p<pageArea.length;p++){pageArea[p].innerHTML=html}if(pageArea&&pageArea.length>0){html=''}if(blogPager){blogPager.innerHTML=html}} */
/***************
Google feed
***************/
google.load("feeds", "1");
function gfeedfetcher(c, a, b) {
	this.linktarget = b || "";
	this.feedlabels = [];
	this.feedurls = [];
	this.feeds = [];
	this.feedsfetched = 0;
	this.feedlimit = 5;
	this.showoptions = "";
	this.sortstring = "date";
	document.write('<div id="' + c + '" class="' + a + '"></div>');
	this.feedcontainer = document.getElementById(c);
	this.itemcontainer = "<li>"
}
gfeedfetcher.prototype.addFeed = function (b, a) {
	this.feedlabels[this.feedlabels.length] = b;
	this.feedurls[this.feedurls.length] = a
};
gfeedfetcher.prototype.filterfeed = function (b, a) {
	this.feedlimit = b;
	if (typeof a != "undefined") {
		this.sortstring = a
	}
};
gfeedfetcher.prototype.displayoptions = function (a) {
	this.showoptions = a
};
gfeedfetcher.prototype.setentrycontainer = function (a) {
	this.itemcontainer = "<" + a.toLowerCase() + ">"
};
gfeedfetcher.prototype.init = function () {
	this.feedsfetched = 0;
	this.feeds = [];
	this.feedcontainer.innerHTML = '<i class="fa fa-spinner fa-2x fa-spin"></i>' + page_loading_msg;
	var a = this;
	for (var b = 0; b < this.feedurls.length; b++) {
		var c = new google.feeds.Feed(this.feedurls[b]);
		var d = (this.feedlimit <= this.feedurls.length) ? 1 : Math.floor(this.feedlimit / this.feedurls.length);
		if (this.feedlimit % this.feedurls.length > 0 && this.feedlimit > this.feedurls.length && b == this.feedurls.length - 1) {
			d += (this.feedlimit % this.feedurls.length)
		}
		c.setNumEntries(d);
		c.load(function (e) {
			return function (f) {
				a._fetch_data_as_array(f, e)
			}
		} (this.feedlabels[b]))
	}
};
gfeedfetcher._formatdate = function (a, c) {
	var d = new Date(a);
	var b = (c.indexOf("datetime") != -1) ? d.toLocaleString() : (c.indexOf("date") != -1) ? d.toLocaleDateString() : (c.indexOf("time") != -1) ? d.toLocaleTimeString() : "";
	return "<span class='datefield'>" + b + "</span>"
};
gfeedfetcher._sortarray = function (a, b) {
	var b = (b == "label") ? "ddlabel": b;
	if (b == "title" || b == "ddlabel") {
		a.sort(function (e, d) {
			var g = e[b].toLowerCase();
			var f = d[b].toLowerCase();
			return (g < f) ? -1 : (g > f) ? 1 : 0
		})
	} else {
		try {
			a.sort(function (e, d) {
				return new Date(d.publishedDate) - new Date(e.publishedDate)
			})
		} catch(c) {}
	}
};
gfeedfetcher.prototype._fetch_data_as_array = function (b, a) {
	var d = (!b.error) ? b.feed.entries: "";
	if (d == "") {
		alert("Google Feed API Error: " + b.error.message)
	}
	for (var c = 0; c < d.length; c++) {
		b.feed.entries[c].ddlabel = a
	}
	this.feeds = this.feeds.concat(d);
	this._signaldownloadcomplete()
};
gfeedfetcher.prototype._signaldownloadcomplete = function () {
	this.feedsfetched += 1;
	if (this.feedsfetched == this.feedurls.length) {
		this._displayresult(this.feeds)
	}
};
gfeedfetcher.prototype._displayresult = function (a) {
	var e = (this.itemcontainer == "<li>") ? "<ul>\n": "";
	gfeedfetcher._sortarray(a, this.sortstring);
	for (var c = 0; c < a.length; c++) {
		var d = '<a href="' + a[c].link + '" target="' + this.linktarget + '" class="titlefield">' + a[c].title + "</a>";
		var b = /label/i.test(this.showoptions) ? '<span class="labelfield">[' + this.feeds[c].ddlabel + "]</span>": " ";
		var g = gfeedfetcher._formatdate(a[c].publishedDate, this.showoptions);
		var f = /description/i.test(this.showoptions) ? "<br />" + a[c].content: /snippet/i.test(this.showoptions) ? "<br />" + a[c].contentSnippet: "";
		e += this.itemcontainer + d + " " + b + " " + g + "\n" + f + this.itemcontainer.replace("<", "</") + "\n\n"
	}
	e += (this.itemcontainer == "<li>") ? "</ul>": "";
	this.feedcontainer.innerHTML = e
};
function gfeedrssticker(d, b, a, c) {
	this.tickerid = d;
	this.delay = parseInt(a);
	this.mouseoverBol = 0;
	this.itemsperpage = 1;
	this.messagepointer = 0;
	gfeedfetcher.call(this, d, b, c);
	this.itemcontainer = "<div>";
	this.tickerdiv = document.getElementById(d)
}
gfeedrssticker.prototype = new gfeedfetcher;
gfeedrssticker.prototype.constructor = gfeedrssticker;
gfeedrssticker.prototype._displayresult = null;
gfeedrssticker.prototype.entries_per_page = function (a) {
	this.itemsperpage = a
};
gfeedrssticker.prototype._signaldownloadcomplete = function () {
	this.feedsfetched += 1;
	if (this.feedsfetched == this.feedurls.length) {
		this._initscroller(this.feeds)
	}
};
gfeedrssticker.prototype._initscroller = function (a) {
	var c = this;
	gfeedfetcher._sortarray(a, this.sortstring);
	this.itemsperpage = (this.itemsperpage >= a.length) ? 1 : this.itemsperpage;
	var b = a.slice(this.messagepointer, this.itemsperpage);
	this.tickerdiv.innerHTML = formatrssmessage(b, this.showoptions, this.itemcontainer, this.linktarget);
	this.tickerdiv.onmouseover = function () {
		c.mouseoverBol = 1
	};
	this.tickerdiv.onmouseout = function () {
		c.mouseoverBol = 0
	};
	this.messagepointer = this.itemsperpage;
	if (window.attachEvent) {
		window.attachEvent("onunload", function () {
			c.tickerdiv.onmouseover = c.tickerdiv.onmouseout = null
		})
	}
	setTimeout(function () {
		c._rotatemessage()
	},
	this.delay)
};
function formatrssmessage(d, b, f, g) {
	var c = (f == "<li>") ? "<ul>\n": "";
	for (var e = 0; e < d.length; e++) {
		var h = '<a href="' + d[e].link + '" target="' + g + '" class="titlefield">' + d[e].title + "</a>";
		var j = /label/i.test(b) ? '<span class="labelfield">[' + d[e].ddlabel + "]</span>": " ";
		var k = gfeedfetcher._formatdate(d[e].publishedDate, b);
		var a = /description/i.test(b) ? "<br />" + d[e].content: /snippet/i.test(b) ? "<br />" + d[e].contentSnippet: "";
		c += f + h + " " + j + " " + k + "\n" + a + f.replace("<", "</") + "\n\n"
	}
	c += (f == "<li>") ? "</ul>\n": "";
	return c
}
gfeedrssticker.prototype._rotatemessage = function () {
	var b = this;
	if (this.mouseoverBol == 1) {
		setTimeout(function () {
			b._rotatemessage()
		},
		100)
	} else {
		var a = this.feeds.slice(this.messagepointer, this.messagepointer + this.itemsperpage);
		this.tickerdiv.innerHTML = formatrssmessage(a, this.showoptions, this.itemcontainer, this.linktarget);
		this.messagepointer = (this.messagepointer + this.itemsperpage > this.feeds.length - 1) ? 0 : this.messagepointer + this.itemsperpage;
		setTimeout(function () {
			b._rotatemessage()
		},
		this.delay)
	}
};
/* function latestMovies(json) {
	for (var i = 0; i < json.feed.entry.length; i++) {
		for (var j = 0; j < json.feed.entry[i].link.length; j++) {
			if (json.feed.entry[i].link[j].rel == 'alternate') {
				var postUrl = json.feed.entry[i].link[j].href;
				break;
			}
		}
		var postTitle = json.feed.entry[i].title.$t;
		var postSummary = json.feed.entry[i].summary.$t;
		var item = '<div class="item"><h3><a href=' + postUrl + '>' + postTitle + '</h3></a><p>' + postSummary + '</p></div>';
		document.write(item);
	}
} */
/***************
Responsive Menu resize
***************/
window.selectnav = function()
{
    return function(p, q)
    {
        var a, h = function(b)
            {
                var c;
                b || (b = window.event);
                b.target ? c = b.target : b.srcElement && (c = b.srcElement);
                3 === c.nodeType && (c = c.parentNode);
                c.value && (window.location.href = c.value)
            },
            k = function(b)
            {
                b = b.nodeName.toLowerCase();
                return "ul" === b || "ol" === b
            },
            l = function(b)
            {
                for(var c = 1; document.getElementById("selectnav" + c); c++)
                {}
                return b ? "selectnav" + c : "selectnav" + (c - 1)
            },
            n = function(b)
            {
                g++;
                var c = b.children.length,
                    a = "",
                    d = "",
                    f = g - 1;
                if(c)
                {
                    if(f)
                    {
                        for(; f--;)
                        {
                            d += r
                        }
                        d += " "
                    }
                    for(f = 0; f < c; f++)
                    {
                        var e = b.children[f].children[0];
                        if("undefined" !== typeof e)
                        {
                            var h = e.innerText || e.textContent,
                                i = "";
                            j && (i = -1 !== e.className.search(j) || -1 !== e.parentElement.className.search(j) ? m : "");
                            s && !i && (i = e.href === document.URL ? m : "");
                            a += '<option value="' + e.href + '" ' + i + ">" + d + h + "</option>";
                            t && (e = b.children[f].children[1]) && k(e) && (a += n(e))
                        }
                    }
                    1 === g && o && (a = '<option value="">' + o + "</option>" + a);
                    1 === g && (a = '<select class="selectnav" id="' + l(!0) + '">' + a + "</select>");
                    g--;
                    return a
                }
            };
        if((a = document.getElementById(p)) && k(a))
        {
            document.documentElement.className += " js";
            var d = q ||
                {},
                j = d.activeclass || "active",
                s = "boolean" === typeof d.autoselect ? d.autoselect : !0,
                t = "boolean" === typeof d.nested ? d.nested : !0,
                r = d.indent || "→",
                o = d.label || "- Navigation -",
                g = 0,
                m = " selected ";
            a.insertAdjacentHTML("afterend", n(a));
            a = document.getElementById(l());
            a.addEventListener && a.addEventListener("change", h);
            a.attachEvent && a.attachEvent("onchange", h)
        }
    }
}();

/***************
Document ready
***************/

$(function() {
    $('.menu li').hover(function() {
        $(this).children('ul').filter(':not(:animated)').show(200);
    }, function() {
        $(this).children('ul').hide(400);
    });
	
	
	$("#carousel .container").jCarouselLite({
		auto:4000,
		scroll: 1,
		speed: 1000,	
		visible: 3,
		start: 0,
		circular: true,
		btnPrev: "#previous_button",
		btnNext: "#next_button"
	});

    var $box = jQuery('.post'),
        $bar = jQuery('a.bar_view');
    $dat = jQuery('a.dat_view');
    $dat.click(function()
    {
        $box.removeClass("bar");
        jQuery(this).addClass('active');
        $bar.removeClass('active');
        jQuery.cookie('dat_style', 0);
		
		jQuery('div.post').each(function($){
			jQuery('h2.post-title a', this).find('br').replaceWith(' ');
		});
        return false;
    });
    $bar.click(function()
    {
        $box.addClass("bar");
        jQuery(this).addClass('active');
        $dat.removeClass('active');
        jQuery.cookie('dat_style', 1);

		jQuery('div.post').each(function($){
			jQuery(this).aToolTip({tipContent: jQuery('.entry', this).html()} );

			if(jQuery('h2.post-title a', this).find('br').length)
				return false;

			titles = jQuery('h2.post-title a', this).html().match(/\(([^)]+)\)/);
			en_title = jQuery('h2.post-title a', this).html();
			vi_title = '';
			if( titles!=null ) {
				vi_title = jQuery('h2.post-title a', this).html().match(/\(([^)]+)\)/)[1];
				en_title = jQuery('h2.post-title a', this).html().replace(/ *\([^)]*\) */g, "");
				
				if( vi_title!= '')
					vi_title = '<br/><br/>(' + vi_title + ')';
			}
				
			jQuery('h2.post-title a', this).html( en_title + vi_title );
		});
		
        return false;
    });
    if(jQuery.cookie('dat_style') == 0)
    {
        /*$box.removeClass("bar");
        $dat.addClass('active');
		
		jQuery('div.post').each(function($){
			jQuery('h2.post-title a', this).find('br').replaceWith(' ');
		});*/
		$dat.trigger('click');
    }
    else
    {
		$bar.trigger('click');
    }
	$(document.body).append('<div id="elegant-page-loader">'+page_loading_msg+'</div>');
	$(window).on("beforeunload", function() {
		$('#elegant-page-loader').fadeIn(1000).delay(6000).fadeOut(1000);
	});
	
	$('.mobile-search-button').click(function(e){
		$(this).toggleClass('active');
		resetMobileSearchButton(true);
	});
	
	
    $('#sidebar .widget-content').hide();
    $('#sidebar h2:last').addClass('active').next().slideDown('slow');
    $('#sidebar h2').css('cursor', 'pointer').click(function() {
        if($(this).next().is(':hidden')) {
            $('#sidebar h2').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
        }
    });
	/* drop down menu */
	selectnav('menu-main', {
	  label: 'Menu ',
	  nested: true,
	  autoselect: false,
	  indent: '-'
	});
	/* category menu clicked */
	$("#drop-categories a").click(function(){
		$(this).toggleClass("active");
	});
	$("a.on1").click(function () {
	  	$("#dropMenuWrapper").slideToggle("slow");
	});
	
	/* contact clicked */
	$('.contact-button').click(function(e){ contact_modal(); });
	
	/* comments */
	if( $('#top-comment').length ) {
		$('#top-comment .widget2').hide();
		$('#top-comment .widget2:first').show();
		$('.top-comment-widget-menu ul dl:first').addClass('selected');
		
		$('.top-comment-widget-menu ul dl').click(function(){
			if( $(this).hasClass('selected') ) return;
			$('.top-comment-widget-menu ul dl').removeClass('selected');
			$(this).addClass('selected');
			$('#top-comment .widget2').hide();
			$('#top-comment .widget2').eq($('.top-comment-widget-menu ul dl').index(this)).slideDown()(300);
		});
	}

	/* Tab Header clicked */
    $('li', "ul.tab-header").click(function(e){
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum+1;
            $("li", $(this).parent()).removeClass("active");
            $(this).addClass("active");
			//alert( $($("ul.tab-content > li:nth-child("+nthChild+")"), $(this).parent().parent()).prop('outerHTML'));
            //$("li", $(this).parent().parent()).removeClass("active");
            //$("li:nth-child("+nthChild+")", $(this).parent().parent()).addClass("active");
			$($("ul.tab-content > li"), $(this).parent().parent()).removeClass("active");
			$($("ul.tab-content > li:nth-child("+nthChild+")"), $(this).parent().parent()).addClass("active");
        }
    });
	
	/* screenshots clicked */
	$('b', '.screenshots').click(function(e){
		$('span', '.screenshots').slideToggle();
	});

	/* init blackscreen for light turner */
	if( $("#blackscreen").length ) {
		$("#blackscreen").css("height", $(document).height());
		$(window).resize(function(){
			$("#blackscreen").css("width", $(document).width());
		});
		
		$("#light-switcher").click(function(){
			/* $("#blackscreen").toggle(); */
			if( $("#blackscreen").is(":hidden") ) {
				/* light ON */
				$("#blackscreen").fadeIn('slow');
				$('body').css('overflow', 'hidden');
				$('.media-player').removeClass('screen-on').addClass('screen-off');
				$(this).removeClass('light-on').addClass("light-off");
				$('span', this).html(light_on_msg);
			}
			else {
				/* light OFF */
				$("#blackscreen").fadeOut('fast');
				$('body').css('overflow', 'auto');
				$('.media-player').removeClass('screen-off').addClass('screen-on');
				$(this).removeClass('light-off').addClass('light-on');
				$('span', this).html(light_off_msg);
			}
		});
	}

	/* add content for video loading screen */
	if( $('.video-loading-screen').length ) {
		$('.video-loading-screen').html(vid_loading_msg);
	}
	
	if( $('.video-server').length ) {
		function videoSourceChanger(url) {
			$('.video-loading-screen').fadeIn('fast', function(){
				window.setTimeout(function(){
					$('.video-loading-screen').fadeOut('slow');
				}, 1500);
			});
			$('iframe', '.media-player').attr('src', url);
			return false;
		}
		$(".video-server a").click(function(e){
			e.preventDefault();
			videoSourceChanger($(this).attr('href'));
			$(".video-server a").removeClass("active");
			$(this).addClass("active");
		});

		mobile_server = '<select><option class="active">' + $('.video-server').contents().get(0).nodeValue + '</option>';
		$('.video-server a').each(function(i){
			mobile_server += '<option value="'+$(this).attr('href')+'"'+($(this).attr('href')==$('iframe', '.media-player').attr('src')?' class="active"':'')+'>'
						  +		$(this).text()
						  +  '</option>';
		});
		mobile_server += '</select>';
		$('.video-server-mobile').append(mobile_server);
		
		$(".video-server-mobile select").change(function(e){
			$("option", this).removeClass("active");
			$(this).find(":selected").addClass("active");
			videoSourceChanger($(this).val());
		});
	}
	if( $('.dl-link').length ) {
		$('.dl-link a').click(function(e){
			if( $(this).parent().hasClass('yt') ) {
				e.preventDefault();
				window.open('//en.savefrom.net/#url='+$(this).attr('href'));
			}
		});
	}
	
	/* share code clicked */
	if( $('.share-codes .fa-code').length ) {
		/*$('.share-codes .fa-code').aToolTip({
			clickIt: true,
			tipContent: $('.links-code').prop('outerHTML')
		});*/
		$('.share-codes .fa-code').click(function(){$(".links-code").slideToggle();});
		$('input', '.links-code').click(function(e){$(this).select();});
		
	}
	
	/* current page clicked */
	if( $('.currentPage').length ) {
		$('.currentPage').click(function(e){
			var num = prompt(go_custom_page_msg);
			
			if( num == '' || num === null )
				return;
				
			num = parseInt(num);

			if( !isNaN(num) ) {
				num = num>htmlMap.length ? htmlMap.length : num;
				window.location.href = htmlMap[num-1];
			}
			else alert(go_custom_page_error_msg);
		});
	}
	
	/* re-style next/prev post buttons */
	var newerLink, olderLink;
	if( $('a.newer-link').length ) {
		newerLink = $('a.newer-link');
		$.get(newerLink.attr('href'), function (html_next_movie) {
			movie_title = $(html_next_movie).find('.post h1.post-title').text();
			movie_title = movie_title.substr(movie_title.indexOf(': ')+2);
			newerLink.html('<strong>'+next_post_msg+'</strong> <span>'+movie_title+'</span>');
			}, "html");
	}
	else $('.next', '.nextprev-pager').addClass('disabled');

	if( $('a.older-link').length ) {
		olderLink = $('a.older-link');
		$.get(olderLink.attr('href'), function (html_prev_movie) {
			movie_title = $(html_prev_movie).find('.post h1.post-title').text();
			movie_title = movie_title.substr(movie_title.indexOf(': ')+2);
			olderLink.html('<strong>'+prev_post_msg+'</strong> <span>'+movie_title+'</span>');   
			}, "html");
	}
	else $('.previous', '.nextprev-pager').addClass('disabled');
	
	/* init footer widgets */
	$('span', '.footer.section h2').click(function(){
		$('span', '.footer.section h2').removeClass('active');
		$(this).addClass('active');
		
		var tabNum = $('span', '.footer.section h2').length-$(this).index();
		$('.PopularPosts').hide();
		$("div.PopularPosts:eq("+tabNum+")").show();
	});
	$('span.active', '.footer.section h2').trigger('click');
	$('a', '.footer.section h2.title').each(function(){
		$(this).aToolTip({tipContent: $(this).attr('href')});
	});

	/* floating share window & top menu */
	var posTopbar = $('.headline-wrapper').offset().top;

	if( $('#fl-share-window').length ) {
		var flsharestatus = 'closed';
		var dh = (($('.top-comment-widget-menu').position().top) - ($(window).height() / 1));
		if (dh < 300) {
			dh = 300
		}
		$('#share-closer').click(function () {
			$('#fl-share-window').animate({
				'bottom': '-650px'
			}, 500, function () {flsharestatus = 'closed';})
		});
	}
	
	$('.back_to_top').click(function(e){$("html, body").animate({ scrollTop: 0 });});

	/* Like2Reveal */
	if( $('.Like2Reveal-container').length ) {
		function init_Like2Reveal() {
			PSZ_Like2Reveal = $.Like2Reveal({
				content		: $('.Like2Reveal-container').html(),
				popup_class	: 'psz-L2R-green',
				
				
				
			});
			PSZ_Like2Reveal_counter = $.Countdown({
				counter		: 'Like2Reveal-counter',
				
				bar			: 'Like2Reveal-loading-bar',
				
				timeout		: like2reveal_timeout,
				hide_blocker: 1,
				
				/*timeout		: 1,
				hide_blocker: 0,*/
				labels		: {
					wait	: like2reveal_wait_msg,
					minute	: like2reveal_min_msg,
					second	: like2reveal_sec_msg,
					}
			});
		};
		function Like2Reveal_on_leaving() {
			/* console.log($.cookie(PSZ_Like2Reveal_cookie)); */
			/* if user liked, should not bother them anymore */
			if( typeof jQuery.cookie(PSZ_Like2Reveal_cookie) != 'undefined' ) {
				if( jQuery.cookie(PSZ_Like2Reveal_cookie)==365 )
					return;
			}
			
			if( PSZ_Like2Reveal.opening() )
				return;
			
			if( recall_blocker_timeout != null ) {
				clearTimeout(recall_blocker_timeout);
				recall_blocker_timeout = null;
			}
			
			PSZ_Like2Reveal.show();
			PSZ_Like2Reveal_counter.reset().run();
		};
		
		PSZ_Like2Reveal_checker = jQuery.cookie(PSZ_Like2Reveal_cookie);
		if( typeof PSZ_Like2Reveal_checker=='undefined' || PSZ_Like2Reveal_checker==0 || PSZ_Like2Reveal_checker==null)
			window.setTimeout( function() {init_Like2Reveal();}, 1000*60*15 );
			
			
		$('body').on('close.PSZ-Like2Reveal', function(){
			PSZ_Like2Reveal_checker = jQuery.cookie(PSZ_Like2Reveal_cookie);
			if( PSZ_Like2Reveal_checker===undefined || PSZ_Like2Reveal_checker==0 ) {
				recall_blocker_timeout = setTimeout(function() {
					Like2Reveal_on_leaving();
				}, 1000*60*15);
			}
		});

		/* FB.Event.subscribe('edge.create', function (response) {
			jQuery.cookie(PSZ_Like2Reveal_cookie, 365, {expires: 365, path: '/'});
			PSZ_Like2Reveal.hide();
		});
		FB.Event.subscribe('edge.remove', function(response) {
			jQuery.cookie(PSZ_Like2Reveal_cookie, '0', {path: '/'});
		}); */
	}

	/* break lines if searching */
	if( $('.status-msg-wrap').length ) {
		$('.status-msg-wrap').html( $('.status-msg-wrap').html().replace('</a> <a', '</a> '+or_msg+' <a').replace('. <a', '.<br/><a') );
	}
	
	/* init policy & copyright */
	$('.policy-agreement').aToolTip({
		clickIt: true,
		tipContent: policy_content
	});
	$('#skinmaker').aToolTip({
		clickIt: true,
		tipContent: "<a href='http://www.themexpose.com/' target='_blank'>http://www.themexpose.com/</a>"
	});

	/* init back to top button */
	resetBackTopButton($);
	/* $('.contact-form-widget form').submit(function(){alert('ready');return false;}); */

	/* init video reporter toolbar */
	resetVideoToolbar();
	$('.report-error').click(function(e){
		var vid_error_warn = vid_error_msg 
							 + "\n - URL: " + $(this).attr('rel') 
							 + "\n - Video: " + $('.media-player iframe').attr('src')
							 + "\n-------------------\n" + vid_more;
							// alert(vid_error_warn);
		$('.contact-form-message').val(vid_error_warn);
		contact_modal();
	});
	
	/* init resize event */
	$(window).resize(function(){
		/* resize fb comments */
		if( $('.fb-comments').length ) {
			var src   = $('.fb-comments iframe').attr('src').split('width='),
				width = $('.fb-comments-container').width();
						
				$('.fb-comments iframe').attr('src', src[0] + 'width=' + width);
		}
		resetBackTopButton($);
		resetVideoToolbar();
		resetMobileSearchButton(false);
	});
	
	/* init scroll event */
	$(document).scroll(function() {
		if( $('#fl-share-window').length ) {
			if ((($(window).scrollTop()) > dh) && $('#fl-share-window').css('bottom') == '-450px' && flsharestatus == 'closed') {
				$('#fl-share-window').animate({
					bottom: '0px',
				}, 'slow');
				flsharestatus = 'opened';
			} else if (($(window).scrollTop() < dh) && $('#fl-share-window').css('bottom') == '0px' && flsharestatus == 'opened') {
				$('#fl-share-window').animate({
					bottom: '-450px',
				}, 'fast');
				flsharestatus = 'closed'
			}
		}
		if( $(window).scrollTop() >= posTopbar )
			$('.headline-wrapper').addClass('floatable');
		else $('.headline-wrapper').removeClass('floatable');
	});
});