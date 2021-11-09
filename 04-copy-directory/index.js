const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;
const { copyFile } = require('fs/promises');

async function copy() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
  });

  try {
    const files = await readdir(path.join(__dirname, 'files'), {
      withFileTypes: true,
    });
    for (const file of files) {
      let srcPath = path.join(__dirname, 'files', file.name);
      let destPath = path.join(__dirname,'files-copy', file.name);
      if (file.isFile()) {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
copy();