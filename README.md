Trickle
=======

For node.js

Trickle is to limit executions to a certain amount of executions within
a certain amount of time. 

For example, some APIs allow only 1 request per second. Since JavaScript
code is asynchronous, it could happen that we send 500 requests within
half a second. Trickle prevents this from happening by keeping our
functions and executing them when the time is right.

Example
--------

1 execution per 1000 milliseconds:

```javascript
var Trickle = require('./lib/trickle').Trickle;

var trickle = new Trickle(1, 1000);

for (var i = 0; i < 10; i++) {
	(function (_i) {
		trickle.trickle(1, function (error) {
			if (error) { console.log(error); return; }
			console.log('ok ' + _i);
		});
	})(i);
}
```

The above code will output "ok 0", "ok 1", ..."ok 9", one line per second.
