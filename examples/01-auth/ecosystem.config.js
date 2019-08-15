const appName = 'example';
const basePath = '';
module.exports = {
  apps: [
    {
      name: appName,
      cwd: basePath,
      script: 'dist/app/main.js',
      out_file: `logs/${appName}-out.log`,
      err_file: `logs/${appName}-err.log`,
      merge_logs: true,
      instances: 2,
    },
  ],
  deploy: {
    pre: {
      // SSH key path, default to $HOME/.ssh
      // key: '/path/to/some.pem',
      // SSH user
      user: 'webapps',
      // SSH host
      host: ['39.108.176.111'],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: 'StrictHostKeyChecking=no',
      // GIT remote/branch
      ref: 'origin/master',
      // GIT remote
      repo: 'git@git.code.tencent.com:sevenfifteen/phone-wholesale.git',
      // path in the server
      path: '/home/webapps/phone-wholesale',
      // Pre-setup command or path to a script on your local machine
      // 'pre-setup': 'git pull',
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      'post-setup': '',
      // pre-deploy action
      'pre-deploy-local': 'git pull',
      // post-deploy action
      'post-deploy': 'bash ops/ops.sh buildAdmin',
    },
    deploy: {},
  },
};
