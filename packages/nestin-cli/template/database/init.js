const shell = require('shelljs');
const program = require('commander');

let runCmd = [];
// 初始化数据库
runCmd.push('npm run migration:run');
// 创建基础角色
runCmd.push('npm run console role:create admin');
runCmd.push('npm run console role:create manager');
runCmd.push('npm run console role:create customer');
// 创建超级管理员用户
runCmd.push('npm run console user:create admin 123456 admin,manager,customer');

program
  .version('0.1.0')
  .option('-t, --test', 'run init database in test mode')
  .parse(process.argv);

if (program.test) {
  runCmd.push('npm run console user:create test-admin 123456 admin,manager,customer');
  runCmd.push('npm run console user:create test-manager 123456 manager,customer');
  runCmd.push('npm run console user:create test-customer 123456 manager,customer');
  runCmd = runCmd.map(cmd => 'NODE_ENV=test ' + cmd);
}
runCmd.forEach(cmd => [shell.exec(cmd)]);
