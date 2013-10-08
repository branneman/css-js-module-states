$(function() {
    var resizeEnd;
    $(window).on('resize', function() {
        clearTimeout(resizeEnd);
        resizeEnd = setTimeout(function() {
            $(window).trigger('resizeEnd');
        }, 100);
    });
});