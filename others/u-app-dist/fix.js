! function() {
	var _;
	Object.defineProperty(window.location, "__page__load__over__", {
		set: function(t) {
			if (t === !0) {
				var i = window,
					e = i.plus.bridge.callbacks;
				if (i.__t__) {
					var n;
					for (n in i.__t__) e[n] = i.__t__[n]
				}
				i.__t__ = e
			}
			_ = t
		},
		get: function() {
			return _
		}
	})
}();