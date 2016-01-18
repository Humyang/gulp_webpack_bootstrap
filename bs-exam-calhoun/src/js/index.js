// require('../css/common.less');

// require('../css/index.less');
var unslider = require('./vendor/unslider-min.js');
$(document).ready(function() {
    // alert('1');
    var slider = $('.banner').unslider({
        arrows: false,
        autoplay: true
    });
    var slider2 = $('.bannerTwo').unslider({
        arrows: false,
        autoplay: true
    });
    $(".sliderLink li").on("click", function() {
        console.log('11');
        $(".sliderLink li ").removeClass('active');
        $(this).addClass('active');
        $('span.glyphicon').remove();
        $(this).children().append("<span class='glyphicon'></span>");


        slider.unslider('animate:' + $(this).index());
    });

    slider.on('unslider.change', function(event, index, slide) {
        console.log('Slide has been changed to22ss  asaas2 ' + index);
        $(".sliderLink li").removeClass('active');
        $(".sliderLink li").eq(index).addClass('active');

        $('span.glyphicon').remove();
        $(".sliderLink li a").eq(index).before("<span class=' glyphicon'></span>");
    });
})
