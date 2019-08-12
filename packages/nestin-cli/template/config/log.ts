import app from './app';

export default {
  appenders: {
    // out: { type: 'stdout' },
    app: { type: 'file', filename: `logs/${app.name}.log` },
  },
  categories: {
    default: { appenders: ['app'], level: 'debug' },
  },
  // pm2: true,
};
