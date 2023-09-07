import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { DriverFactory } from './DriverFactory'
import { ManagerConfigValidator } from '@poppinss/utils'

export class LogNotifier {
  private config
  constructor(public app: ApplicationContract) {
    this.config = this.app.container
      .resolveBinding('Adonis/Core/Config')
      .get('log_notifier.logNotifierConfig')
    this.validateConfig()
  }

  public async write(msg: string): Promise<void> {
    this.config.allowedChannels.map((channel: string) => {
      DriverFactory.create(channel, this.app, msg).notify()
    })
  }

  public validateConfig() {
    const validator = new ManagerConfigValidator(this.config, 'log-notifier', 'config/log_notifier')
    validator.validateDefault('allowedChannels')
    validator.validateDefault('allowedLogLevel')
    validator.validateDefault('channels')
  }
}
