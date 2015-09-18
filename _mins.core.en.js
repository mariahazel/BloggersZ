
var custom_categories_enabled = true,	// turn OFF if use Blogger's category system
	num_latest_post_by_author = 6,		// max latest movies to list
	num_related_posts = num_recent_posts = 12,	// max movies to list for Related & Recent sections
	dynamic_content = true,				// lazy-load option, set FALSE to load all movie detailed page
	latest_by_author_loaded = related_posts_loaded = false, // use with dynamic_content only
	no_img_url = '//cdn.rawgit.com/mariahazel/BloggersZ/master/img/no-img.png'; /* //googledrive.com/host/0B-YUEkR0CdcwOXZUYjNobzV5dlk */

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

var policy_content = "<b><a href='http://www.kinofilmehd.com/'>Kinofilmehd.com</a></b> collects all movies from Google, Youtube, DailyMotion ... and other free resources.<br/><b><a href='http://www.kinofilmehd.com/'>Kinofilmehd.com</a></b> is not responsible for any content that not published by <b><a href='http://www.kinofilmehd.com/'>Kinofilmehd.com</a></b>.<br/>Please contact, <b><a href='http://www.kinofilmehd.com/'>Kinofilmehd.com</a></b> is willing to remove copyright materials immediately<br/>All movies found on this website are hosted on third-party servers that are freely available to watch online for all internet users. Any legal issues regarding the free online movies on this website should be taken up with the actual file hosts themselves, as we\'re not affiliated with them.",

	page_loading_msg = 'Loading ...',					// loading text for page transitions
	vid_loading_msg = 'Loading, please wait ...',		// loading message for switching movie servers
	next_post_msg = 'Newer',							// label text for next movie button
	prev_post_msg = 'Older',							// label text for previous movie button
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
var PSZ_Like2Reveal_cookie='PSZ-APP-L2R-//www.facebook.com/PREScriptZ';
var PSZ_Like2Reveal=PSZ_Like2Reveal_counter=recall_blocker_timeout=null;
var relatedTitles=new Array();
var relatedTitlesNum=0;
var relatedUrls=new Array();
var thumburl=new Array();
var htmlMap=new Array();
String.prototype.toKeywords=function()
	{
	var r,re=new Array();
	r=this.replace(/[0-9_-]|\(|\)+/g,"").split(' ');
	for(i=0,j=0;
	i<r.length;
	i++)
		{
		if(r[i]!='')re[j++]=r[i]
	}
	return re
};
function title_split(a)
	{
	vi_title=a.match(/\(([^)]+)\)/)[1];
	en_title=a.replace(/ *\([^)]*\) */g,"");
	return en_title+'<br/>'+(vi_title!=''?'('+vi_title+')':'')
}
function getParameterByName(a)
	{
	a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
	var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),results=b.exec(location.search);
	return results===null?"":results[1]
}
function lazying(a,b)
	{
	jQuery(document).scroll(function()
		{
		posTopMargin=jQuery(window).scrollTop()+100;
		switch(a)
			{
			case'latest_by_author':if(jQuery('.author-profile').length<=0)return;
			if(!latest_by_author_loaded)
				{
				if(!dynamic_content||jQuery('.author-profile').offset().top<=posTopMargin)
					{
					jQuery.getScript('/feeds/posts/default/-/kinofilmehd.com?q='+b+'&alt=json-in-script&callback=latest_by_author&max-results='+num_latest_post_by_author);
					latest_by_author_loaded=true
				}
			}
			break;
			case'related_posts':if(jQuery('.author-profile').length<=0)return;
			if(!related_posts_loaded)
				{
				if(!dynamic_content||jQuery('.author-profile').offset().top<=posTopMargin)
					{
					jQuery.getScript('/feeds/posts/default/-/kinofilmehd.com?q='+b+'&alt=json-in-script&callback=related_results_labels_thumbs2&max-results='+num_related_posts);
					related_posts_loaded=true
				}
			}
			break
		}
	}
	)
}
function resetBackTopButton($)
	{
	if($('.back_to_top').length)
		{
		posLeft=$('#outer-wrapper').offset().left+$('#outer-wrapper').outerWidth();
		if(posLeft+$('.back_to_top').outerWidth()>$(window).width())posLeft-=($('.back_to_top').outerWidth()+5);
		$('.back_to_top').css(
			{
			left:posLeft
		}
		)
	}
}
function resetVideoToolbar()
	{
	if($('.video-reporter').length)
		{
		posLeft=$('#outer-wrapper').offset().left+$('#outer-wrapper').outerWidth();
		if(posLeft+$('.video-reporter').outerWidth()>$(window).width())posLeft-=($('.video-reporter').outerWidth()+5);
		$('.video-reporter').css(
			{
			left:posLeft
		}
		)
	}
}
function resetMobileSearchButton(a)
	{
	if(a)
		{
		$('.headline-left').toggle();
		$('.headline-right').toggle();
		$('.searchform').toggle();
		return
	}
	$('.headline-left').show();
	$('.headline-right').show();
	if($(window).width()<520)
		{
		$('.searchform').hide();
		$('.mobile-search-button').removeClass('active').show()
	}
	else
		{
		$('.searchform').show();
		$('.mobile-search-button').addClass('active').hide()
	}
}
function contact_modal()
	{
	$('.contact-form-widget form').modal();
	return false
}
function removeHtmlTag(a,b)
	{
	if(a.indexOf("<")!=-1)
		{
		var s=a.split("<");
		for(var i=0;
		i<s.length;
		i++)
			{
			if(s[i].indexOf(">")!=-1)
				{
				s[i]=s[i].substring(s[i].indexOf(">")+1,s[i].length)
			}
		}
		a=s.join("")
	}
	b=(b<a.length-1)?b:a.length-2;
	while(a.charAt(b-1)!=' '&&a.indexOf(' ',b)!=-1)b++;
	a=a.substring(0,b-1);
	return a+'...'
}
function masSummaryAndThumb(a,b)
	{
	var c=document.getElementById(a);
	var d="";
	var e=c.getElementsByTagName("img");
	var f=600;
	if(e.length>=1)
		{
		d='<a href="'+b+'"><span style="float:left;
		 padding:0px 10px 0px 0px;
		"><img src="'+e[0].src+'" width="210px" height="275px"/></span></a>';
		f=600
	}
	moinfo='<div class="entry">';
	if($(c).find('ul.tab-content li.active').length)
		{
		moinfo+=$(c).find('ul.tab-content li.active').html()
	}
	if($(c).find('ul.tab-content li').eq(1).length)
		{
		moinfo+='<br/><br/>'+$(c).find('ul.tab-content li').eq(1).html().split(/<br\s*\/?>/)[0]+'...'
	}
	moinfo+='</div>';
	var g=d+moinfo;
	c.innerHTML=g
}
function showrecentposts(e)
	{
	j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;
	img=new Array();
	document.write('<ul>');
	counter=num_recent_posts>e.feed.entry.length?e.feed.entry.length:num_recent_posts;
	for(var i=0;
	i<counter;
	i++)
		{
		var f=e.feed.entry[i];
		var g=f.title.$t;
		if(g=='')continue;
		var h;
		var l;
		if(i==e.feed.entry.length)break;
		for(var k=0;
		k<f.link.length;
		k++)
			{
			if(f.link[k].rel=='alternate')
				{
				l=f.link[k].href;
				break
			}
		}
		for(var k=0;
		k<f.link.length;
		k++)
			{
			if(f.link[k].rel=='replies'&&f.link[k].type=='text/html')
				{
				h=f.link[k].title.split(" ")[0];
				break
			}
		}
		if("content"in f)
			{
			var n=f.content.$t
		}
		else if("summary"in f)
			{
			var n=f.summary.$t
		}
		else var n="";
		postdate=f.published.$t;
		if(j>imgr.length-1)j=0;
		img[i]=imgr[j];
		s=n;
		a=s.indexOf("<img");
		b=s.indexOf("src=\"",a);
		c=s.indexOf("\"",b+5);
		d=s.substr(b+5,c-b-5);
		if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;
		else if(undefined!=f.media$thumbnail)img[i]=f.media$thumbnail.url.replace("s72-c/","");
		else img[i]=imgr[0];
		var o=[1,2,3,4,5,6,7,8,9,10,11,12];
		var p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var q=postdate.split("-")[2].substring(0,2);
		var m=postdate.split("-")[1];
		var y=postdate.split("-")[0];
		for(var r=0;
		r<o.length;
		r++)
			{
			if(parseInt(m)==o[r])
				{
				m=p[r];
				break
			}
		}
		vi_title=/\(([^)]+)\)/.test(g)?g.match(/\(([^)]+)\)/)[1]:'';
		en_title=g.replace(/ *\([^)]*\) */g,"");
		g=en_title+(vi_title!=''?'<br/>('+vi_title+')':'');
		var t=q+' '+m+' '+y;
		var u='<li class="car"><div class="thumb"><a href="'+l+'"><img width="308" height="400" class="alignnone" src="'+img[i]+'"/></a></div><a class="slider_title" href="'+l+'">'+g+'</a></li>';
		document.write(u);
		j++
	}
	document.write('</ul>')
}
function related_results_labels_thumbs(e)
	{
	for(var i=0;
	i<e.feed.entry.length;
	i++)
		{
		var f=e.feed.entry[i];
		relatedTitles[relatedTitlesNum]=f.title.$t!=undefined?f.title.$t:'';
		try
			{
			thumburl[relatedTitlesNum]=f.gform_foot.url
		}
		catch(error)
			{
			if(undefined==f.content)return;
			s=f.content.$t;
			a=s.indexOf("<img");
			b=s.indexOf("src=\"",a);
			c=s.indexOf("\"",b+5);
			d=s.substr(b+5,c-b-5);
			if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))
				{
				thumburl[relatedTitlesNum]=d
			}
			else thumburl[relatedTitlesNum]=no_img_url
		}
		if(relatedTitles[relatedTitlesNum].length>35)relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0,35)+"...";
		for(var k=0;
		k<f.link.length;
		k++)
			{
			if(f.link[k].rel=='alternate')
				{
				relatedUrls[relatedTitlesNum]=f.link[k].href;
				relatedTitlesNum++
			}
		}
	}
}
function related_results_labels_thumbs2(e)
	{
	listing_posts='';
	len=num_related_posts<e.feed.entry.length?num_related_posts:e.feed.entry.length;
	for(var i=0;
	i<len;
	i++)
		{
		var f=e.feed.entry[i];
		if(f==undefined)return;
		var g=f.title.$t!=undefined?f.title.$t:'';
		if(g=='')continue;
		var h,postimg=no_img_url;
		var j;
		for(var k=0;
		k<f.link.length;
		k++)
			{
			if(f.link[k].rel=='alternate')
				{
				j=f.link[k].href;
				break
			}
		}
		for(var k=0;
		k<f.link.length;
		k++)
			{
			if(f.link[k].rel=='replies'&&f.link[k].type=='text/html')
				{
				h=f.link[k].title.split(" ")[0];
				break
			}
		}
		if("content"in f)
			{
			var l=f.content.$t
		}
		else if("summary"in f)
			{
			var l=f.summary.$t
		}
		else var l="";
		postdate=f.published.$t;
		s=l;
		a=s.indexOf("<img");
		b=s.indexOf("src=\"",a);
		c=s.indexOf("\"",b+5);
		d=s.substr(b+5,c-b-5);
		if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))postimg=d;
		else postimg=f.media$thumbnail.url.replace("s72-c/","");
		vi_title=g.match(/\(([^)]+)\)/)[1];
		en_title=g.replace(/ *\([^)]*\) */g,"");
		g=en_title+(vi_title!=''?'<br/>('+vi_title+')':'');
		listing_posts+='<a href="'+j+'"><img class="maskolis_img" src="'+postimg+'"/><br/><div>'+g+'</div></a> '
	}
	if(listing_posts!='')$('#related-posts').append('<h1>'+relatedpoststitle+'</h1> <div style="clear:both;
	"/>'+listing_posts)
}
function latest_by_author(e)
	{
	if(e.feed.entry.length>0)
		{
		len=num_latest_post_by_author<e.feed.entry.length?num_latest_post_by_author:e.feed.entry.length;
		listing_posts='';
		for(var i=0;
		i<len;
		i++)
			{
			var f=e.feed.entry[i];
			if(f==undefined)continue;
			var g=f.title.$t;
			if(g=='')continue;
			var h=no_img_url;
			var j;
			for(var k=0;
			k<f.link.length;
			k++)
				{
				if(f.link[k].rel=='alternate')
					{
					j=f.link[k].href;
					break
				}
			}
			if("content"in f)
				{
				var l=f.content.$t
			}
			else if("summary"in f)
				{
				var l=f.summary.$t
			}
			else var l="";
			postdate=f.published.$t;
			s=l;
			a=s.indexOf("<img");
			b=s.indexOf("src=\"",a);
			c=s.indexOf("\"",b+5);
			d=s.substr(b+5,c-b-5);
			if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))h=d;
			else h=f.media$thumbnail.url.replace("s72-c/","");
			g=title_split(g);
			listing_posts+='<a href="'+j+'"><img src="'+h+'"/><br/>'+g+'</a> '
		}
		if(listing_posts!='')$('.author-profile').append('<div class="pro-by"><br/><h4>'+latest_by_author_msg+latest_by_author_name+'</h4>'+listing_posts+'</div>')
	}
}
function removeRelatedDuplicates_thumbs()
	{
	var a=new Array(0);
	var b=new Array(0);
	var c=new Array(0);
	for(var i=0;
	i<relatedUrls.length;
	i++)
		{
		if(!contains_thumbs(a,relatedUrls[i]))
			{
			a.length+=1;
			a[a.length-1]=relatedUrls[i];
			b.length+=1;
			c.length+=1;
			b[b.length-1]=relatedTitles[i];
			c[c.length-1]=thumburl[i]
		}
	}
	relatedTitles=b;
	relatedUrls=a;
	thumburl=c
}
function contains_thumbs(a,e)
	{
	for(var j=0;
	j<a.length;
	j++)if(a[j]==e)return true;
	return false
}
function printRelatedLabels_thumbs()
	{
	for(var i=0;
	i<relatedUrls.length;
	i++)
		{
		if((relatedUrls[i]==currentposturl)||(!(relatedTitles[i])))
			{
			relatedUrls.splice(i,1);
			relatedTitles.splice(i,1);
			thumburl.splice(i,1);
			i--
		}
	}
	var r=Math.floor((relatedTitles.length-1)*Math.random());
	var i=0;
	if(relatedTitles.length>0)document.write('<h1>'+relatedpoststitle+'</h1>');
	document.write('<div style="clear:both;
	"/>');
	while(i<relatedTitles.length&&i<20&&i<maxresults)
		{
		document.write('<a style="text-decoration:none;
		margin:0 10px 10px 0;
		float:left;
		background:#e6e6e6 url(//cdn.rawgit.com//mariahazel/BloggersZ/master/img/bar-bg.png) repeat-x top;
		border:1px solid #c9c9c9;
		');
		if(i!=0)document.write('"');
		else document.write('"');
		document.write(' href="'+relatedUrls[r]+'"><img class="maskolis_img" src="'+thumburl[r]+'"/><br/><div style="width:190px;
		padding:0 10px;
		color:#4B4444;
		height:38px;
		text-align:center;
		margin:0px 0px;
		 font-size:12px;
		 line-height:16px;
		">'+relatedTitles[r]+'</div></a>');
		if(r<relatedTitles.length-1)
			{
			r++
		}
		else
			{
			r=0
		}
		i++
	}
	document.write('</div>');
	relatedUrls.splice(0,relatedUrls.length);
	thumburl.splice(0,thumburl.length);
	relatedTitles.splice(0,relatedTitles.length)
}
function showpageCount(a)
	{
	var b=home_page_url;
	var c=1;
	var d=1;
	var e=0,fFlag=0,eFlag=0;
	var f='',upPageHtml='',downPageHtml='',firstPage='',lastPage='';
	var q=getParameterByName('q');
	if(q!='')q='q='+q+'&';
	else q='';
	for(var i=0,post;
	post=a.feed.entry[i];
	i++)
		{
		var g=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);
		timestamp=encodeURIComponent(g);
		var h=post.title.$t;
		if(h!='')
			{
			if(e==0||(e%pageCount==(pageCount-1)))
				{
				if(b.indexOf(timestamp)!=-1)
					{
					c=d
				}
				if(h!='')d++;
				htmlMap[htmlMap.length]='/search?'+q+'updated-max='+timestamp+'&max-results='+pageCount
			}
		}
		e++
	}
	for(var p=0;
	p<htmlMap.length;
	p++)
		{
		if(p>=(c-displayPageNum-1)&&p<(c+displayPageNum))
			{
			if(fFlag==0&&c>(displayPageNum+1))
				{
				upPageHtml='<span class="showpage firstPage"><a href="'+htmlMap[c-2]+'">'+upPageWord+'</a></span>';
				fFlag++
			}
			if(eFlag==0&&(c+2)<htmlMap.length)
				{
				downPageHtml='<span class="showpage lastPage"> <a href="'+htmlMap[c]+'">'+downPageWord+'</a></span>';
				eFlag++
			}
			if(p==(c-1))
				{
				f+='<span class="showpagePoint currentPage">'+c+'</span>'
			}
			else
				{
				if(p==0)
					{
					f+='<span class="showpageNum"><a href="/">1</a></span>'
				}
				else
					{
					f+='<span class="showpageNum"><a href="'+htmlMap[p]+'">'+(p+1)+'</a></span>'
				}
			}
		}
	}
	if(c>(displayPageNum+1))firstPage='<span class="showpage firstPage"><a href="/">1..</a></span>';
	if((c+displayPageNum)<htmlMap.length)lastPage='<span class="showpage lastPage"> <a href="'+htmlMap[htmlMap.length-1]+'">..'+htmlMap.length+'</a></span>';
	if(c>=1)
		{
		f=''+upPageHtml+firstPage+' '+f+' '
	}
	f='<div class="showpageArea"><span style="COLOR: #000;
	" class="showpageOf"> Pages ('+(d-1)+')</span>'+f+lastPage;
	if(c<(d-1))
		{
		f+=downPageHtml
	}
	if(d==1)d++;
	f+='</div>';
	var j=document.getElementsByName("pageArea");
	var k=document.getElementById("blog-pager");
	if(d<=2)
		{
		f=''
	}
	for(var p=0;
	p<j.length;
	p++)
		{
		j[p].innerHTML=f
	}
	if(j&&j.length>0)
		{
		f=''
	}
	if(k)
		{
		k.innerHTML=f
	}
}
function showpageCount2(a)
	{
	var b=home_page_url;
	var c=new Array();
	var d=b.indexOf("/search/label/")!=-1;
	var e=d?b.substr(b.indexOf("/search/label/")+14,b.length):"";
	e=e.indexOf("?")!=-1?e.substr(0,e.indexOf("?")):e;
	var f=1;
	var g=1;
	var h=0;
	var j=0;
	var k=0;
	var l='';
	var m='';
	var n='';
	var o='<span class="showpageNum"><a href="/search/label/'+e+'?&max-results='+pageCount+'">';
	var b=home_page_url;
	for(var i=0,post;
	post=a.feed.entry[i];
	i++)
		{
		var q=post.published.$t.substring(0,19)+post.published.$t.substring(23,29);
		timestamp=encodeURIComponent(q);
		var r=post.title.$t;
		if(r!='')
			{
			if(h==0||(h%pageCount==(pageCount-1)))
				{
				if(b.indexOf(timestamp)!=-1)
					{
					f=g
				}
				if(r!='')g++;
				c[c.length]='/search/label/'+e+'?updated-max='+timestamp+'&max-results='+pageCount
			}
		}
		h++
	}
	for(var p=0;
	p<c.length;
	p++)
		{
		if(p>=(f-displayPageNum-1)&&p<(f+displayPageNum))
			{
			if(j==0&&p==f-2)
				{
				if(f==2)
					{
					m=o+upPageWord+'</a></span>'
				}
				else
					{
					m='<span class="showpage"><a href="'+c[p]+'">'+upPageWord+'</a></span>'
				}
				j++
			}
			if(p==(f-1))
				{
				l+='<span class="showpagePoint">'+f+'</span>'
			}
			else
				{
				if(p==0)
					{
					l=o+'1</a></span>'
				}
				else
					{
					l+='<span class="showpageNum"><a href="'+c[p]+'">'+(p+1)+'</a></span>'
				}
			}
			if(k==0&&p==f)
				{
				n='<span class="showpage"> <a href="'+c[p]+'">'+downPageWord+'</a></span>';
				k++
			}
		}
	}
	if(f>1)
		{
		if(!d)
			{
			l=''+m+' '+l+' '
		}
		else
			{
			l=''+m+' '+l+' '
		}
	}
	l='<div class="showpageArea"><span style="COLOR: #000;
	" class="showpageOf"> Pages ('+(g-1)+')</span>'+l;
	if(f<(g-1))
		{
		l+=n
	}
	if(g==1)g++;
	l+='</div>';
	var s=document.getElementsByName("pageArea");
	var t=document.getElementById("blog-pager");
	if(g<=2)
		{
		l=''
	}
	for(var p=0;
	p<s.length;
	p++)
		{
		s[p].innerHTML=l
	}
	if(s&&s.length>0)
		{
		l=''
	}
	if(t)
		{
		t.innerHTML=l
	}
}
google.load("feeds","1");
function gfeedfetcher(c,a,b)
	{
	this.linktarget=b||"";
	this.feedlabels=[];
	this.feedurls=[];
	this.feeds=[];
	this.feedsfetched=0;
	this.feedlimit=5;
	this.showoptions="";
	this.sortstring="date";
	document.write('<div id="'+c+'" class="'+a+'"></div>');
	this.feedcontainer=document.getElementById(c);
	this.itemcontainer="<li>"
}
gfeedfetcher.prototype.addFeed=function(b,a)
	{
	this.feedlabels[this.feedlabels.length]=b;
	this.feedurls[this.feedurls.length]=a
};
gfeedfetcher.prototype.filterfeed=function(b,a)
	{
	this.feedlimit=b;
	if(typeof a!="undefined")
		{
		this.sortstring=a
	}
};
gfeedfetcher.prototype.displayoptions=function(a)
	{
	this.showoptions=a
};
gfeedfetcher.prototype.setentrycontainer=function(a)
	{
	this.itemcontainer="<"+a.toLowerCase()+">"
};
gfeedfetcher.prototype.init=function()
	{
	this.feedsfetched=0;
	this.feeds=[];
	this.feedcontainer.innerHTML='<i class="fa fa-spinner fa-2x fa-spin"></i>'+page_loading_msg;
	var a=this;
	for(var b=0;
	b<this.feedurls.length;
	b++)
		{
		var c=new google.feeds.Feed(this.feedurls[b]);
		var d=(this.feedlimit<=this.feedurls.length)?1:Math.floor(this.feedlimit/this.feedurls.length);
		if(this.feedlimit%this.feedurls.length>0&&this.feedlimit>this.feedurls.length&&b==this.feedurls.length-1)
			{
			d+=(this.feedlimit%this.feedurls.length)
		}
		c.setNumEntries(d);
		c.load(function(e)
			{
			return function(f)
				{
				a._fetch_data_as_array(f,e)
			}
		}
		(this.feedlabels[b]))
	}
};
gfeedfetcher._formatdate=function(a,c)
	{
	var d=new Date(a);
	var b=(c.indexOf("datetime")!=-1)?d.toLocaleString():(c.indexOf("date")!=-1)?d.toLocaleDateString():(c.indexOf("time")!=-1)?d.toLocaleTimeString():"";
	return"<span class='datefield'>"+b+"</span>"
};
gfeedfetcher._sortarray=function(a,b)
	{
	var b=(b=="label")?"ddlabel":b;
	if(b=="title"||b=="ddlabel")
		{
		a.sort(function(e,d)
			{
			var g=e[b].toLowerCase();
			var f=d[b].toLowerCase();
			return(g<f)?-1:(g>f)?1:0
		}
		)
	}
	else
		{
		try
			{
			a.sort(function(e,d)
				{
				return new Date(d.publishedDate)-new Date(e.publishedDate)
			}
			)
		}
		catch(c)
			{
		}
	}
};
gfeedfetcher.prototype._fetch_data_as_array=function(b,a)
	{
	var d=(!b.error)?b.feed.entries:"";
	if(d=="")
		{
		alert("Google Feed API Error: "+b.error.message)
	}
	for(var c=0;
	c<d.length;
	c++)
		{
		b.feed.entries[c].ddlabel=a
	}
	this.feeds=this.feeds.concat(d);
	this._signaldownloadcomplete()
};
gfeedfetcher.prototype._signaldownloadcomplete=function()
	{
	this.feedsfetched+=1;
	if(this.feedsfetched==this.feedurls.length)
		{
		this._displayresult(this.feeds)
	}
};
gfeedfetcher.prototype._displayresult=function(a)
	{
	var e=(this.itemcontainer=="<li>")?"<ul>\n":"";
	gfeedfetcher._sortarray(a,this.sortstring);
	for(var c=0;
	c<a.length;
	c++)
		{
		var d='<a href="'+a[c].link+'" target="'+this.linktarget+'" class="titlefield">'+a[c].title+"</a>";
		var b=/label/i.test(this.showoptions)?'<span class="labelfield">['+this.feeds[c].ddlabel+"]</span>":" ";
		var g=gfeedfetcher._formatdate(a[c].publishedDate,this.showoptions);
		var f=/description/i.test(this.showoptions)?"<br />"+a[c].content:/snippet/i.test(this.showoptions)?"<br />"+a[c].contentSnippet:"";
		e+=this.itemcontainer+d+" "+b+" "+g+"\n"+f+this.itemcontainer.replace("<","</")+"\n\n"
	}
	e+=(this.itemcontainer=="<li>")?"</ul>":"";
	this.feedcontainer.innerHTML=e
};
function gfeedrssticker(d,b,a,c)
	{
	this.tickerid=d;
	this.delay=parseInt(a);
	this.mouseoverBol=0;
	this.itemsperpage=1;
	this.messagepointer=0;
	gfeedfetcher.call(this,d,b,c);
	this.itemcontainer="<div>";
	this.tickerdiv=document.getElementById(d)
}
gfeedrssticker.prototype=new gfeedfetcher;
gfeedrssticker.prototype.constructor=gfeedrssticker;
gfeedrssticker.prototype._displayresult=null;
gfeedrssticker.prototype.entries_per_page=function(a)
	{
	this.itemsperpage=a
};
gfeedrssticker.prototype._signaldownloadcomplete=function()
	{
	this.feedsfetched+=1;
	if(this.feedsfetched==this.feedurls.length)
		{
		this._initscroller(this.feeds)
	}
};
gfeedrssticker.prototype._initscroller=function(a)
	{
	var c=this;
	gfeedfetcher._sortarray(a,this.sortstring);
	this.itemsperpage=(this.itemsperpage>=a.length)?1:this.itemsperpage;
	var b=a.slice(this.messagepointer,this.itemsperpage);
	this.tickerdiv.innerHTML=formatrssmessage(b,this.showoptions,this.itemcontainer,this.linktarget);
	this.tickerdiv.onmouseover=function()
		{
		c.mouseoverBol=1
	};
	this.tickerdiv.onmouseout=function()
		{
		c.mouseoverBol=0
	};
	this.messagepointer=this.itemsperpage;
	if(window.attachEvent)
		{
		window.attachEvent("onunload",function()
			{
			c.tickerdiv.onmouseover=c.tickerdiv.onmouseout=null
		}
		)
	}
	setTimeout(function()
		{
		c._rotatemessage()
	}
	,this.delay)
};
function formatrssmessage(d,b,f,g)
	{
	var c=(f=="<li>")?"<ul>\n":"";
	for(var e=0;
	e<d.length;
	e++)
		{
		var h='<a href="'+d[e].link+'" target="'+g+'" class="titlefield">'+d[e].title+"</a>";
		var j=/label/i.test(b)?'<span class="labelfield">['+d[e].ddlabel+"]</span>":" ";
		var k=gfeedfetcher._formatdate(d[e].publishedDate,b);
		var a=/description/i.test(b)?"<br />"+d[e].content:/snippet/i.test(b)?"<br />"+d[e].contentSnippet:"";
		c+=f+h+" "+j+" "+k+"\n"+a+f.replace("<","</")+"\n\n"
	}
	c+=(f=="<li>")?"</ul>\n":"";
	return c
}
gfeedrssticker.prototype._rotatemessage=function()
	{
	var b=this;
	if(this.mouseoverBol==1)
		{
		setTimeout(function()
			{
			b._rotatemessage()
		}
		,100)
	}
	else
		{
		var a=this.feeds.slice(this.messagepointer,this.messagepointer+this.itemsperpage);
		this.tickerdiv.innerHTML=formatrssmessage(a,this.showoptions,this.itemcontainer,this.linktarget);
		this.messagepointer=(this.messagepointer+this.itemsperpage>this.feeds.length-1)?0:this.messagepointer+this.itemsperpage;
		setTimeout(function()
			{
			b._rotatemessage()
		}
		,this.delay)
	}
};
window.selectnav=function()
	{
	return function(p,q)
		{
		var a,h=function(b)
			{
			var c;
			b||(b=window.event);
			b.target?c=b.target:b.srcElement&&(c=b.srcElement);
			3===c.nodeType&&(c=c.parentNode);
			c.value&&(window.location.href=c.value)
		}
		,k=function(b)
			{
			b=b.nodeName.toLowerCase();
			return"ul"===b||"ol"===b
		}
		,l=function(b)
			{
			for(var c=1;
			document.getElementById("selectnav"+c);
			c++)
				{
			}
			return b?"selectnav"+c:"selectnav"+(c-1)
		}
		,n=function(b)
			{
			g++;
			var c=b.children.length,a="",d="",f=g-1;
			if(c)
				{
				if(f)
					{
					for(;
					f--;
					)
						{
						d+=r
					}
					d+=" "
				}
				for(f=0;
				f<c;
				f++)
					{
					var e=b.children[f].children[0];
					if("undefined"!==typeof e)
						{
						var h=e.innerText||e.textContent,i="";
						j&&(i=-1!==e.className.search(j)||-1!==e.parentElement.className.search(j)?m:"");
						s&&!i&&(i=e.href===document.URL?m:"");
						a+='<option value="'+e.href+'" '+i+">"+d+h+"</option>";
						t&&(e=b.children[f].children[1])&&k(e)&&(a+=n(e))
					}
				}
				1===g&&o&&(a='<option value="">'+o+"</option>"+a);
				1===g&&(a='<select class="selectnav" id="'+l(!0)+'">'+a+"</select>");
				g--;
				return a
			}
		};
		if((a=document.getElementById(p))&&k(a))
			{
			document.documentElement.className+=" js";
			var d=q||
				{
			}
			,j=d.activeclass||"active",s="boolean"===typeof d.autoselect?d.autoselect:!0,t="boolean"===typeof d.nested?d.nested:!0,r=d.indent||"→",o=d.label||"- Navigation -",g=0,m=" selected ";
			a.insertAdjacentHTML("afterend",n(a));
			a=document.getElementById(l());
			a.addEventListener&&a.addEventListener("change",h);
			a.attachEvent&&a.attachEvent("onchange",h)
		}
	}
}
();
$(function()
	{
	$('.menu li').hover(function()
		{
		$(this).children('ul').filter(':not(:animated)').show(200)
	}
	,function()
		{
		$(this).children('ul').hide(400)
	}
	);
	$("#carousel .container").jCarouselLite(
		{
		auto:4000,scroll:1,speed:1000,visible:3,start:0,circular:true,btnPrev:"#previous_button",btnNext:"#next_button"
	}
	);
	var c=jQuery('.post'),$bar=jQuery('a.bar_view');
	$dat=jQuery('a.dat_view');
	$dat.click(function()
		{
		c.removeClass("bar");
		jQuery(this).addClass('active');
		$bar.removeClass('active');
		jQuery.cookie('dat_style',0);
		jQuery('div.post').each(function($)
			{
			jQuery('h2.post-title a',this).find('br').replaceWith(' ')
		}
		);
		return false
	}
	);
	$bar.click(function()
		{
		c.addClass("bar");
		jQuery(this).addClass('active');
		$dat.removeClass('active');
		jQuery.cookie('dat_style',1);
		jQuery('div.post').each(function($)
			{
			jQuery(this).aToolTip(
				{
				tipContent:jQuery('.entry',this).html()
			}
			);
			if(jQuery('h2.post-title a',this).find('br').length)return false;
			titles=jQuery('h2.post-title a',this).html().match(/\(([^)]+)\)/);
			en_title=jQuery('h2.post-title a',this).html();
			vi_title='';
			if(titles!=null)
				{
				vi_title=jQuery('h2.post-title a',this).html().match(/\(([^)]+)\)/)[1];
				en_title=jQuery('h2.post-title a',this).html().replace(/ *\([^)]*\) */g,"");
				if(vi_title!='')vi_title='<br/><br/>('+vi_title+')'
			}
			jQuery('h2.post-title a',this).html(en_title+vi_title)
		}
		);
		return false
	}
	);
	if(jQuery.cookie('dat_style')==0)
		{
		$dat.trigger('click')
	}
	else
		{
		$bar.trigger('click')
	}
	$(document.body).append('<div id="elegant-page-loader">'+page_loading_msg+'</div>');
	$(window).on("beforeunload",function()
		{
		$('#elegant-page-loader').fadeIn(1000).delay(6000).fadeOut(1000)
	}
	);
	$('.mobile-search-button').click(function(e)
		{
		$(this).toggleClass('active');
		resetMobileSearchButton(true)
	}
	);
	$('#sidebar .widget-content').hide();
	$('#sidebar h2:last').addClass('active').next().slideDown('slow');
	$('#sidebar h2').css('cursor','pointer').click(function()
		{
		if($(this).next().is(':hidden'))
			{
			$('#sidebar h2').removeClass('active').next().slideUp('slow');
			$(this).toggleClass('active').next().slideDown('slow')
		}
	}
	);
	selectnav('menu-main',
		{
		label:'Menu ',nested:true,autoselect:false,indent:'-'
	}
	);
	$("#drop-categories a").click(function()
		{
		$(this).toggleClass("active")
	}
	);
	$("a.on1").click(function()
		{
		$("#dropMenuWrapper").slideToggle("slow")
	}
	);
	$('.contact-button').click(function(e)
		{
		contact_modal()
	}
	);
	if($('#top-comment').length)
		{
		$('#top-comment .widget2').hide();
		$('#top-comment .widget2:first').show();
		$('.top-comment-widget-menu ul dl:first').addClass('selected');
		$('.top-comment-widget-menu ul dl').click(function()
			{
			if($(this).hasClass('selected'))return;
			$('.top-comment-widget-menu ul dl').removeClass('selected');
			$(this).addClass('selected');
			$('#top-comment .widget2').hide();
			$('#top-comment .widget2').eq($('.top-comment-widget-menu ul dl').index(this)).slideDown()(300)
		}
		)
	}
	$('li',"ul.tab-header").click(function(e)
		{
		if(!$(this).hasClass("active"))
			{
			var a=$(this).index();
			var b=a+1;
			$("li",$(this).parent()).removeClass("active");
			$(this).addClass("active");
			$($("ul.tab-content > li"),$(this).parent().parent()).removeClass("active");
			$($("ul.tab-content > li:nth-child("+b+")"),$(this).parent().parent()).addClass("active")
		}
	}
	);
	$('b','.screenshots').click(function(e)
		{
		$('span','.screenshots').slideToggle()
	}
	);
	if($("#blackscreen").length)
		{
		$("#blackscreen").css("height",$(document).height());
		$(window).resize(function()
			{
			$("#blackscreen").css("width",$(document).width())
		}
		);
		$("#light-switcher").click(function()
			{
			if($("#blackscreen").is(":hidden"))
				{
				$("#blackscreen").fadeIn('slow');
				$('body').css('overflow','hidden');
				$('.media-player').removeClass('screen-on').addClass('screen-off');
				$(this).removeClass('light-on').addClass("light-off");
				$('span',this).html(light_on_msg)
			}
			else
				{
				$("#blackscreen").fadeOut('fast');
				$('body').css('overflow','auto');
				$('.media-player').removeClass('screen-off').addClass('screen-on');
				$(this).removeClass('light-off').addClass('light-on');
				$('span',this).html(light_off_msg)
			}
		}
		)
	}
	if($('.video-loading-screen').length)
		{
		$('.video-loading-screen').html(vid_loading_msg)
	}
	if($('.video-server').length)
		{
		function videoSourceChanger(a)
			{
			$('.video-loading-screen').fadeIn('fast',function()
				{
				window.setTimeout(function()
					{
					$('.video-loading-screen').fadeOut('slow')
				}
				,1500)
			}
			);
			$('iframe','.media-player').attr('src',a);
			return false
		}
		$(".video-server a").click(function(e)
			{
			e.preventDefault();
			videoSourceChanger($(this).attr('href'));
			$(".video-server a").removeClass("active");
			$(this).addClass("active")
		}
		);
		mobile_server='<select><option class="active">'+$('.video-server').contents().get(0).nodeValue+'</option>';
		$('.video-server a').each(function(i)
			{
			mobile_server+='<option value="'+$(this).attr('href')+'"'+($(this).attr('href')==$('iframe','.media-player').attr('src')?' class="active"':'')+'>'+$(this).text()+'</option>'
		}
		);
		mobile_server+='</select>';
		$('.video-server-mobile').append(mobile_server);
		$(".video-server-mobile select").change(function(e)
			{
			$("option",this).removeClass("active");
			$(this).find(":selected").addClass("active");
			videoSourceChanger($(this).val())
		}
		)
	}
	if($('.dl-link').length)
		{
		$('.dl-link a').click(function(e)
			{
			if($(this).parent().hasClass('yt'))
				{
				e.preventDefault();
				window.open('//en.savefrom.net/#url='+$(this).attr('href'))
			}
		}
		)
	}
	if($('.share-codes .fa-code').length)
		{
		$('.share-codes .fa-code').click(function()
			{
			$(".links-code").slideToggle()
		}
		);
		$('input','.links-code').click(function(e)
			{
			$(this).select()
		}
		)
	}
	if($('.currentPage').length)
		{
		$('.currentPage').click(function(e)
			{
			var a=prompt(go_custom_page_msg);
			if(a==''||a===null)return;
			a=parseInt(a);
			if(!isNaN(a))
				{
				a=a>htmlMap.length?htmlMap.length:a;
				window.location.href=htmlMap[a-1]
			}
			else alert(go_custom_page_error_msg)
		}
		)
	}
	var d,olderLink;
	if($('a.newer-link').length)
		{
		d=$('a.newer-link');
		$.get(d.attr('href'),function(a)
			{
			movie_title=$(a).find('.post h1.post-title').text();
			movie_title=movie_title.substr(movie_title.indexOf(': ')+2);
			d.html('<strong>'+next_post_msg+'</strong> <span>'+movie_title+'</span>')
		}
		,"html")
	}
	else $('.next','.nextprev-pager').addClass('disabled');
	if($('a.older-link').length)
		{
		olderLink=$('a.older-link');
		$.get(olderLink.attr('href'),function(a)
			{
			movie_title=$(a).find('.post h1.post-title').text();
			movie_title=movie_title.substr(movie_title.indexOf(': ')+2);
			olderLink.html('<strong>'+prev_post_msg+'</strong> <span>'+movie_title+'</span>')
		}
		,"html")
	}
	else $('.previous','.nextprev-pager').addClass('disabled');
	$('span','.footer.section h2').click(function()
		{
		$('span','.footer.section h2').removeClass('active');
		$(this).addClass('active');
		var a=$('span','.footer.section h2').length-$(this).index();
		$('.PopularPosts').hide();
		$("div.PopularPosts:eq("+a+")").show()
	}
	);
	$('span.active','.footer.section h2').trigger('click');
	$('a','.footer.section h2.title').each(function()
		{
		$(this).aToolTip(
			{
			tipContent:$(this).attr('href')
		}
		)
	}
	);
	var f=$('.headline-wrapper').offset().top;
	if($('#fl-share-window').length)
		{
		var g='closed';
		var h=(($('.top-comment-widget-menu').position().top)-($(window).height()/1));
		if(h<300)
			{
			h=300
		}
		$('#share-closer').click(function()
			{
			$('#fl-share-window').animate(
				{
				'bottom':'-650px'
			}
			,500,function()
				{
				g='closed'
			}
			)
		}
		)
	}
	$('.back_to_top').click(function(e)
		{
		$("html, body").animate(
			{
			scrollTop:0
		}
		)
	}
	);
	if($('.Like2Reveal-container').length)
		{
		function init_Like2Reveal()
			{
			PSZ_Like2Reveal=$.Like2Reveal(
				{
				content:$('.Like2Reveal-container').html(),popup_class:'psz-L2R-green',
			}
			);
			PSZ_Like2Reveal_counter=$.Countdown(
				{
				counter:'Like2Reveal-counter',bar:'Like2Reveal-loading-bar',timeout:like2reveal_timeout,hide_blocker:1,labels:
					{
					wait:like2reveal_wait_msg,minute:like2reveal_min_msg,second:like2reveal_sec_msg,
				}
			}
			)
		};
		function Like2Reveal_on_leaving()
			{
			if(typeof jQuery.cookie(PSZ_Like2Reveal_cookie)!='undefined')
				{
				if(jQuery.cookie(PSZ_Like2Reveal_cookie)==365)return
			}
			if(PSZ_Like2Reveal.opening())return;
			if(recall_blocker_timeout!=null)
				{
				clearTimeout(recall_blocker_timeout);
				recall_blocker_timeout=null
			}
			PSZ_Like2Reveal.show();
			PSZ_Like2Reveal_counter.reset().run()
		};
		PSZ_Like2Reveal_checker=jQuery.cookie(PSZ_Like2Reveal_cookie);
		if(typeof PSZ_Like2Reveal_checker=='undefined'||PSZ_Like2Reveal_checker==0||PSZ_Like2Reveal_checker==null)window.setTimeout(function()
			{
			init_Like2Reveal()
		}
		,1000*60*15);
		$('body').on('close.PSZ-Like2Reveal',function()
			{
			PSZ_Like2Reveal_checker=jQuery.cookie(PSZ_Like2Reveal_cookie);
			if(PSZ_Like2Reveal_checker===undefined||PSZ_Like2Reveal_checker==0)
				{
				recall_blocker_timeout=setTimeout(function()
					{
					Like2Reveal_on_leaving()
				}
				,1000*60*15)
			}
		}
		)
	}
	if($('.status-msg-wrap').length)
		{
		$('.status-msg-wrap').html($('.status-msg-wrap').html().replace('</a> <a','</a> '+or_msg+' <a').replace('. <a','.<br/><a'))
	}
	$('.policy-agreement').aToolTip(
		{
		clickIt:true,tipContent:policy_content
	}
	);
	$('#skinmaker').aToolTip(
		{
		clickIt:true,tipContent:"<a href='http://www.kinofilmehd.com/' target='_blank'>http://www.kinofilmehd.com/</a>"
	}
	);
	resetBackTopButton($);
	resetVideoToolbar();
	$('.report-error').click(function(e)
		{
		var a=vid_error_msg+"\n - URL: "+$(this).attr('rel')+"\n - Video: "+$('.media-player iframe').attr('src')+"\n-------------------\n"+vid_more;
		$('.contact-form-message').val(a);
		contact_modal()
	}
	);
	$(window).resize(function()
		{
		if($('.fb-comments').length)
			{
			var a=$('.fb-comments iframe').attr('src').split('width='),width=$('.fb-comments-container').width();
			$('.fb-comments iframe').attr('src',a[0]+'width='+width)
		}
		resetBackTopButton($);
		resetVideoToolbar();
		resetMobileSearchButton(false)
	}
	);
	$(document).scroll(function()
		{
		if($('#fl-share-window').length)
			{
			if((($(window).scrollTop())>h)&&$('#fl-share-window').css('bottom')=='-450px'&&g=='closed')
				{
				$('#fl-share-window').animate(
					{
					bottom:'0px',
				}
				,'slow');
				g='opened'
			}
			else if(($(window).scrollTop()<h)&&$('#fl-share-window').css('bottom')=='0px'&&g=='opened')
				{
				$('#fl-share-window').animate(
					{
					bottom:'-450px',
				}
				,'fast');
				g='closed'
			}
		}
		if($(window).scrollTop()>=f)$('.headline-wrapper').addClass('floatable');
		else $('.headline-wrapper').removeClass('floatable')
	}
	)
}
);

