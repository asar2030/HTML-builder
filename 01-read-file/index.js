const fs = require('fs');
const path = require('path');

let stream = fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

stream.on('data',data => console.log(data));