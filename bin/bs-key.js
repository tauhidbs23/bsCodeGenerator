const program = require('commander');

const { generateComponent,
  generateController,
  generateFormComponent,
  generateService,
  generateTemplate,
  generateGitIgnore
} = require('../generator');


program
  .command('c')
  .description('create component')
  .action(generateComponent);

program
  .command('t')
  .description('create template')
  .action(generateTemplate);

program
  .command('fc')
  .description('generate form component')
  .action(generateFormComponent);


program
  .command('nc')
  .description('generate node controller')
  .action(generateController);

program
  .command('gi')
  .description('generate git ignore file')
  .action(generateGitIgnore);

program.parse(process.argv);
