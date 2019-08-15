#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const copy = require('recursive-copy');
const chalk = require('chalk');
const shelljs = require('shelljs');
const ora = require('ora');

let spinner;

commander.command('create <app-name>').action(name => {
  const src = path.join(process.mainModule.paths[0], '..', 'template');
  const dest = path.join(process.cwd(), name);
  spinner = ora('copying code to desc...').start();
  copy(src, dest)
    .then(result => {
      spinner.text = 'installing dependencies...';
      shelljs.cd(dest);
      shelljs.exec('npm i');
      console.info(chalk.green('新建成功'));
    })
    .then(result => {
      spinner.text = 'renaming env...';
      shelljs.cd(dest);
      shelljs.exec('mv _env .env');
    })
    .then(() => {
      spinner.succeed('create ok')
    })
    .catch(error => {
      spinner.fail('create ok,' + error)
    });
});
commander.parse(process.argv);
