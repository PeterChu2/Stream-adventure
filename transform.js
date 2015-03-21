var through = require('through2');
var stream = through(write, end);
function end() {
  this.push(null);
}
function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}
process.stdin.pipe(stream).pipe(process.stdout)
