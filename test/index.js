const qunit = require('qunit');

qunit.run({
	deps: 'jsdom',
    code: {
        /* Include your CODE to test here */
        path: './src/JTmpl.js'
    },
    tests: [
        /* Include your TESTS to run here */
        'test.js'
    ].map(function (v) { return './test/' + v })
});