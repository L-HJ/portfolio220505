$(window).ready(function(){

	//a 링크 prevent
	$(document).ready(function(){
		preventDefaultAnchor();    
	});

	function preventDefaultAnchor() {
		$(document).on('click', 'a[href="#"]', function(e) {
			e.preventDefault();
		});
	}

		// scoll 이벤트 
		setParallaxWithBar('.scroll-page');

		function setParallaxWithBar(selector) {
		var numPage = $(selector).length;
		var pageNow = 0;
		var pagePrev = 0;
		var pageNext = 0;
		checkScroll();

		$(window).on('scroll resize', function() {
			checkScroll();
		});

		function checkScroll() {
			var scrollTop = $(document).scrollTop();
			$(selector).each(function(i) {
				var minScroll = $(this).offset().top - $(window).height() / 2;
				var maxScroll = $(this).offset().top + $(window).height() / 2;
				if (scrollTop > minScroll && scrollTop <= maxScroll) {
					var n = i + 1;
					$('.menu-links ul li').removeClass('on');
					$('.menu-links ul li:eq(' + (n - 1) + ')').addClass('on');
					pageNow = n;
					pagePrev = (n - 1) < 1 ? 1 : n - 1;
					pageNext = (n + 1) > numPage ? numPage : n + 1;
					return false;
				}
			});
		}
	}

	//header fixed 
	$(window).scroll(function(){
		var secoffset = $('.mainsec2').offset().top; 
		var scrollAmt = $(document).scrollTop(); 	
		if (secoffset <= scrollAmt) {
			$('.header').addClass('on');
		} else {
			$('.header').removeClass('on');
		};
		var secoffset = $('.section4').offset().top; 
		var scrollAmt = $(document).scrollTop(); 
		if (secoffset <= scrollAmt) {
			$('.bottom_con').addClass('on');
		} else {
			$('.bottom_con').removeClass('on');
		};
	});

	//scroll show hide
	checkVisibility('h2.ani_h2 , .mainsec2 div.timeline ul, .text_dc, .mainsec2 div.timeline li, .contact_wrap > div');
	$(window).on('scroll resize', function() {
		if ($(window).width() >= 767) {
			checkVisibility('h2.ani_h2 , .mainsec2 div.timeline ul, .text_dc, .mainsec2 div.timeline li, .contact_wrap > div');
		} else {
			checkVisibility('h2.ani_h2 , .mainsec2 div.timeline ul, .text_dc, .mainsec2 div.timeline li, .contact_wrap > div, div.pf_list');		
		}
	});

	function checkVisibility(selector) {
		var scrollTop = $(document).scrollTop();
		$(selector).each(function(i) {
			var $selector = $(this);
			var minScroll = $selector.offset().top - $(window).height();
			var maxScroll = $selector.offset().top + $selector.outerHeight();
			//if (i === 1) console.log(minScroll + ' / ' + scrollTop + ' / ' + maxScroll);
			if (scrollTop <= minScroll) {
				if ($selector.hasClass('down') !== true) {
					$selector.removeClass('show up');
					$selector.addClass('down');
					console.log('page: ' + (i + 1) + '번 down');
				}
			} else if (scrollTop >= maxScroll) {
				if ($selector.hasClass('up') !== true) {
					$selector.removeClass('down show');
					$selector.addClass('up');
					console.log('page: ' + (i + 1) + '번 up');
				}
			} else {
				if ($selector.hasClass('show') !== true) {
					$selector.removeClass('down up');
					$selector.addClass('show');
					console.log('page: ' + (i + 1) + '번 show');
				}
			}
		});
	}


	//scroll gage
	$(window).scroll(function(){
		var winTop = $(window).scrollTop(),
			h = $(document).outerHeight(),
			winh = $(window).height();
			
		// if(winTop >= h - winh){
		// 	$('.ani-btn').addClass('bottom');
		// }else{
		// 	$('.ani-btn').removeClass('bottom');
		// }
		
		if(winTop >= (h - winh) / 2){
		//문서의 절반만큼은 right-box가 움직여야하고
		//절반을 넘어가면 left-box가 움직여야 한다
			//절반 넘어가면
			$('.ani-btn .right-box .box-in').attr('style', 'transform: rotate(180deg);');//스크롤 상황에 따라 안채워질수도 있으므로 고정
			$('.ani-btn .left-box .box-in').attr('style', 'transform: rotate(' + ((winTop/(h - winh) - 0.5 ) * 360) + 'deg);');
		}else{//절반 미만이면
			$('.ani-btn .left-box .box-in').attr('style', 'transform: rotate(0deg);');//스크롤 상황에 따라 안지워질수도 있으므로 리셋
			$('.ani-btn .right-box .box-in').attr('style', 'transform: rotate(' + (winTop/(h - winh) * 360) + 'deg);');
		}
	});

	// 클릭 하면 scrolltop 0 으로 이동 
	$('.ani-btn').click(function(){
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	//aside scroll 하면 나타나기 
	$(window).scroll(function(){
		var winS = $(this).scrollTop();
		var sec5 = $('.section5').offset().top;
		if(winS >= 1) {
			$('.contac_aside').addClass('open');
		} else {
			$('.contac_aside').removeClass('open');
		};
	});

	//aside menu 
	$('.contac_aside a.contac_tit').on('click',function(){
	$('.contac_aside').toggleClass('on'); 
	$('.ani-btn').toggleClass('on'); 
	});

	//햄버거 버튼 
	$('.header a.menu').on('click', function(){
		$(this).toggleClass('open');
		$('.menu-links').toggleClass('open'); 
	});


	$(window).scroll(function(){
		var winS = $(window).scrollTop();
		var sec3Offset = $('.mainsec3').offset().top - 350;
		if(winS >= sec3Offset){
			$('.prompt').addClass('on');
		}
	});
});