var linkDots = (function(){

	var LAST_POINT = null;
	
	var exports = {

		init: function(options){
			exports.options = $.extend({}, exports.options, options);
		},
		getLastPoint: function(){
			return LAST_POINT;
		},

		options: {
			minWidth: 0,
			maxWidth: 0,
			minHeight: 0,
			maxHeight: 0,
			canvas: undefined
		},
		randomDot: function(){
			return {
				x: Math.floor(Math.random() * (exports.options.maxWidth - exports.options.minWidth + 1) + exports.options.minWidth),
				y: Math.floor(Math.random() * (exports.options.maxHeight - exports.options.minHeight + 1) + exports.options.minHeight)
			};
		},
		drawLine: function(obj){
			var context = exports.options.canvas.getContext('2d');

			context.beginPath();
			context.moveTo(obj.start.x, obj.start.y);
			context.lineTo(obj.finish.x, obj.finish.y);
			context.strokeStyle = 'rgba(255,255,255,0.1)';
			context.lineCap = 'round';
			context.lineWidth = 2;
			context.stroke();
		},
		drawCircle: function(point, radius, background){

			var context = exports.options.canvas.getContext('2d');

			context.beginPath();
			context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
			context.fillStyle = background;
      		context.fill();

		},
		newDot: function(){

			var newDot = {};

			if ( LAST_POINT != null )
				newDot.start = $.extend({}, newDot.start, LAST_POINT);
			else
				newDot.start = exports.randomDot();

			newDot.finish = exports.randomDot();

			exports.drawCircle(newDot.start, exports.randomBetween(10,100), 'rgba(255,255,255,0.3)');

			exports.drawLine(newDot);

			LAST_POINT = newDot.finish;
		},
		randomBetween: function(min, max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

	};

	return exports;

})();