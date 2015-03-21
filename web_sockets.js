var ws = require('websocket-stream');
var dest = ws('ws://localhost:8099');
dest.write('hello\n');
