export const logNotifierConfig = {
  allowedChannels: ['slack', 'telegram', 'whatsapp', 'email'],
  channels: {
    slack: {
      webHook: '',
      channel: '',
      iconEmoji: '',
      iconUrl: '',
      username: '',
    },
    email: {
      driver: 'smtp',
      auth: {
        type: 'login',
        user: 'username',
        pass: 'password',
      },
    },
    telegram: {
      webHook: '',
      channel: '',
    },
    whatsapp: {
      webHook: '',
      channel: '',
    },
  },
}
