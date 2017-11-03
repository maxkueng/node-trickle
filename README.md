Trickle
=======

**If you're looking for a promise-based alternative to this module check out [wyt](https://github.com/maxkueng/wyt).**

Trickle limits function executions based on time. It lets you define the
number of executions per a certain amount of milliseconds.

This is particularly useful to obey an API provider's rate limit, for
example.

Installation
------------

Note: trickle is called "timetrickle" on [npm](https://npmjs.org/package/timetrickle) 
because someone has occupied the name before I had a chance.

```bash
npm install timetrickle --save
```
or manually add it to your package.json

Example
--------

```javascript
var trickle = require('timetrickle');
    start = +Date.now();

// Helper function to show the time difference
function since (time) { return Math.round((time - start) / 1000) + 's'; }

// Limit once per second
var limit = trickle(1, 1000);

limit(function () {
    console.log('I am doing an API call here', since(+Date.now()));
});

limit(function () {
    console.log('I am doing another API call here', since(+Date.now()));
});

limit(function () {
    console.log('I am doing an API call here again', since(+Date.now()));
});
```

Will output:

    I am doing an API call here 0s
    I am doing an API call here again 1s
    I am doing another API call here 2s
