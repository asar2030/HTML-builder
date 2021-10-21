
const { readdir } = require('fs').promises;
const fs = require('fs');
const path = require('path');

async function getFiles() {
  try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for (const file of files)
      if (file.isFile()) {
        const filePath = path.join(__dirname, `secret-folder/${file.name}`);
        const fileType = path.extname(`${path.join(__dirname, `secret-folder/${file.name}`)}`).slice(1);
        let stats = fs.statSync(filePath);
        let fileSize = stats.size;
        console.log(`${path.parse(filePath).name} - ${fileType} - ${fileSize}kb`);
      }
  } catch (err) {
    console.error(err);
  }
}

getFiles();