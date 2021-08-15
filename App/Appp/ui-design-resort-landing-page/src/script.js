$.fn.isInViewport = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on("load resize scroll", function () {
    $('.animate').each(function() {
        if( $(this).isInViewport() ) {
            $(this).addClass('active');
        }
    });
});