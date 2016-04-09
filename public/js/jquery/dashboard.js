;(function ($, window, document, undefined) {

	/*global jQuery, console*/

	'use strict';

	var pluginName = 'dashboard';

	$.fn[pluginName] = function (options) {
        var args = arguments;
		this.each(function () {
			var _this = $.data(this, pluginName);
			if (_this && typeof options === 'string') {
				_this[options].apply(_this, Array.prototype.slice.call(args, 1));
			} 
            else if (_this && typeof options === 'object') {
                _this['update'].apply(_this, [ options ]);
            }
			else if (!_this) {
            	return $.data(this, pluginName, new Dashboard(this, $.extend(true, {}, options)));
			}
		});
	};

	var Dashboard = function (el, options) {
		this.$element = $(document.createElement('div')).appendTo($(el));
		this.options = options;
		this.render();
	};

	Dashboard.prototype.update = function (options) {
        if(options) {
            this.options = options;
        }
		this.options.factory.update();
		this.render();
	};
    
	Dashboard.prototype.render = function () {

		var data = this.options.factory.data;
        
        var $el = this.$element;
        var dif = data.length - $el.children().length;
        
        // diff
        if(dif < 0) { $el.children('.item:lt(' + (-1*dif) + ')').remove(); }
        if(dif > 0) { for(var i=0;i<dif;i++){ $el.append($(document.createElement('div')).addClass('item').data({ color: '', val: -1 }).append($(document.createElement('label')))); }}
                
        // update
        var dl = 0;
        $el.children().each(function() {
           var d = data[dl++];
           var $t = $(this); var td = $t.data(); var c = 0;
           if(td.color !== d.color){ c = 1; $t.css({'background-color': d.color}); }
           if(td.val === -1 || td.val != d.val){ c = 1; $t.children('label').text(d.val + '%'); }
           if(c === 1) {$t.data(d);}
        });
        
	};

})(jQuery, window, document);
