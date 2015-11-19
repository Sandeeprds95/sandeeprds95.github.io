/**
 * Created by Sandeep Ravindra on 12-11-2015.
 */
var myHeader = $('#fixed-header');
myHeader.data( 'position', myHeader.position() );
$(window).scroll(function(){
    var hPos = myHeader.data('position'), scroll = getScroll();
    if ( hPos.top < scroll.top ){
        myHeader.addClass('fixed');
    } else {
        myHeader.removeClass('fixed');
        myHeader.addClass('not-fixed');
    }
});

function getScroll () {
    var b = document.body;
    var e = document.documentElement;
    return {
        left: parseFloat( window.pageXOffset || b.scrollLeft || e.scrollLeft ),
        top: parseFloat( window.pageYOffset || b.scrollTop || e.scrollTop )
    };
}