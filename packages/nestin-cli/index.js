#!/usr/bin/env node

const commander = require('commander');
const path = require('path');
const copy = require('recursive-copy');
const chalk = require('chalk');
const shelljs = require('shelljs');

commander.command('create <app-name>').action(name => {
  const src = path.join(process.mainModule.paths[0], '..', 'template');
  const dest = path.join(process.cwd(), name);
  copy(src, dest)
    .then(result => {
      shelljs.cd(dest);
      shelljs.exec('npm i');
      console.info(chalk.green('新建成功'));
    })
    .then(result => {
      shelljs.cd(dest);
      shelljs.exec('mv _env .env');
    })
    .catch(error => {
      console.error(chalk.red(`新建错误,${error}`));
    });
});
commander.parse(process.argv);
