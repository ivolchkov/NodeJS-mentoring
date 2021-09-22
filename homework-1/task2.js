const csv = require('csvtojson');
const fs = require('fs');

const readStream = fs.createReadStream('./data/books.csv');
const writeStream = fs.createWriteStream('./data/books.txt')

csv()
    .fromStream(readStream)
    .on('data', data => writeStream.write(data, 'utf-8'))
    .on('error', err => console.error(err))
    .then(() => {
        console.log('File processing has been passed successfully');
    });