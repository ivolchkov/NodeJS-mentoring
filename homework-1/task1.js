const readline = require('readline');
const rl = readline.createInterface(process.stdin);

rl.on('line', input => {
    console.log(reverseString(input));
});

function reverseString(str) {
    return str.split('').reverse().join('');
}