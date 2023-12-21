'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    this.log(
      yosay(
        `Welcome to the pioneering ${chalk.red('generator-sst')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('database/**'),
      this.destinationPath('database'),
      this.props
    );
  }

  install() {
    // this.installDependencies();
  }
};
