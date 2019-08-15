import { envString } from 'nestin-common/help/env-unit';

export default {
  mini: {
    appId: envString('WECHAT_MINI_APP_ID', ''),
    appSecret: envString('WECHAT_MINI_APP_SECRET', ''),
    notificationToken: envString('WECHAT_MINI_NOTIFICATION_TOKEN', ''),
    message: {
      title: envString('WECHAT_MINI_MESSAGE_TITLE', ''),
      description: envString('WECHAT_MINI_MESSAGE_TITLE', ''),
      url: envString('WECHAT_MINI_MESSAGE_URL', ''),
      thumbUrl: envString('WECHAT_MINI_MESSAGE_THUMBURL', ''),
    },
  },
};
