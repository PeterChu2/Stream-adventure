
var http = require('http');
var through = require('through');

function transform(buffer) {
    this.queue(buffer.toString().toUpperCase());
}

function end() {
  this.queue(null);
}

function handler(request, response) {
    if(request.method === 'POST') {
      request.pipe(through(transform)).pipe(response);
    }
    else {
      response.end('should be a POST\n');
    }
}

http.createServer(handler).listen(parseInt(process.argv[2]));
