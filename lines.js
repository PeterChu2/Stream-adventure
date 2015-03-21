var split = require('split');
var isEven = false;
var through2 = require('through2');

process.stdin
  .pipe(split())
  .pipe(through2(write, end))
  .pipe(process.stdout)

function end() {
  this.push(null);
}

function write(line, _, next) {
    if(isEven) {
      output = line.toString().toUpperCase() + '\n';
    }
    else {
      output = line.toString().toLowerCase() + '\n';
    }
    this.push(output);
    // every other line switches between upper and lower case
    isEven = !isEven;
    next();
  }
