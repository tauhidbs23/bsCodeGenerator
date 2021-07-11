const fs = require('fs');
const path = require('path');
const colors = require('colors');

const templateRegExp = /YourTemplateName/g;


const sampleTemplatePath = path.join(__dirname, "../sampleFile/template/sampleTemplateFile.template");
const originalContent = fs.readFileSync(sampleTemplatePath, "utf8");

function generateTemplate() {
    const file_name = process.argv[3]; // find name of component

    if (file_name.includes("/")) {
      var d = file_name.split("/")
      var folder_name_prefix = d.slice(0, d.length - 1);
      var dir = folder_name_prefix.join('/');
      var fileName = d[d.length - 1];

      // folder create success
      if (!fs.existsSync(dir)) {
        fs.mkdir(`${process.cwd()}/${dir}`, { recursive: true }, (error) => {
          if (error) {
            console.error(error);
          } else {
            // replace content
            const replacedContent = originalContent.replace(templateRegExp, `${fileName}`);
            fs.writeFileSync(`${process.cwd()}/${file_name}.html`, replacedContent);
            console.log('Created successfuly'.green);
          }
        });
      } else if (fs.existsSync(dir)) {
        // replace content
        const replacedContent = originalContent.replace(templateRegExp, `${fileName}`);
        fs.writeFileSync(`${process.cwd()}/${file_name}.html`, replacedContent);
        console.log('Created successfuly'.green);

      }
    } else {
      // replace content
      const replacedContent = originalContent.replace(templateRegExp, `${file_name}`);
      fs.writeFileSync(`${process.cwd()}/${file_name}.html`, replacedContent);
      console.log('Created successfuly'.green);
    }
}

module.exports = {
  generateTemplate
};