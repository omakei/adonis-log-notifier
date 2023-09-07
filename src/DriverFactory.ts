import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import MailDriver from './drivers/MailDriver'
import SlackDriver from './drivers/SlackDriver'
import { AbstractDriver } from './AbstractDriver'

export class DriverFactory {
  /**
   * Create instance of allowed notification channels
   *
   * @param type string
   * @param app ApplicationContract
   * @param msg string
   * @returns AbstractDriver
   */
  public static create(type: string, app: ApplicationContract, msg: string): AbstractDriver {
    if (type === 'mail') {
      return new MailDriver(app, msg)
    }

    return new SlackDriver(app, msg)
  }
}
