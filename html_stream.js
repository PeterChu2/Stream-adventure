var trumpet = require('trumpet');
var fs = require('fs');
var tr = trumpet();
var through = require('through');

function transform(buffer) {
    this.queue(buffer.toString().toUpperCase());
}

var stream = tr.select('.loud').createStream();
stream.pipe(through(transform)).pipe(stream);
process.stdin.pipe(tr).pipe(process.stdout);
