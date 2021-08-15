// grab the youtube iframes, set them up to play content based on callPlayer functions
function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        // Frame exists,
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
};


$(document).ready(function() {
    $(".record").each(function() {
        // grab all the images and apply them as background images for the blurry parts
        $bg = $(this).find('img').attr('src');
        $text1 = $(this).find('h2').first().text();
        $(this).find('h2').first().attr('data-text', $text1);
        $text2 = $(this).find('h2').last().text();
        $(this).find('h2').last().attr('data-text', $text2);
        // lets shrink the text size if the string is too long
        if ($text1.length > 17) {
            $(this).find('h2').first().addClass('small');
        }
        if ($text2.length > 17) {
            $(this).find('h2').last().addClass('small');
        }
        $(this).css('background-image', 'url(' + $bg + ')');
    });
    // initial load states
    setTimeout(function() {
        $("#wrap").addClass("loaded");
    }, 1000);
    setTimeout(function() {
        $(".record").first().addClass("current");
    }, 2000);
});


$("a span").click(function() {
    $("a").toggleClass('playing')
});

// idk why I insist on building new sliders every 3 months?

$('.next').click(function() {
    if ($('.record').last().hasClass('current')) {
        $('.record.current').removeClass('current');
        $('.record').first().addClass('current');
    } else {
        $('.record.current').removeClass('current').next().addClass('current');
    }
});

$('.prev').click(function() {
    if ($('.record').first().hasClass('current')) {
        $('.record.current').removeClass('current');
        $('.record').last().addClass('current');
    } else {
        $('.record.current').removeClass('current').prev().addClass('current');
    }

});

// lets stop these songs on click of next/prev

$('.next, .prev').click(function() {
    $("a").removeClass('playing');
    $(".embed-container").each(function() {
        var thisPlayerID = $(this).attr("id");
        callPlayer(thisPlayerID, 'stopVideo');
    });
});