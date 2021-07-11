const fs = require('fs');
const path = require('path');
const colors = require('colors');
const componentRegExp = /YourComponentName/g;

const sampleComponentPath = path.join(__dirname, "../sampleFile/component/sample.component");
const originalContent = fs.readFileSync(sampleComponentPath, "utf8");

function generateComponent() {
  const file_name = process.argv[3];

  if (file_name.includes("/")) {
    var d = file_name.split("/")
    var folder_name_prefix = d.slice(0, d.length - 1);
    var dir = folder_name_prefix.join('/');
    var fileName = d[d.length - 1];

    // folder create success
    if (!fs.existsSync(dir)) {
      fs.mkdir(`${process.cwd()}/${dir}/${fileName}`, { recursive: true }, (error) => {
        if (error) {
          console.error(error);
        } else {
          const replacedContent = originalContent.replace(componentRegExp, `${fileName}`);
          fs.writeFileSync(`${process.cwd()}/${dir}/${fileName}/${fileName}.js`, replacedContent);
          console.log('Created successfuly'.green);
        }
      });

    } else if (fs.existsSync(dir)) {

      fs.mkdir(`${process.cwd()}/${dir}/${fileName}`, { recursive: true }, (error) => {
        if (error) {
          console.error(error);
        } else {
          const replacedContent = originalContent.replace(componentRegExp, `${fileName}`);
          fs.writeFileSync(`${process.cwd()}/${dir}/${fileName}/${fileName}.js`, replacedContent);
          console.log('Created successfuly'.green);
        }
      });

    }
  } else {
    fs.mkdir(`${process.cwd()}/${file_name}`, { recursive: true }, (error) => {
      if (error) {
        console.error(error);
      } else {
        const replacedContent = originalContent.replace(componentRegExp, `${file_name}`);
        fs.writeFileSync(`${process.cwd()}/${file_name}/${file_name}.js`, replacedContent);
        console.log('Created successfuly'.green);
      }
    });
  }

}

module.exports = {
  generateComponent
};

