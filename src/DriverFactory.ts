import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MailDriver from './drivers/MailDriver'
import SlackDriver from './drivers/SlackDriver'
import { AbstractDriver } from './AbstractDriver'

export class DriverFactory {
  public static creact(type: string, app: ApplicationContract, msg: string): AbstractDriver {
    if (type === 'mail') {
      return new MailDriver(app, msg)
    }

    return new SlackDriver(app, msg)
  }
}
