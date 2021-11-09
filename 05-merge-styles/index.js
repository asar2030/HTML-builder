const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;


async function mergeStyles() {
  try {
    const files = await readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        const fileType = path.extname(`${path.join(__dirname, `styles/${file.name}`)}`).slice(1);
        console.log(file.name);
        if (fileType == 'css') {
          const filePath = path.join(__dirname, `/styles/${file.name}`);
          fs.readFile(filePath, 'utf-8', function(error, data) {
            if(error) throw error;
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data,
              (err) => {
                if (err) throw err;
              }
            );
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
mergeStyles();