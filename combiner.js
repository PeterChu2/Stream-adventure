var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib')
var through = require('through2')

module.exports = function () {
  var current;
  function write (line, _, next) {
    if (line.length === 0) return next();
    var row = JSON.parse(line);

    if (row.type === 'genre') {
      if (current) {
        this.push(JSON.stringify(current) + '\n');
      }
      current = { name: row.name, books: [] };
    }
    else if (row.type === 'book') {
      current.books.push(row.name);
    }
    next();
  }
  function end (next) {
    if (current) {
      this.push(JSON.stringify(current) + '\n');
    }
    next();
  }

  var transformer = through(write, end);
  return combine(split(), transformer, zlib.createGzip());
};
