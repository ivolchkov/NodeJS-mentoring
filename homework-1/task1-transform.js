const { Transform } = require('stream');

class ReverseString extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const resultString = this.reverseString(chunk.toString().replace(/(\r\n|\n|\r)/gm, "")) + '\n';
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }

    reverseString(str) {
        return str.split('').reverse().join('');
    }
}

const reverseString = new ReverseString();

process.stdin.pipe(reverseString).pipe(process.stdout);