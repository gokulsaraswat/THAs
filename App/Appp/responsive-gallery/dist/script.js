$('li.next, li.prev').click(function(e) {
  var element = $(e.target).closest('li')
    , direction = (element.hasClass('prev') ? 'prev' : 'next')
    , activeImage = element.siblings('.active')
    , goTo;
  
  if (direction === 'prev') {
    goTo = activeImage.prev('.image');
  } else {
    goTo = activeImage.next('.image');
  }
  
  if (!goTo.length && direction === 'prev') {
    goTo = activeImage.siblings('.image').last();
  } else if (!goTo.length) {
    goTo = activeImage.siblings('.image').first();
  }
  
  goTo.addClass('active');
  activeImage.removeClass('active');
});