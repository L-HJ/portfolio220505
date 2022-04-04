$(document).ready(function(){
    /* grid 필터 */
    var $grid = $('.grid').isotope({
      // options
    });
    // filter items on button click
    $('.list_top').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
    
    /* 버튼 클래스 */
    $('.list_top').each( function( i, buttonGroup ) {
        var $buttonGroup = $('.list_top');
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.on').removeClass('on');
          $( this ).addClass('on');
        });
    });

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
});