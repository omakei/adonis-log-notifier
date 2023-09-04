import { inject } from '@adonisjs/core/build/standalone'
import SlackNotify from 'slack-notify'
import { AbstractDriver } from '../AbstractDriver'

@inject()
export default class SlackDriver extends AbstractDriver {
  private config = this.app.container
    .resolveBinding('Adonis/Core/Config')
    .get('log_notifier.logNotifierConfig')
  public notify(): void {
    if (this.config.allowedLogLevel.find((level: number) => this.logJSONFormat().level === level)) {
      SlackNotify(this.config.channels.slack.webHook).send(this.format() as unknown as string)
    }
  }
  public format(): object {
    return {
      channel: '#' + this.config.channels.slack.channel,
      icon_url: this.config.channels.slack.iconUrl,
      text: `:rotating_light: *${this.logLevelLabel(
        this.logJSONFormat().level as number
      )} ALERT FROM ${this.app.env.get('APP_NAME')}* :rotating_light:`,
      username: this.config.channels.slack.username,
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
            { title: 'RAW ERROR', value: this.msg },
          ],
        },
      ],
    }
  }
}
