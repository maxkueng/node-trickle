var Trickle = function (requestsPerInterval, interval) {
	this.requestsPerInterval = requestsPerInterval;
	this.interval = interval;
	this.availableRequests = requestsPerInterval;

	this.lastReload = new Date();
};

Trickle.prototype.trickle = function (requests, callback) {
	if (requests > this.requestsPerInterval) {
		var error = { 'code' : 42, 'message' : 'It\'s not gonna happen, ever.' };
		callback(error);
		return;
	}

	var self = this;
	this.reload();

	if (requests > this.availableRequests) {
		var wait = Math.ceil((requests - this.availableRequests) * (this.interval / this.requestsPerInterval));
		setTimeout(function() { self.trickle(requests, callback); }, wait);
		return false;
	}

	this.availableRequests -= requests;
	callback(null);
};

Trickle.prototype.reload = function () {
    var now = new Date();
    var delta = Math.min(now - this.lastReload, this.interval);
    this.lastReload = now;
    
    var reload = delta * (this.requestsPerInterval / this.interval);
    this.availableRequests = Math.min(this.availableRequests + reload, this.requestsPerInterval);
};

exports.Trickle = Trickle;
