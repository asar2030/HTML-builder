const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;
const { copyFile } = require('fs/promises');

const pathToCSS = path.join(__dirname, 'styles');
const pathToHTML = path.join(__dirname, 'temlplate.html');
const pathToFonts = path.join(__dirname, 'assets/fonts');
const pathToImg = path.join(__dirname, 'assets/img');
const pathToSvg = path.join(__dirname, 'assets/svg');
const pathToComponents = path.join(__dirname, 'components');


// async function read() {
//   try {
//     const files = await readdir(path.join(__dirname, 'components'), {
//     //   withFileTypes: true,
//     });
//     for (const file of files) {
//     //   fs.readFile(path.join(__dirname, 'components', `${file}`), function(err,data) {
//     //     if (err) throw err;
//     //     console.log(data);
//     //   });
//       fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function(err,data) {
//         console.log(data);
//       });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// read();

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
  if (err) throw err;
});


// fs.writeFile(
//   path.join(__dirname, 'project-dist', 'index.html'),
//   '',
//   (err) => {
//     if (err) throw err;
//   }
// ); 

async function mergeStyles() {
  try {
    const files = await readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        const fileType = path.extname(`${path.join(__dirname, `styles/${file.name}`)}`).slice(1);
        if (fileType == 'css') {
          const filePath = path.join(__dirname, `/styles/${file.name}`);
          fs.readFile(filePath, 'utf-8', function(error, data) {
            if(error) throw error;
            fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), data,
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

async function copyAssets() {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if (err) throw err;
  });

  try {
    const files = await readdir(path.join(__dirname, 'assets'), {
      withFileTypes: true,
    });
    for (const file of files) {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${file.name}`), { recursive: true }, err => {
        if (err) throw err;
      });
      const copyFiles = await readdir(path.join(__dirname, 'assets', `${file.name}`), {
        withFileTypes: true,
      }); 
      for (const fileCopy of copyFiles) {
        let srcPathCopy = path.join(__dirname, 'assets', `${file.name}`, `${fileCopy.name}`);
        let destPathCopy = path.join(__dirname,'project-dist', 'assets', `${file.name}`, `${fileCopy.name}`);
        if (fileCopy.isFile()) {
          await copyFile(srcPathCopy, destPathCopy);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
copyAssets();

async function copyHtml() {
  try {
    const files = await readdir(path.join(__dirname, 'components'), {
      withFileTypes: true,
    });
    for (const file of files) {
      console.log(file);
      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function(error, data) {
        if(error) throw error;
      });
      if (file.isFile()) {
        const fileType = path.extname(`${path.join(__dirname, `components/${file.name}`)}`).slice(1);
        if (fileType == 'html') {
          const filePath = path.join(__dirname, `/components/${file.name}`);
          fs.readFile(filePath, 'utf-8', function(error, data) {
            if(error) throw error;
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data,
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
// async function copyHtml() {
//   try {
//     const files = await readdir(path.join(__dirname, 'components'), {
//       withFileTypes: true,
//     });
//     for (const file of files) {
//       console.log(file);
//       fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function(error, data) {
//         if(error) throw error;
//         console.log(data);
//       });
//       if (file.isFile()) {
//         const fileType = path.extname(`${path.join(__dirname, `components/${file.name}`)}`).slice(1);
//         if (fileType == 'html') {
//           const filePath = path.join(__dirname, `/components/${file.name}`);
//           fs.readFile(filePath, 'utf-8', function(error, data) {
//             if(error) throw error;
//             fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data,
//               (err) => {
//                 if (err) throw err;
//               }
//             );
//           }); 
//         }
//       }
//     }

//   } catch (err) {
//     console.error(err);
//   }
// }

copyHtml();