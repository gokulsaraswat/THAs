$('a.circle').on('click', function(){
	var animal = $(this).data('type');
	if (animal == 'cat') {
		$('.cat-options').addClass('active');
		$('.dog-options').removeClass('active');
	} else if (animal == 'dog') {
		$('.dog-options').addClass('active');
		$('.cat-options').removeClass('active');
	}
});

$('.options__item').on('click', function(){
	var photo = $(this).find('img').attr('src');
	$('.chosen-card').attr('src',photo);
	$('.postcard').addClass('active');
	$('.name').text($(this).data('name'));
});

$(window).on("load resize",function(e){
  var width =  $('.postcard__chosen').outerHeight();
	var height = $('.postcard__chosen').outerWidth();
	$('.postcard__back').outerHeight(height*1.1);
	$('.postcard__back').outerWidth(width*1.1);
});

$('.close-this').on('click', function(){
	$('.postcard').removeClass('active');
});