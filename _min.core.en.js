
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
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('w 39=\'6h-8Z-6c-//4L.8w.2t/8l\';w 3C=4H=2V=1D;w 17=16 1v();w 1r=0;w 1n=16 1v();w 1x=16 1v();w 1h=16 1v();80.18.7V=A(){w r,4B=16 1v();r=v.1i(/[0-7G-]|\\(|\\)+/g,"").1H(\' \');H(i=0,j=0;i<r.B;i++){z(r[i]!=\'\')4B[j++]=r[i]}I 4B};A 5y(a){1g=a.2M(/\\(([^)]+)\\)/)[1];1B=a.1i(/ *\\([^)]*\\) */g,"");I 1B+\'<U/>\'+(1g!=\'\'?\'(\'+1g+\')\':\'\')}A 5o(a){a=a.1i(/[\\[]/,"\\\\[").1i(/[\\]]/,"\\\\]");w b=16 7i("[\\\\?&]"+a+"=([^&#]*)"),1X=b.6X(4l.1p);I 1X===1D?"":1X[1]}A 6I(a,b){F(K).4i(A(){4g=F(N).32()+5b;9t(a){55\'4e\':z(F(\'.33-37\').B<=0)I;z(!6i){z(!6a||F(\'.33-37\').38().1d<=4g){F.5U(\'/1k/46/5R/-/45.2t?q=\'+b+\'&5L=5p-1S-5m&5h=4e&2c-1X=\'+42);6i=1V}}1y;55\'6N\':z(F(\'.33-37\').B<=0)I;z(!4S){z(!6a||F(\'.33-37\').38().1d<=4g){F.5U(\'/1k/46/5R/-/45.2t?q=\'+b+\'&5L=5p-1S-5m&5h=5u&2c-1X=\'+3U);4S=1V}}1y}})}A 3V($){z($(\'.3c\').B){1M=$(\'#3B-2n\').38().1Y+$(\'#3B-2n\').2u();z(1M+$(\'.3c\').2u()>$(N).1l())1M-=($(\'.3c\').2u()+5);$(\'.3c\').1J({1Y:1M})}}A 4n(){z($(\'.1e-3p\').B){1M=$(\'#3B-2n\').38().1Y+$(\'#3B-2n\').2u();z(1M+$(\'.1e-3p\').2u()>$(N).1l())1M-=($(\'.1e-3p\').2u()+5);$(\'.1e-3p\').1J({1Y:1M})}}A 4q(a){z(a){$(\'.2e-1Y\').4r();$(\'.2e-5r\').4r();$(\'.4s\').4r();I}$(\'.2e-1Y\').1Q();$(\'.2e-5r\').1Q();z($(N).1l()<7s){$(\'.4s\').2m();$(\'.2X-1p-3h\').1b(\'J\').1Q()}G{$(\'.4s\').1Q();$(\'.2X-1p-3h\').V(\'J\').2m()}}A 4x(){$(\'.4F-4G-2a 4G\').89();I 1N}A 8b(a,b){z(a.M("<")!=-1){w s=a.1H("<");H(w i=0;i<s.B;i++){z(s[i].M(">")!=-1){s[i]=s[i].1O(s[i].M(">")+1,s[i].B)}}a=s.8f("")}b=(b<a.B-1)?b:a.B-2;5V(a.8k(b-1)!=\' \'&&a.M(\' \',b)!=-1)b++;a=a.1O(0,b-1);I a+\'...\'}A 8n(a,b){w c=K.1L(a);w d="";w e=c.8F("X");w f=6d;z(e.B>=1){d=\'<a E="\'+b+\'"><C 2d="6e:1Y; 6o:2g 3f 2g 2g;"><X 1c="\'+e[0].1c+\'" 1l="9E" 2k="9l"/></C></a>\';f=6d}2N=\'<O D="13">\';z($(c).1E(\'T.2j-W 1a.J\').B){2N+=$(c).1E(\'T.2j-W 1a.J\').S()}z($(c).1E(\'T.2j-W 1a\').3G(1).B){2N+=\'<U/><U/>\'+$(c).1E(\'T.2j-W 1a\').3G(1).S().1H(/<U\\s*\\/?>/)[0]+\'...\'}2N+=\'</O>\';w g=d+2N;c.1C=g}A 8S(e){j=(8P)?2P.4M((3j.B+1)*2P.66()):0;X=16 1v();K.1o(\'<T>\');3t=62>e.Z.13.B?e.Z.13.B:62;H(w i=0;i<3t;i++){w f=e.Z.13[i];w g=f.R.$t;z(g==\'\')3D;w h;w l;z(i==e.Z.13.B)1y;H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'3d\'){l=f.L[k].E;1y}}H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'5J\'&&f.L[k].5D==\'2f/S\'){h=f.L[k].R.1H(" ")[0];1y}}z("W"1S f){w n=f.W.$t}G z("2K"1S f){w n=f.2K.$t}G w n="";2I=f.24.$t;z(j>3j.B-1)j=0;X[i]=3j[j];s=n;a=s.M("<X");b=s.M("1c=\\"",a);c=s.M("\\"",b+5);d=s.1U(b+5,c-b-5);z((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))X[i]=d;G z(1q!=f.1z$3o)X[i]=f.1z$3o.2B.1i("4o-c/","");G X[i]=3j[0];w o=[1,2,3,4,5,6,7,8,9,10,11,12];w p=["8m","7K","7F","7r","7q","7l","7k","6U","6B","9F","8M","8L"];w q=2I.1H("-")[2].1O(0,2);w m=2I.1H("-")[1];w y=2I.1H("-")[0];H(w r=0;r<o.B;r++){z(3W(m)==o[r]){m=p[r];1y}}1g=/\\(([^)]+)\\)/.25(g)?g.2M(/\\(([^)]+)\\)/)[1]:\'\';1B=g.1i(/ *\\([^)]*\\) */g,"");g=1B+(1g!=\'\'?\'<U/>(\'+1g+\')\':\'\');w t=q+\' \'+m+\' \'+y;w u=\'<1a D="8x"><O D="6L"><a E="\'+l+\'"><X 1l="8i" 2k="5c" D="8Q" 1c="\'+X[i]+\'"/></a></O><a D="9D" E="\'+l+\'">\'+g+\'</a></1a>\';K.1o(u);j++}K.1o(\'</T>\')}A 6w(e){H(w i=0;i<e.Z.13.B;i++){w f=e.Z.13[i];17[1r]=f.R.$t!=1q?f.R.$t:\'\';54{1x[1r]=f.8p.2B}58(3S){z(1q==f.W)I;s=f.W.$t;a=s.M("<X");b=s.M("1c=\\"",a);c=s.M("\\"",b+5);d=s.1U(b+5,c-b-5);z((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){1x[1r]=d}G 1x[1r]=4m}z(17[1r].B>35)17[1r]=17[1r].1O(0,35)+"...";H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'3d\'){1n[1r]=f.L[k].E;1r++}}}}A 5u(e){1W=\'\';3R=3U<e.Z.13.B?3U:e.Z.13.B;H(w i=0;i<3R;i++){w f=e.Z.13[i];z(f==1q)I;w g=f.R.$t!=1q?f.R.$t:\'\';z(g==\'\')3D;w h,3Q=4m;w j;H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'3d\'){j=f.L[k].E;1y}}H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'5J\'&&f.L[k].5D==\'2f/S\'){h=f.L[k].R.1H(" ")[0];1y}}z("W"1S f){w l=f.W.$t}G z("2K"1S f){w l=f.2K.$t}G w l="";2I=f.24.$t;s=l;a=s.M("<X");b=s.M("1c=\\"",a);c=s.M("\\"",b+5);d=s.1U(b+5,c-b-5);z((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))3Q=d;G 3Q=f.1z$3o.2B.1i("4o-c/","");1g=g.2M(/\\(([^)]+)\\)/)[1];1B=g.1i(/ *\\([^)]*\\) */g,"");g=1B+(1g!=\'\'?\'<U/>(\'+1g+\')\':\'\');1W+=\'<a E="\'+j+\'"><X D="5d" 1c="\'+3Q+\'"/><U/><O>\'+g+\'</O></a> \'}z(1W!=\'\')$(\'#90-46\').3P(\'<2G>\'+5P+\'</2G> <O 2d="5T:5Y;"/>\'+1W)}A 4e(e){z(e.Z.13.B>0){3R=42<e.Z.13.B?42:e.Z.13.B;1W=\'\';H(w i=0;i<3R;i++){w f=e.Z.13[i];z(f==1q)3D;w g=f.R.$t;z(g==\'\')3D;w h=4m;w j;H(w k=0;k<f.L.B;k++){z(f.L[k].26==\'3d\'){j=f.L[k].E;1y}}z("W"1S f){w l=f.W.$t}G z("2K"1S f){w l=f.2K.$t}G w l="";2I=f.24.$t;s=l;a=s.M("<X");b=s.M("1c=\\"",a);c=s.M("\\"",b+5);d=s.1U(b+5,c-b-5);z((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))h=d;G h=f.1z$3o.2B.1i("4o-c/","");g=5y(g);1W+=\'<a E="\'+j+\'"><X 1c="\'+h+\'"/><U/>\'+g+\'</a> \'}z(1W!=\'\')$(\'.33-37\').3P(\'<O D="8y-8I"><U/><65>\'+8R+8V+\'</65>\'+1W+\'</O>\')}}A 8W(){w a=16 1v(0);w b=16 1v(0);w c=16 1v(0);H(w i=0;i<1n.B;i++){z(!4R(a,1n[i])){a.B+=1;a[a.B-1]=1n[i];b.B+=1;c.B+=1;b[b.B-1]=17[i];c[c.B-1]=1x[i]}}17=b;1n=a;1x=c}A 4R(a,e){H(w j=0;j<a.B;j++)z(a[j]==e)I 1V;I 1N}A 9n(){H(w i=0;i<1n.B;i++){z((1n[i]==9o)||(!(17[i]))){1n.2F(i,1);17.2F(i,1);1x.2F(i,1);i--}}w r=2P.4M((17.B-1)*2P.66());w i=0;z(17.B>0)K.1o(\'<2G>\'+5P+\'</2G>\');K.1o(\'<O 2d="5T:5Y;"/>\');5V(i<17.B&&i<20&&i<6r){K.1o(\'<a 2d="2f-6s:6u;4T:0 3f 3f 0;6e:1Y;6E:#6G 2B(//6H.45.2t/6M/X/1I-6O.6P) 6R-x 1d;77:7g 7j #7m;\');z(i!=0)K.1o(\'"\');G K.1o(\'"\');K.1o(\' E="\'+1n[r]+\'"><X D="5d" 1c="\'+1x[r]+\'"/><U/><O 2d="1l:7o;6o:0 3f;7p:#7t;2k:7u;2f-7v:7w;4T:2g 2g; 7B-7U:7W; 7Y-2k:83;">\'+17[r]+\'</O></a>\');z(r<17.B-1){r++}G{r=0}i++}K.1o(\'</O>\');1n.2F(0,1n.B);1x.2F(0,1x.B);17.2F(0,17.B)}A 84(a){w b=3X;w c=1;w d=1;w e=0,3Y=0,3Z=0;w f=\'\',40=\'\',41=\'\',3b=\'\',3a=\'\';w q=5o(\'q\');z(q!=\'\')q=\'q=\'+q+\'&\';G q=\'\';H(w i=0,P;P=a.Z.13[i];i++){w g=P.24.$t.1O(0,19)+P.24.$t.1O(23,29);2y=5k(g);w h=P.R.$t;z(h!=\'\'){z(e==0||(e%21==(21-1))){z(b.M(2y)!=-1){c=d}z(h!=\'\')d++;1h[1h.B]=\'/1p?\'+q+\'5n-2c=\'+2y+\'&2c-1X=\'+21}}e++}H(w p=0;p<1h.B;p++){z(p>=(c-1Z-1)&&p<(c+1Z)){z(3Y==0&&c>(1Z+1)){40=\'<C D="2H 3b"><a E="\'+1h[c-2]+\'">\'+43+\'</a></C>\';3Y++}z(3Z==0&&(c+2)<1h.B){41=\'<C D="2H 3a"> <a E="\'+1h[c]+\'">\'+5q+\'</a></C>\';3Z++}z(p==(c-1)){f+=\'<C D="5s 44">\'+c+\'</C>\'}G{z(p==0){f+=\'<C D="3K"><a E="/">1</a></C>\'}G{f+=\'<C D="3K"><a E="\'+1h[p]+\'">\'+(p+1)+\'</a></C>\'}}}}z(c>(1Z+1))3b=\'<C D="2H 3b"><a E="/">1..</a></C>\';z((c+1Z)<1h.B)3a=\'<C D="2H 3a"> <a E="\'+1h[1h.B-1]+\'">..\'+1h.B+\'</a></C>\';z(c>=1){f=\'\'+40+3b+\' \'+f+\' \'}f=\'<O D="5z"><C 2d="5A: #5B;" D="5C"> 5E (\'+(d-1)+\')</C>\'+f+3a;z(c<(d-1)){f+=41}z(d==1)d++;f+=\'</O>\';w j=K.5G("5H");w k=K.1L("5I-3J");z(d<=2){f=\'\'}H(w p=0;p<j.B;p++){j[p].1C=f}z(j&&j.B>0){f=\'\'}z(k){k.1C=f}}A 6V(a){w b=3X;w c=16 1v();w d=b.M("/1p/1K/")!=-1;w e=d?b.1U(b.M("/1p/1K/")+14,b.B):"";e=e.M("?")!=-1?e.1U(0,e.M("?")):e;w f=1;w g=1;w h=0;w j=0;w k=0;w l=\'\';w m=\'\';w n=\'\';w o=\'<C D="3K"><a E="/1p/1K/\'+e+\'?&2c-1X=\'+21+\'">\';w b=3X;H(w i=0,P;P=a.Z.13[i];i++){w q=P.24.$t.1O(0,19)+P.24.$t.1O(23,29);2y=5k(q);w r=P.R.$t;z(r!=\'\'){z(h==0||(h%21==(21-1))){z(b.M(2y)!=-1){f=g}z(r!=\'\')g++;c[c.B]=\'/1p/1K/\'+e+\'?5n-2c=\'+2y+\'&2c-1X=\'+21}}h++}H(w p=0;p<c.B;p++){z(p>=(f-1Z-1)&&p<(f+1Z)){z(j==0&&p==f-2){z(f==2){m=o+43+\'</a></C>\'}G{m=\'<C D="2H"><a E="\'+c[p]+\'">\'+43+\'</a></C>\'}j++}z(p==(f-1)){l+=\'<C D="5s">\'+f+\'</C>\'}G{z(p==0){l=o+\'1</a></C>\'}G{l+=\'<C D="3K"><a E="\'+c[p]+\'">\'+(p+1)+\'</a></C>\'}}z(k==0&&p==f){n=\'<C D="2H"> <a E="\'+c[p]+\'">\'+5q+\'</a></C>\';k++}}}z(f>1){z(!d){l=\'\'+m+\' \'+l+\' \'}G{l=\'\'+m+\' \'+l+\' \'}}l=\'<O D="5z"><C 2d="5A: #5B;" D="5C"> 5E (\'+(g-1)+\')</C>\'+l;z(f<(g-1)){l+=n}z(g==1)g++;l+=\'</O>\';w s=K.5G("5H");w t=K.1L("5I-3J");z(g<=2){l=\'\'}H(w p=0;p<s.B;p++){s[p].1C=l}z(s&&s.B>0){l=\'\'}z(t){t.1C=l}}5M.5N("1k","1");A Y(c,a,b){v.3I=b||"";v.3H=[];v.1j=[];v.1k=[];v.2J=0;v.22=5;v.1P="";v.3F="5W";K.1o(\'<O 47="\'+c+\'" D="\'+a+\'"></O>\');v.48=K.1L(c);v.1G="<1a>"}Y.18.7y=A(b,a){v.3H[v.3H.B]=b;v.1j[v.1j.B]=a};Y.18.7A=A(b,a){v.22=b;z(2z a!="1q"){v.3F=a}};Y.18.7C=A(a){v.1P=a};Y.18.7E=A(a){v.1G="<"+a.3E()+">"};Y.18.7J=A(){v.2J=0;v.1k=[];v.48.1C=\'<i D="2w 2w-7S 2w-2x 2w-7T"></i>\'+6j;w a=v;H(w b=0;b<v.1j.B;b++){w c=16 5M.1k.6k(v.1j[b]);w d=(v.22<=v.1j.B)?1:2P.4M(v.22/v.1j.B);z(v.22%v.1j.B>0&&v.22>v.1j.B&&b==v.1j.B-1){d+=(v.22%v.1j.B)}c.7X(d);c.5N(A(e){I A(f){a.4Q(f,e)}}(v.3H[b]))}};Y.49=A(a,c){w d=16 4a(a);w b=(c.M("85")!=-1)?d.86():(c.M("5W")!=-1)?d.88():(c.M("8a")!=-1)?d.8d():"";I"<C D=\'8h\'>"+b+"</C>"};Y.4b=A(a,b){w b=(b=="1K")?"36":b;z(b=="R"||b=="36"){a.4U(A(e,d){w g=e[b].3E();w f=d[b].3E();I(g<f)?-1:(g>f)?1:0})}G{54{a.4U(A(e,d){I 16 4a(d.3A)-16 4a(e.3A)})}58(c){}}};Y.18.4Q=A(b,a){w d=(!b.3S)?b.Z.4V:"";z(d==""){4W("8z 6k 8G 8H: "+b.3S.4X)}H(w c=0;c<d.B;c++){b.Z.4V[c].36=a}v.1k=v.1k.8K(d);v.4c()};Y.18.4c=A(){v.2J+=1;z(v.2J==v.1j.B){v.4d(v.1k)}};Y.18.4d=A(a){w e=(v.1G=="<1a>")?"<T>\\n":"";Y.4b(a,v.3F);H(w c=0;c<a.B;c++){w d=\'<a E="\'+a[c].L+\'" 34="\'+v.3I+\'" D="4Z">\'+a[c].R+"</a>";w b=/1K/i.25(v.1P)?\'<C D="50">[\'+v.1k[c].36+"]</C>":" ";w g=Y.49(a[c].3A,v.1P);w f=/51/i.25(v.1P)?"<U />"+a[c].W:/52/i.25(v.1P)?"<U />"+a[c].53:"";e+=v.1G+d+" "+b+" "+g+"\\n"+f+v.1G.1i("<","</")+"\\n\\n"}e+=(v.1G=="<1a>")?"</T>":"";v.48.1C=e};A 1F(d,b,a,c){v.9k=d;v.3x=3W(a);v.3z=0;v.1u=1;v.1R=0;Y.9p(v,d,b,c);v.1G="<O>";v.2p=K.1L(d)}1F.18=16 Y;1F.18.9w=1F;1F.18.4d=1D;1F.18.9x=A(a){v.1u=a};1F.18.4c=A(){v.2J+=1;z(v.2J==v.1j.B){v.56(v.1k)}};1F.18.56=A(a){w c=v;Y.4b(a,v.3F);v.1u=(v.1u>=a.B)?1:v.1u;w b=a.57(v.1R,v.1u);v.2p.1C=4f(b,v.1P,v.1G,v.3I);v.2p.59=A(){c.3z=1};v.2p.5a=A(){c.3z=0};v.1R=v.1u;z(N.3w){N.3w("6t",A(){c.2p.59=c.2p.5a=1D})}2q(A(){c.3v()},v.3x)};A 4f(d,b,f,g){w c=(f=="<1a>")?"<T>\\n":"";H(w e=0;e<d.B;e++){w h=\'<a E="\'+d[e].L+\'" 34="\'+g+\'" D="4Z">\'+d[e].R+"</a>";w j=/1K/i.25(b)?\'<C D="50">[\'+d[e].36+"]</C>":" ";w k=Y.49(d[e].3A,b);w a=/51/i.25(b)?"<U />"+d[e].W:/52/i.25(b)?"<U />"+d[e].53:"";c+=f+h+" "+j+" "+k+"\\n"+a+f.1i("<","</")+"\\n\\n"}c+=(f=="<1a>")?"</T>\\n":"";I c}1F.18.3v=A(){w b=v;z(v.3z==1){2q(A(){b.3v()},5b)}G{w a=v.1k.57(v.1R,v.1R+v.1u);v.2p.1C=4f(a,v.1P,v.1G,v.3I);v.1R=(v.1R+v.1u>v.1k.B-1)?0:v.1R+v.1u;2q(A(){b.3v()},v.3x)}};N.2L=A(){I A(p,q){w a,h=A(b){w c;b||(b=N.6v);b.34?c=b.34:b.4P&&(c=b.4P);3===c.6x&&(c=c.6y);c.31&&(N.4l.E=c.31)},k=A(b){b=b.6z.3E();I"T"===b||"6A"===b},l=A(b){H(w c=1;K.1L("2L"+c);c++){}I b?"2L"+c:"2L"+(c-1)},n=A(b){g++;w c=b.2b.B,a="",d="",f=g-1;z(c){z(f){H(;f--;){d+=r}d+=" "}H(f=0;f<c;f++){w e=b.2b[f].2b[0];z("1q"!==2z e){w h=e.6C||e.6D,i="";j&&(i=-1!==e.4h.1p(j)||-1!==e.6F.4h.1p(j)?m:"");s&&!i&&(i=e.E===K.5e?m:"");a+=\'<1A 31="\'+e.E+\'" \'+i+">"+d+h+"</1A>";t&&(e=b.2b[f].2b[1])&&k(e)&&(a+=n(e))}}1===g&&o&&(a=\'<1A 31="">\'+o+"</1A>"+a);1===g&&(a=\'<2v D="2L" 47="\'+l(!0)+\'">\'+a+"</2v>");g--;I a}};z((a=K.1L(p))&&k(a)){K.6J.4h+=" 6K";w d=q||{},j=d.9G||"J",s="5f"===2z d.4j?d.4j:!0,t="5f"===2z d.4k?d.4k:!0,r=d.5g||"→",o=d.1K||"- 6Q -",g=0,m=" 2s ";a.6S("6T",n(a));a=K.1L(l());a.5i&&a.5i("5j",h);a.3w&&a.3w("6W",h)}}}();$(A(){$(\'.2h 1a\').6Y(A(){$(v).2b(\'T\').6Z(\':70(:71)\').1Q(72)},A(){$(v).2b(\'T\').2m(5c)});$("#73 .3s").74({5l:75,4i:1,76:30,78:3,79:0,7a:1V,7b:"#7c",7d:"#7e"});w c=F(\'.P\'),$1I=F(\'a.7f\');$3q=F(\'a.7h\');$3q.Q(A(){c.1b("1I");F(v).V(\'J\');$1I.1b(\'J\');F.2l(\'4p\',0);F(\'O.P\').3n(A($){F(\'1f.P-R a\',v).1E(\'U\').7n(\' \')});I 1N});$1I.Q(A(){c.V("1I");F(v).V(\'J\');$3q.1b(\'J\');F.2l(\'4p\',1);F(\'O.P\').3n(A($){F(v).3l({3k:F(\'.13\',v).S()});z(F(\'1f.P-R a\',v).1E(\'U\').B)I 1N;5t=F(\'1f.P-R a\',v).S().2M(/\\(([^)]+)\\)/);1B=F(\'1f.P-R a\',v).S();1g=\'\';z(5t!=1D){1g=F(\'1f.P-R a\',v).S().2M(/\\(([^)]+)\\)/)[1];1B=F(\'1f.P-R a\',v).S().1i(/ *\\([^)]*\\) */g,"");z(1g!=\'\')1g=\'<U/><U/>(\'+1g+\')\'}F(\'1f.P-R a\',v).S(1B+1g)});I 1N});z(F.2l(\'4p\')==0){$3q.4t(\'Q\')}G{$1I.4t(\'Q\')}$(K.2Y).3P(\'<O 47="5v-5w-5x">\'+6j+\'</O>\');$(N).2C("7x",A(){$(\'#5v-5w-5x\').4u(30).3x(7z).4v(30)});$(\'.2X-1p-3h\').Q(A(e){$(v).4w(\'J\');4q(1V)});$(\'#3g .2a-W\').2m();$(\'#3g 1f:7D\').V(\'J\').2W().4y(\'27\');$(\'#3g 1f\').1J(\'7H\',\'7I\').Q(A(){z($(v).2W().5F(\':4z\')){$(\'#3g 1f\').1b(\'J\').2W().7L(\'27\');$(v).4w(\'J\').2W().4y(\'27\')}});2L(\'2h-7M\',{1K:\'7N \',4k:1V,4j:1N,5g:\'-\'});$("#7O-7P a").Q(A(){$(v).4w("J")});$("a.7Q").Q(A(){$("#7R").4A("27")});$(\'.4F-3h\').Q(A(e){4x()});z($(\'#1d-1w\').B){$(\'#1d-1w .3e\').2m();$(\'#1d-1w .3e:5K\').1Q();$(\'.1d-1w-2a-2h T 2r:5K\').V(\'2s\');$(\'.1d-1w-2a-2h T 2r\').Q(A(){z($(v).4C(\'2s\'))I;$(\'.1d-1w-2a-2h T 2r\').1b(\'2s\');$(v).V(\'2s\');$(\'#1d-1w .3e\').2m();$(\'#1d-1w .3e\').3G($(\'.1d-1w-2a-2h T 2r\').4D(v)).4y()(4E)})}$(\'1a\',"T.2j-7Z").Q(A(e){z(!$(v).4C("J")){w a=$(v).4D();w b=a+1;$("1a",$(v).2E()).1b("J");$(v).V("J");$($("T.2j-W > 1a"),$(v).2E().2E()).1b("J");$($("T.2j-W > 1a:81-82("+b+")"),$(v).2E().2E()).V("J")}});$(\'b\',\'.5O\').Q(A(e){$(\'C\',\'.5O\').4A()});z($("#2A").B){$("#2A").1J("2k",$(K).2k());$(N).5Q(A(){$("#2A").1J("1l",$(K).1l())});$("#2U-87").Q(A(){z($("#2A").5F(":4z")){$("#2A").4u(\'27\');$(\'2Y\').1J(\'5S\',\'4z\');$(\'.1z-2T\').1b(\'1T-2C\').V(\'1T-3L\');$(v).1b(\'2U-2C\').V("2U-3L");$(\'C\',v).S(8c)}G{$("#2A").4v(\'4I\');$(\'2Y\').1J(\'5S\',\'5l\');$(\'.1z-2T\').1b(\'1T-3L\').V(\'1T-2C\');$(v).1b(\'2U-3L\').V(\'2U-2C\');$(\'C\',v).S(8e)}})}z($(\'.1e-2S-1T\').B){$(\'.1e-2S-1T\').S(8g)}z($(\'.1e-28\').B){A 4J(a){$(\'.1e-2S-1T\').4u(\'4I\',A(){N.2q(A(){$(\'.1e-2S-1T\').4v(\'27\')},8j)});$(\'2R\',\'.1z-2T\').1m(\'1c\',a);I 1N}$(".1e-28 a").Q(A(e){e.5X();4J($(v).1m(\'E\'));$(".1e-28 a").1b("J");$(v).V("J")});3y=\'<2v><1A D="J">\'+$(\'.1e-28\').8o().4K(0).8q+\'</1A>\';$(\'.1e-28 a\').3n(A(i){3y+=\'<1A 31="\'+$(v).1m(\'E\')+\'"\'+($(v).1m(\'E\')==$(\'2R\',\'.1z-2T\').1m(\'1c\')?\' D="J"\':\'\')+\'>\'+$(v).2f()+\'</1A>\'});3y+=\'</2v>\';$(\'.1e-28-2X\').3P(3y);$(".1e-28-2X 2v").5j(A(e){$("1A",v).1b("J");$(v).1E(":2s").V("J");4J($(v).5Z())})}z($(\'.2r-L\').B){$(\'.2r-L a\').Q(A(e){z($(v).2E().4C(\'8r\')){e.5X();N.8s(\'//8t.8u.8v/#2B=\'+$(v).1m(\'E\'))}})}z($(\'.1t-61 .2w-3u\').B){$(\'.1t-61 .2w-3u\').Q(A(){$(".63-3u").4A()});$(\'8A\',\'.63-3u\').Q(A(e){$(v).2v()})}z($(\'.44\').B){$(\'.44\').Q(A(e){w a=8B(8C);z(a==\'\'||a===1D)I;a=3W(a);z(!8D(a)){a=a>1h.B?1h.B:a;N.4l.E=1h[a-1]}G 4W(8E)})}w d,3r;z($(\'a.64-L\').B){d=$(\'a.64-L\');$.4K(d.1m(\'E\'),A(a){1s=$(a).1E(\'.P 2G.P-R\').2f();1s=1s.1U(1s.M(\': \')+2);d.S(\'<3m>\'+8J+\'</3m> <C>\'+1s+\'</C>\')},"S")}G $(\'.2W\',\'.67-3J\').V(\'68\');z($(\'a.69-L\').B){3r=$(\'a.69-L\');$.4K(3r.1m(\'E\'),A(a){1s=$(a).1E(\'.P 2G.P-R\').2f();1s=1s.1U(1s.M(\': \')+2);3r.S(\'<3m>\'+8N+\'</3m> <C>\'+1s+\'</C>\')},"S")}G $(\'.8O\',\'.67-3J\').V(\'68\');$(\'C\',\'.2Q.2O 1f\').Q(A(){$(\'C\',\'.2Q.2O 1f\').1b(\'J\');$(v).V(\'J\');w a=$(\'C\',\'.2Q.2O 1f\').B-$(v).4D();$(\'.6b\').2m();$("O.6b:3G("+a+")").1Q()});$(\'C.J\',\'.2Q.2O 1f\').4t(\'Q\');$(\'a\',\'.2Q.2O 1f.R\').3n(A(){$(v).3l({3k:$(v).1m(\'E\')})});w f=$(\'.2e-2n\').38().1d;z($(\'#2o-1t-N\').B){w g=\'3N\';w h=(($(\'.1d-1w-2a-2h\').8T().1d)-($(N).2k()/1));z(h<4E){h=4E}$(\'#1t-8U\').Q(A(){$(\'#2o-1t-N\').3M({\'2Z\':\'-8X\'},8Y,A(){g=\'3N\'})})}$(\'.3c\').Q(A(e){$("S, 2Y").3M({32:0})});z($(\'.2D-3s\').B){A 6f(){3C=$.2D({W:$(\'.2D-3s\').S(),91:\'92-6c-93\',});4H=$.94({3t:\'2D-3t\',1I:\'2D-2S-1I\',95:96,97:1,98:{99:9a,9b:9c,9d:9e,}})};A 6g(){z(2z F.2l(39)!=\'1q\'){z(F.2l(39)==9f)I}z(3C.9g())I;z(2V!=1D){9h(2V);2V=1D}3C.1Q();4H.9i().9j()};2i=F.2l(39);z(2z 2i==\'1q\'||2i==0||2i==1D)N.2q(A(){6f()},30*60*15);$(\'2Y\').2C(\'9m.6h-2D\',A(){2i=F.2l(39);z(2i===1q||2i==0){2V=2q(A(){6g()},30*60*15)}})}z($(\'.4N-4O-3T\').B){$(\'.4N-4O-3T\').S($(\'.4N-4O-3T\').S().1i(\'</a> <a\',\'</a> \'+9q+\' <a\').1i(\'. <a\',\'.<U/><a\'))}$(\'.9r-9s\').3l({6l:1V,3k:9u});$(\'#9v\').3l({6l:1V,3k:"<a E=\'6m://4L.6n.2t/\' 34=\'9y\'>6m://4L.6n.2t/</a>"});3V($);4n();$(\'.9z-3S\').Q(A(e){w a=9A+"\\n - 5e: "+$(v).1m(\'26\')+"\\n - 9B: "+$(\'.1z-2T 2R\').1m(\'1c\')+"\\n-------------------\\n"+9C;$(\'.4F-4G-4X\').5Z(a);4x()});$(N).5Q(A(){z($(\'.3i-3O\').B){w a=$(\'.3i-3O 2R\').1m(\'1c\').1H(\'1l=\'),1l=$(\'.3i-3O-3s\').1l();$(\'.3i-3O 2R\').1m(\'1c\',a[0]+\'1l=\'+1l)}3V($);4n();4q(1N)});$(K).4i(A(){z($(\'#2o-1t-N\').B){z((($(N).32())>h)&&$(\'#2o-1t-N\').1J(\'2Z\')==\'-6p\'&&g==\'3N\'){$(\'#2o-1t-N\').3M({2Z:\'2g\',},\'27\');g=\'6q\'}G z(($(N).32()<h)&&$(\'#2o-1t-N\').1J(\'2Z\')==\'2g\'&&g==\'6q\'){$(\'#2o-1t-N\').3M({2Z:\'-6p\',},\'4I\');g=\'3N\'}}z($(N).32()>=f)$(\'.2e-2n\').V(\'4Y\');G $(\'.2e-2n\').1b(\'4Y\')})});',62,601,'|||||||||||||||||||||||||||||||this|var|||if|function|length|span|class|href|jQuery|else|for|return|active|document|link|indexOf|window|div|post|click|title|html|ul|br|addClass|content|img|gfeedfetcher|feed||||entry|||new|relatedTitles|prototype||li|removeClass|src|top|video|h2|vi_title|htmlMap|replace|feedurls|feeds|width|attr|relatedUrls|write|search|undefined|relatedTitlesNum|movie_title|share|itemsperpage|Array|comment|thumburl|break|media|option|en_title|innerHTML|null|find|gfeedrssticker|itemcontainer|split|bar|css|label|getElementById|posLeft|false|substring|showoptions|show|messagepointer|in|screen|substr|true|listing_posts|results|left|displayPageNum||pageCount|feedlimit||published|test|rel|slow|server||widget|children|max|style|headline|text|0px|menu|PSZ_Like2Reveal_checker|tab|height|cookie|hide|wrapper|fl|tickerdiv|setTimeout|dl|selected|com|outerWidth|select|fa||timestamp|typeof|blackscreen|url|on|Like2Reveal|parent|splice|h1|showpage|postdate|feedsfetched|summary|selectnav|match|moinfo|section|Math|footer|iframe|loading|player|light|recall_blocker_timeout|next|mobile|body|bottom|1000|value|scrollTop|author|target||ddlabel|profile|offset|PSZ_Like2Reveal_cookie|lastPage|firstPage|back_to_top|alternate|widget2|10px|sidebar|button|fb|imgr|tipContent|aToolTip|strong|each|thumbnail|reporter|dat|olderLink|container|counter|code|_rotatemessage|attachEvent|delay|mobile_server|mouseoverBol|publishedDate|outer|PSZ_Like2Reveal|continue|toLowerCase|sortstring|eq|feedlabels|linktarget|pager|showpageNum|off|animate|closed|comments|append|postimg|len|error|wrap|num_related_posts|resetBackTopButton|parseInt|home_page_url|fFlag|eFlag|upPageHtml|downPageHtml|num_latest_post_by_author|upPageWord|currentPage|phimini|posts|id|feedcontainer|_formatdate|Date|_sortarray|_signaldownloadcomplete|_displayresult|latest_by_author|formatrssmessage|posTopMargin|className|scroll|autoselect|nested|location|no_img_url|resetVideoToolbar|s72|dat_style|resetMobileSearchButton|toggle|searchform|trigger|fadeIn|fadeOut|toggleClass|contact_modal|slideDown|hidden|slideToggle|re|hasClass|index|300|contact|form|PSZ_Like2Reveal_counter|fast|videoSourceChanger|get|www|floor|status|msg|srcElement|_fetch_data_as_array|contains_thumbs|related_posts_loaded|margin|sort|entries|alert|message|floatable|titlefield|labelfield|description|snippet|contentSnippet|try|case|_initscroller|slice|catch|onmouseover|onmouseout|100|400|maskolis_img|URL|boolean|indent|callback|addEventListener|change|encodeURIComponent|auto|script|updated|getParameterByName|json|downPageWord|right|showpagePoint|titles|related_results_labels_thumbs2|elegant|page|loader|title_split|showpageArea|COLOR|000|showpageOf|type|Pages|is|getElementsByName|pageArea|blog|replies|first|alt|google|load|screenshots|relatedpoststitle|resize|default|overflow|clear|getScript|while|date|preventDefault|both|val||codes|num_recent_posts|links|newer|h4|random|nextprev|disabled|older|dynamic_content|PopularPosts|L2R|600|float|init_Like2Reveal|Like2Reveal_on_leaving|PSZ|latest_by_author_loaded|page_loading_msg|Feed|clickIt|http|themexpose|padding|450px|opened|maxresults|decoration|onunload|none|event|related_results_labels_thumbs|nodeType|parentNode|nodeName|ol|Sep|innerText|textContent|background|parentElement|e6e6e6|cdn|lazying|documentElement|js|thumb|ColorRespMov|related_posts|bg|png|Navigation|repeat|insertAdjacentHTML|afterend|Aug|showpageCount2|onchange|exec|hover|filter|not|animated|200|carousel|jCarouselLite|4000|speed|border|visible|start|circular|btnPrev|previous_button|btnNext|next_button|bar_view|1px|dat_view|RegExp|solid|Jul|Jun|c9c9c9|replaceWith|190px|color|May|Apr|520|4B4444|38px|align|center|beforeunload|addFeed|6000|filterfeed|font|displayoptions|last|setentrycontainer|Mar|9_|cursor|pointer|init|Feb|slideUp|main|Menu|drop|categories|on1|dropMenuWrapper|spinner|spin|size|toKeywords|12px|setNumEntries|line|header|String|nth|child|16px|showpageCount|datetime|toLocaleString|switcher|toLocaleDateString|modal|time|removeHtmlTag|light_on_msg|toLocaleTimeString|light_off_msg|join|vid_loading_msg|datefield|308|1500|charAt|PREScriptZ|Jan|masSummaryAndThumb|contents|gform_foot|nodeValue|yt|open|en|savefrom|net|facebook|car|pro|Google|input|prompt|go_custom_page_msg|isNaN|go_custom_page_error_msg|getElementsByTagName|API|Error|by|next_post_msg|concat|Dec|Nov|prev_post_msg|previous|showRandomImg|alignnone|latest_by_author_msg|showrecentposts|position|closer|latest_by_author_name|removeRelatedDuplicates_thumbs|650px|500|APP|related|popup_class|psz|green|Countdown|timeout|like2reveal_timeout|hide_blocker|labels|wait|like2reveal_wait_msg|minute|like2reveal_min_msg|second|like2reveal_sec_msg|365|opening|clearTimeout|reset|run|tickerid|275px|close|printRelatedLabels_thumbs|currentposturl|call|or_msg|policy|agreement|switch|policy_content|skinmaker|constructor|entries_per_page|_blank|report|vid_error_msg|Video|vid_more|slider_title|210px|Oct|activeclass'.split('|'),0,{}))

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

