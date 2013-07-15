"use strict";

exports = module.exports = Trickle;

function Trickle (requestsPerInterval, interval) {
	var t = {
		requestsPerInterval : requestsPerInterval,
		interval : interval,
		availableRequests : requestsPerInterval,
		lastReload : +Date.now(),

		reload : function () {
			var now = +Date.now(),
				delta = Math.min(now - t.lastReload, t.interval),
				reload = delta * ( t.requestsPerInterval / t.interval );

			t.lastReload = now;
			t.availableRequests = Math.min(t.availableRequests + reload, t.requestsPerInterval);
		},

		trickle : function (requests, callback) {
			if (typeof requests === 'function') {
				callback = requests;
				requests = 1;
			}

			t.reload();

			if (requests > t.availableRequests) {
				var wait = Math.ceil((requests - t.availableRequests) * (t.interval / t.requestsPerInterval));
				setTimeout(function () {
					t.trickle(requests, callback);
				}, wait);
				return;
			}

			t.availableRequests -= requests;
			process.nextTick(callback);
		}
	};

	return t.trickle;
}
