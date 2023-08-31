import SlackDriver from '../drivers/SlackDriver'
import Env from '@ioc:Adonis/Core/Env'

export const logNotifierConfig = {
  allowedChannels: ['slack', 'mail'],
  channels: {
    slack: {
      webHook: Env.get('SLACK_WEBHOOK'),
      channel: Env.get('SLACK_CHANNEL'),
      iconEmoji: Env.get('SLACK_ICON_EMOJI'),
      iconUrl: Env.get('SLACK_ICON_URL'),
      username: Env.get('SLACK_USERNAME'),
      driverClass: (msg: string) => {
        return new SlackDriver(msg).notify()
      },
    },
    mail: {
      driver: 'smtp',
      host: Env.get('SMTP_HOST') as string,
      port: Env.get('SMTP_PORT') as string,
      auth: {
        type: 'login',
        user: Env.get('SMTP_USERNAME'),
        pass: Env.get('SMTP_PASSWORD'),
      },
      from: Env.get('SMTP_FROM'),
      to: ['omakei96@gmail.com', 'forumsme6@gmail.com'],
      subject: 'Error Notification',
      driverClass: (msg: string) => {
        return new SlackDriver(msg).notify()
      },
    },
  },
}
