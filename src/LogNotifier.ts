import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export class LogNotifier {
  private config
  constructor(public app: ApplicationContract) {
    this.config = this.app.container
      .resolveBinding('Adonis/Core/Config')
      .get('log_notifier.logNotifierConfig')
  }

  public async write(msg: string): Promise<void> {
    console.log(this.config)
    this.config.allowedChannels.map((channel: string) => {
      Reflect.apply(this.config.channels[channel]['driverClass'], '', [this.app, msg])
    })
    console.log(msg)
  }
}
