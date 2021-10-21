/* eslint-disable semi */
const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let writeFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log('What is your name?')

readline.on('line', (name) => {
  writeToFile(name);
});

process.on('beforeExit', () => goodbye());

function writeToFile(key, name) {
  if (key && key.name === 'c' && key.ctrl && name === 'exit') {
    goodbye(),
    process.exit();
  }
  writeFile.write(`${name}\n`),
  fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
}

function goodbye() {
  console.log('goodbye');
}