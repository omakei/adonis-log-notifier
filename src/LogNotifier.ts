import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { DriverFactory } from './DriverFactory'

export class LogNotifier {
  private config
  constructor(public app: ApplicationContract) {
    this.config = this.app.container
      .resolveBinding('Adonis/Core/Config')
      .get('log_notifier.logNotifierConfig')
  }

  public async write(msg: string): Promise<void> {
    this.config.allowedChannels.map((channel: string) => {
      DriverFactory.creact(channel, this.app, msg).notify()
    })
  }
}
