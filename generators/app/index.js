'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    this.log(
      yosay(
        `Welcome to the pioneering ${chalk.red('generator-sst:drizzle')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of the project',
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationPath(this.props.projectName),
      this.props
    );
  }

  install() {
    this.yarnInstall([], { cwd: this.destinationPath(this.props.projectName) });
  }
};
