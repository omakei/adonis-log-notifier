import SlackNotify from 'slack-notify'
import { AbstractDriver } from '../AbstractDriver'
import { LogNotifierSlackException } from '../Exceptions/LogNotifierSlackException'

export default class SlackDriver extends AbstractDriver {
  public async notify(): Promise<void> {
    if (
      this.getConfig().allowedLogLevel.find((level: number) => this.logJSONFormat().level === level)
    ) {
      try {
        await SlackNotify(this.getConfig().channels.slack.webHook).send(
          this.format() as unknown as string
        )
      } catch (error) {
        throw LogNotifierSlackException.invoke(error.input, error.code)
      }
    }
  }
  public format(): object {
    return {
      channel: '#' + this.getConfig().channels.slack.channel,
      icon_url: this.getConfig().channels.slack.iconUrl,
      text: `:rotating_light: *${this.logLevelLabel(
        this.logJSONFormat().level as number
      )} ALERT FROM ${this.app.env.get('APP_NAME').toUpperCase()}* :rotating_light:`,
      username: this.getConfig().channels.slack.username,
      attachments: [
        {
          color: this.logLevelColor(this.logJSONFormat().level as number),
          fallback: this.logJSONFormat().msg,
          fields: [
            {
              title: 'APPLICATION NAME',
              value: this.app.env.get('APP_NAME').toUpperCase(),
              short: true,
            },
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
              value: new Date((this.logJSONFormat().time as number) * 1000).toUTCString(),
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
