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
        autoplay: false
    });
    $(".sliderLink li").on("click", function() {
        console.log('11');
        $(".sliderLink li").removeClass('active glyphicon');
        $(this).addClass('active glyphicon');

        slider.unslider('animate:' + $(this).index());
    });

    slider.on('unslider.change', function(event, index, slide) {
        console.log('Slide has been changed to22ss  asaas2 ' + index);
        $(".sliderLink li").removeClass('active glyphicon');
        $(".sliderLink li").eq(index).addClass('active glyphicon');
    });
})
