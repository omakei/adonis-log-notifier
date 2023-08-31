import SlackNotify from 'slack-notify'
import AbstractDriver from '../AbstractDriver'
import { logNotifierConfig } from '../config/log-notifier'
import Env from '@ioc:Adonis/Core/Env'

export default class SlackDriver extends AbstractDriver {
  public notify(): void {
    if (logNotifierConfig.allowedLogLevel.find((level) => this.logJSONFormat().level === level)) {
      SlackNotify(logNotifierConfig.channels.slack.webHook).send(this.format() as unknown as string)
    }
  }
  public format(): object {
    return {
      channel: '#' + logNotifierConfig.channels.slack.channel,
      icon_url: logNotifierConfig.channels.slack.iconUrl,
      text: `:rotating_light: *${this.logLevelLabel(
        this.logJSONFormat().level as number
      )} ALERT FROM ${Env.get('APP_NAME')}* :rotating_light:`,
      username: logNotifierConfig.channels.slack.username,
      attachments: [
        {
          color: this.logLevelColor(this.logJSONFormat().level as number),
          fallback: this.logJSONFormat().msg,
          fields: [
            { title: 'APPLICATION NAME', value: process.env.APP_NAME, short: true },
            {
              title: 'STATUS',
              value: this.logLevelLabel(this.logJSONFormat().level as number),
              short: true,
            },
            {
              title: 'REQUEST ID',
              value: this.logJSONFormat().request_id ?? '--',
              short: true,
            },
            { title: 'HOST NAME', value: this.logJSONFormat().hostname, short: true },
            {
              title: 'TIMESTAMP',
              value: new Date((this.logJSONFormat().time as number) * 1000).toISOString(),
              short: true,
            },
            {
              title: `${this.logLevelLabel(this.logJSONFormat().level as number)} MESSAGE`,
              value: this.logJSONFormat().msg,
            },
            { title: 'RAW ERROR', value: this.message },
          ],
        },
      ],
    }
  }
}
