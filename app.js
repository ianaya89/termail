var inquirer = require('inquirer');

var to = {
  type: 'input',
  name: 'to',
  message: 'to ?'
};


inquirer.prompt([to], function( answers ) {
});
