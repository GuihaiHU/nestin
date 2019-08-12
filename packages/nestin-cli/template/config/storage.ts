import { resolve } from 'path';

import app from './app';

export default {
  default: 'local',

  /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    | Supported: "local",
    |
    */
  options: {
    local: {
      name: 'local',
      // process.cwd()指的是程序启动的根目录
      root: resolve(process.cwd(), 'assets'),
      secure: app.secure,
      host: app.url.hostname,
    },

    s3: {
      name: 's3',
      key: 'AWS_S3_KEY',
      secret: 'AWS_S3_SECRET',
      region: 'AWS_S3_REGION',
      bucket: 'AWS_S3_BUCKET',
    },

    spaces: {
      name: 's3',
      key: 'SPACES_KEY',
      secret: 'SPACES_SECRET',
      endpoint: 'SPACES_ENDPOINT',
      bucket: 'SPACES_BUCKET',
      region: 'SPACES_REGION',
    },

    ftp: {
      name: 'ftp',
      host: 'FTP_HOST',
      port: 21,
      user: 'FTP_USER',
      pass: 'FTP_PASS',
      longLive: false,
    },
  },
};
