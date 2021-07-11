const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { stringHelper } = require('../helper');
const _modelNameRegExp = /_modelName_/g;
const _propertyRegExp = /_property_/g;

const fileName = process.argv[3];
const controllerPath = path.join(__dirname, '../sampleFile/controller/nodejs.controller');
const originalContent = fs.readFileSync(controllerPath, "utf8");

function generateController() {
  if (fileName.includes("/")) {
    var d = fileName.split("/")
    var folder_name_prefix = d.slice(0, d.length - 1);
    var dir = folder_name_prefix.join('/');
    var fileName2 = d[d.length - 1];
    const _uperCasefileName = stringHelper.firstCharToUpperCase(fileName2);
    if (!fs.existsSync(dir)) {
      fs.mkdir(`${process.cwd()}/${dir}`, { recursive: true }, (error) => {
        if (error) {
          console.error(error);
        } else {
          const replacedContent = originalContent.replace(_modelNameRegExp, `${_uperCasefileName}`);
          const replacedContent2 = replacedContent.replace(_propertyRegExp, `${fileName2}`);
          fs.writeFileSync(`${process.cwd()}/${dir}/${fileName2}.js`, replacedContent2);
        }
      });

    } else if (fs.existsSync(dir)) {

      const replacedContent = originalContent.replace(_modelNameRegExp, `${_uperCasefileName}`);
      const replacedContent2 = replacedContent.replace(_propertyRegExp, `${fileName2}`);
      fs.writeFileSync(`${process.cwd()}/${dir}/${fileName2}.js`, replacedContent2);
    }
  } else {
    const _uperCasefileName = stringHelper.firstCharToUpperCase(fileName);

    const replacedContent = originalContent.replace(_modelNameRegExp, `${_uperCasefileName}`);
    const replacedContent2 = replacedContent.replace(_propertyRegExp, `${fileName}`);
    fs.writeFileSync(`${process.cwd()}/${fileName}.js`, replacedContent2);
  }
}

module.exports = {
  generateController
};