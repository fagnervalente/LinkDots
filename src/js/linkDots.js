var linkDots = (function(){

	var LAST_POINT = null;
	var PATH_STRING = "";
	var PAPER = null;
	var NOW_LENGTH = 0;

	var LINES = [];

	var HEXA = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
	
	var exports = {

		init: function(options){
			exports.options = $.extend({}, exports.options, options);
			LAST_POINT = exports.randomDot();
			PAPER = new Raphael(exports.options.element, exports.options.maxWidth, exports.options.maxHeight);
		},
		getLastPoint: function(){
			return LAST_POINT;
		},
		options: {
			minWidth: 0,
			maxWidth: 0,
			minHeight: 0,
			maxHeight: 0,
			element: undefined
		},
		randomDot: function(){
			return {
				x: Math.floor(Math.random() * (exports.options.maxWidth - exports.options.minWidth + 1) + exports.options.minWidth),
				y: Math.floor(Math.random() * (exports.options.maxHeight - exports.options.minHeight + 1) + exports.options.minHeight)
			};
		},
		drawNextPoint: function(obj, type){

			var pathString = "M" + LAST_POINT.x + " " + LAST_POINT.y + "L" + obj.finish.x + " " + obj.finish.y;

			LINES.push(
				exports.drawPath(PAPER, pathString, 2500, { 
					stroke: '#999',
					'stroke-width': 1,
					'stroke-dasharray': ["--"]
				})
			);

		},

		drawCircle: function(point, radius, background){

			console.log(background);

			var circle = PAPER.circle(point.x, point.y, 1).attr({
				fill: background,
				'stroke-width':0
			}).animate({
				r: radius
			}, 1000, 'elastic');

		},
		newDot: function(){

			var newDot = {};

			var background = exports.randomColor(0.3);


			if ( LAST_POINT != null )
			{
				newDot.start = $.extend({}, newDot.start, LAST_POINT);
			}
			else
			{
				newDot.start = exports.randomDot();
				exports.drawCircle(newDot.start, exports.randomBetween(10,100), background);
			}

			newDot.finish = exports.randomDot();

			setTimeout(function(){
				exports.drawCircle(newDot.finish, exports.randomBetween(10,100), background);
			}, 2500);

			exports.drawNextPoint(newDot);
			//exports.drawPath(newDot.finish);

			LAST_POINT = newDot.finish;
		},
		randomBetween: function(min, max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
	    randomColor: function(opacity){

	    	return "rgba(" +
	    		exports.randomBetween(0, 255) + "," +
	    		exports.randomBetween(0, 255) + "," +
	    		exports.randomBetween(0, 255) + "," +
	    		opacity + ")";

	    },
	    drawPath: function( canvas, pathstr, duration, attr, callback )
		{
		    var guide_path = canvas.path( pathstr ).attr( { stroke: "none", fill: "none" } );
		    var path = canvas.path( guide_path.getSubpath( 0, 1 ) ).attr( attr );
		    var total_length = guide_path.getTotalLength( guide_path );
		    var last_point = guide_path.getPointAtLength( 0 );
		    var start_time = new Date().getTime();
		    var interval_length = 100;
		    var result = path;        

		    var interval_id = setInterval( function()
		    {
		        var elapsed_time = new Date().getTime() - start_time;
		        var this_length = elapsed_time / duration * total_length;
		        var subpathstr = guide_path.getSubpath( 0, this_length );            
		        attr.path = subpathstr;

		        path.animate( attr, interval_length );
		        if ( elapsed_time >= duration )
		        {
		            clearInterval( interval_id );
		            if ( callback != undefined ) callback();
		                guide_path.remove();
		        }                                       
		    }, interval_length );  

		    return result;
		}

	};

	return exports;

})();