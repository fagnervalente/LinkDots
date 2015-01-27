$(function(){

	var $canvas = $('#canvas-wrapper');

	$canvas.attr("width", $('body').width());
	$canvas.attr("height", $('body').height());

	linkDots.init({
		maxWidth: $canvas.width(),
		maxHeight: $canvas.height(),
		canvas: document.getElementById('canvas-wrapper')
	});

	var intervalDots = setInterval(function(){
		linkDots.newDot();
	},300);

});