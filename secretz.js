var tar = require('tar');
var parser = tar.Parse();
var zlib = require('zlib');
var through = require('through');
var crypto = require('crypto');
var concat = require('concat-stream');
var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

parser.on('entry', function (e) {
  if(e.type === 'File') {
    var md5Stream = crypto.createHash('md5', { encoding: 'hex' });
      e.pipe(md5Stream).pipe(concat(function (hash) {
          console.log(hash + ' ' + e.path);
      }));
  }
});

process.stdin.pipe(decipher).pipe(zlib.createGunzip()).pipe(parser);
