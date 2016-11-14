var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout),
    prefix = '> ';

rl.on('line', function(line) {
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});

rl.setPrompt(prefix, prefix.length);
rl.prompt();