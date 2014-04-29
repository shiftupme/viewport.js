var viewport = {
	height: window.innerHeight || document.documentElement.clientHeight || document.getElementByTagName('body')[0].clientHeight,
	width: window.innerWidth || document.documentElement.clientWidth || document.getElementByTagName('body')[0].clientWidth,
	setup: function() {
		this.height = window.innerHeight || document.documentElement.clientHeight || document.getElementByTagName('body')[0].clientHeight;
		this.width = window.innerWidth || document.documentElement.clientWidth || document.getElementByTagName('body')[0].clientWidth;
	},
	getHeight: function() {
		return this.height;
	},
	getWidth: function() {
		return this.width;
	},
	matches: function(breakpoint) {
		// Private functions
		var lt, gt;
		lt = function(value, lt) {
			return (value < lt);
		};
		gt = function(value, gt) {
			return (value > gt);
		};
		// Conditional, return boolean
		return (gt(this.height, breakpoint.minheight) && lt(this.height, breakpoint.maxheight) && gt(this.width, breakpoint.minwidth) && lt(this.width, breakpoint.maxwidth));
	},
	is: function(name, then) {
		// Call this.setup() to re-calculate
		this.setup();
		// Continue only if provided name matches a registered breakpoint
		// and matches current viewport properties
		if (typeof this.breakpoints[name] !== 'undefined' && this.matches(this.breakpoints[name])) {
			// If then is not undefined, see if it is a function or object
			// and call stored function(s)
			if (typeof then !== 'undefined') {
				if (typeof then == 'function') {
					then.call();
				} else if (typeof then == 'object') {
					var i = 0, max;
					for (i = 0, max = then.length; i < max; i++) {
						if (typeof then[i] == 'function') then[i].call();
					}
				}
			}
			// Return
			return true;
		} else {
			return false;
		}
	},
	breakpoints: {
		'screen': {minheight: 0, maxheight: 10000, minwidth: 959, maxwidth: 10000},
		'tablet': {minheight: 0, maxheight: 10000, minwidth: 767, maxwidth: 960},
		'xtablet': {minheight: 0, maxheight: 10000, minwidth: 599, maxwidth: 768},
		'mobile': {minheight: 0, maxheight: 10000, minwidth: 0, maxwidth: 600}
	},
	register: function(name, properties) {
		// Check there's not an already registered breakpoint
		// under then same name
		if (typeof this.breakpoints[name] == 'undefined') {
			// Now register breakpoint
			this.breakpoints[name] = properties;
		}
	}
};