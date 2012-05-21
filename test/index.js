const qunit = require('qunit');

qunit.run({
	deps: ['JPath'],
    code: {
        /* Include your CODE to test here */
        path: './src/JTmpl.js'
    },
    tests: [
        /* Include your TESTS to run here */
        'test.js'
    ].map(function (v) { return './test/' + v })
}, function(err, stats) {
    if (err) {
        console.error(new Error(err));
        process.exit(1);
    }

    process.exit(stats.failed > 0 ? 1 : 0);
});
