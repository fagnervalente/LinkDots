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
			context.strokeStyle = '#FFFFFF';
			context.lineCap = 'round';
			context.lineWidth = 2;
			context.stroke();
		},
		newDot: function(){

			var newDot = {};

			if ( LAST_POINT != null )
				newDot.start = $.extend({}, newDot.start, LAST_POINT);
			else
				newDot.start = exports.randomDot();

			newDot.finish = exports.randomDot();

			exports.drawLine(newDot);

			LAST_POINT = newDot.finish;
		}

	};

	return exports;

})();