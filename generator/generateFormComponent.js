const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { stringHelper } = require('../helper');

const componentRegExp = /component_name/g;
const propertyRegExp = /property_name/g;

const file1Path = path.join(__dirname, '../sampleFile/formComponent/propertyReplace/first_propertyReplace');
const file2Path = path.join(__dirname, '../sampleFile/formComponent/propertyReplace/middle_propertyReplace');
const file3Path = path.join(__dirname, '../sampleFile/formComponent/propertyReplace/end_propertyReplace');


const originalContex1 = fs.readFileSync(file1Path, "utf8");
const originalContex2 = fs.readFileSync(file2Path, "utf8");
const originalContex3 = fs.readFileSync(file3Path, "utf8");

const first_property = path.join(__dirname, '../sampleFile/formComponent/componentReplace/first_property.component');
const second_property = path.join(__dirname, '../sampleFile/formComponent/componentReplace/second_property.component');
const third_property = path.join(__dirname, '../sampleFile/formComponent/componentReplace/third_property.component');

const originalContex1c = fs.readFileSync(first_property, "utf8");
const originalContex2c = fs.readFileSync(second_property, "utf8");
const originalContex3c = fs.readFileSync(third_property, "utf8");


function generateHtml(fileName, formProperty, directoryPrefix) {

  const CreateFiles = fs.createWriteStream(`${process.cwd()}/${directoryPrefix}/${fileName}.html`, {
    flags: 'a'
  })

  const replacedContent = originalContex1.replace(componentRegExp, fileName);

  CreateFiles.write(`${replacedContent}` + '\r\n')

  formProperty.forEach(ele => {
    const replacedContent = originalContex2.replace(propertyRegExp, ele);
    CreateFiles.write(`${replacedContent}` + '\r\n')
  });

  CreateFiles.write(`${originalContex3}` + '\r\n');
};

function generateComponent(fileName, formProperty, directoryPrefix) {
  const CreateFiles = fs.createWriteStream(`${process.cwd()}/${directoryPrefix}/${fileName}.ts`, {
    flags: 'a'
  })

  let className = fileName.replace(/[-_]/g, "class_name");
  className = stringHelper.firstCharToUpperCase(className);

  const replacedContent = originalContex1c.replace(componentRegExp, fileName);
  const printContent = replacedContent.replace(/class_name/g, className)

  CreateFiles.write(`${printContent}` + '\r\n')

  formProperty.forEach(ele => {
    const replacedContent = originalContex2c.replace(propertyRegExp, ele);
    CreateFiles.write(`${replacedContent}` + '\r\n')
  });
  CreateFiles.write(`${originalContex3c}` + '\r\n');
};


function generateFormComponent() {
  const allArgv = process.argv;
  const fileName = process.argv[3];
  const formProperty = allArgv.slice(4, allArgv.length);

  if (fileName.includes("/")) {
    var d = fileName.split("/");
    var folderNamePrefix = d.slice(0, d.length - 1);
    var directory = folderNamePrefix.join('/');
    var fileNameSepareted = d[d.length - 1];
    if (!fs.existsSync(directory)) {
      fs.mkdir(`${process.cwd()}/${directory}/${fileNameSepareted}`, { recursive: true }, (error) => {
        if (error) {
          console.error(error);
        } else {
          generateHtml(fileNameSepareted, formProperty, fileName);
          generateComponent(fileNameSepareted, formProperty, fileName);
          console.log('Created successfuly'.green);
        }
      });

    } else if (fs.existsSync(directory)) {
      fs.mkdir(`${process.cwd()}/${directory}/${fileNameSepareted}`, { recursive: true }, (error) => {
        if (error) {
          console.error(error);
        } else {
          generateHtml(fileNameSepareted, formProperty, fileName);
          generateComponent(fileNameSepareted, formProperty, fileName);
          console.log('Created successfuly'.green);
        }
      });

    }
  } else {
    fs.mkdir(`${process.cwd()}/${fileName}`, { recursive: true }, (error) => {
      if (error) {
        console.error(error);
      } else {
        generateHtml(fileName, formProperty, fileName);
        generateComponent(fileName, formProperty, fileName);
        console.log('Created successfuly'.green);
      }
    });
  }
};

module.exports = {
  generateFormComponent
};