var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
  var count = {};
  var tr = through(
    function (buffer) {
      if(count[buffer.country] != null) {
        count[buffer.country]++;
      }
      else {
        count[buffer.country] = 1;
      }
    },
    function end() {
      counter.setCounts(count);
    }
  );
  return duplexer(tr, counter);
}
