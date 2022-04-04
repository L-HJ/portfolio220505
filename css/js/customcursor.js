/*
 * File       : js/main.js
 * Author     : STUDIO-JT (KMS)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) Global Functions
 * 2) Global Variable
 * 3) JT Default Funccoltions INIT
 * 4) Other Functions INIT
 * 5) ON LOAD
 * 6) ON RESIZE
 * 7) JT Default Functions
 * 8) Other Functions
 */



jQuery(function($) {


    custom_cursor();






// cursor custom
function custom_cursor(){

var $cursor = null;
var $inner = null;
var $circle = null;
var $txt = null;

if( $('html').hasClass('mobile') || $('html').hasClass('ie10') ) { return; }

// default moving
$('body').mousemove(function(e) {
    TweenMax.to($('#custom_cursor, #custom_cursor_text'), 1.3, {
        x: e.clientX,
        y: e.clientY,
        ease: Power3.easeOut
    });
});

// global cursor
$(document).on({
    mouseenter: function(){
        $cursor = $('#custom_cursor, #custom_cursor_text');
        $inner = $cursor.find('.custom_cursor_inner');
        $circle = $cursor.find('.custom_hover_circle');
        $txt = $cursor.find('.custom_hover_text');

        var $this = $(this);
        var words = ( $this.data('hover') != undefined ) ? $this.data('hover') : '';

        if( $this.hasClass('drag') ){ $cursor.addClass('drag'); }

        if( $this.hasClass('custom_simple_cursor') ){
            words = '';

            var size = ( $this.data('size') != undefined ) ? $this.data('size') : '48';

            TweenMax.to($inner, .1, {width: size,height: size,ease: Power0.easeNone});
        }

        $txt.find('> span').text( words );

        TweenMax.killTweensOf($circle, $txt);
        TweenMax.to($circle, .3, {width: '100%',height: '100%',autoAlpha: 1,ease: Power0.easeNone});
        TweenMax.to($txt, .3, {width: '100%',height: '100%',autoAlpha: 1,ease: Power0.easeNone});
    },
    mouseleave: function(){
        $cursor = $('#custom_cursor, #custom_cursor_text');
        $inner = $cursor.find('.custom_cursor_inner');
        $circle = $cursor.find('.custom_hover_circle');
        $txt = $cursor.find('.custom_hover_text');

        var $this = $(this);

        if( $this.hasClass('drag') ){ $cursor.removeClass('drag'); }

        if( $this.hasClass('custom_simple_cursor') ){
            TweenMax.to($inner, .2, {width: '100%',height: '100%',ease: Power0.easeNone});
        }

        TweenMax.killTweensOf($circle, $txt);
        TweenMax.to($circle, .2, {width: '0%',height: '0%',autoAlpha: 0,ease: Power0.easeNone});
        TweenMax.to($txt, .2, {width: '0%',height: '0%',autoAlpha: 0,ease: Power0.easeNone});
    }
}, '.custom_hover');

}



// custom element cursor
function element_cursor(){

$('.custom_element_cursor').each(function(){

    var $this = $(this);
    $this.append('<span class="custom_element_cursor_point"><i></i></span>');

    var $pointer = $this.find('.custom_element_cursor_point');
    var $pointer_icon = $this.find('.custom_element_cursor_point > i');
    var pointer_size = ( $this.data('size') != undefined ) ? $this.data('size') : '46';

    $this.on({
        mouseenter: function(){
            TweenMax.to($pointer, .3, {width: pointer_size,height: pointer_size,autoAlpha: 1,ease: Power0.easeNone});

            $this.bind('mousemove', function(e){
                var center_x = $pointer.offset().left + $pointer.width()/2;
                var center_y = $pointer.offset().top + $pointer.height()/2;
                var tween_x = e.pageX - center_x;
                var tween_y = e.pageY - center_y;

                if($this.hasClass('jt_discover_more')){
                    TweenMax.to($pointer_icon, 1.3, {x: tween_x / 2.0,y: tween_y / 2.0,ease: Power3.easeOut});
                }else{
                    TweenMax.to($pointer_icon, 1.3, {x: tween_x / 5.0,y: tween_y / 5.0,ease: Power3.easeOut});
                }
            });
        },
        mouseleave: function(){
            TweenMax.to($pointer, .3, {width: 0,height: 0,autoAlpha: 0,ease: Power0.easeNone});
            $this.unbind('mousemove');
        }
    });

});

}



}); // End jQuery
