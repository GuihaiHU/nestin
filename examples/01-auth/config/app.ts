import * as path from 'path';
import { envBoolean, envString, envNumber } from 'nestin-common/help/env-unit';

const APP_ROOT = process.cwd();
export default {
  name: envString('APP_NAME', 'example'),
  mode: envString('APP_MODE', 'prod'),
  url: {
    protocol: envString('URL_PROTOCOL', 'http'),
    hostname: envString('URL_HOSTNAME', 'localhost'),
    port: envNumber('URL_PORT', 80), // 对外暴露端口
  },
  get baseUrl() {
    return `${this.url.protocol}://${this.url.hostname}:${this.url.port}`;
  },
  get staticUrl() {
    return process.env.STATIC_URL || this.baseUrl;
  },
  app_port: envNumber('APP_PORT', 3000), // 启动端口
  secure: envBoolean('APP_SECURE', false),
  prefix: envString('APP_PREFIX', '/api'),
  multerDest: path.resolve(APP_ROOT, envString('APP_MULTER_DEST', 'upload')),

  cors: {
    origin: envString('CORS_ORIGIN', '*'),
    methods: envString('CORS_METHODS', 'GET,HEAD,PUT,PATCH,POST,DELETE'),
    credentials: envBoolean('CORS_CREDENTIALS', true),
  },
  mail: {
    transport: envString('MAIL_TRANSPORT', ''),
    defaultFrom: envString('defaultFrom', ''),
    defaultTo: envString('MAIL_DEFAULT_TO', ''),
  },
};
