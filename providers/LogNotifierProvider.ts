import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import LogNotifier from '../src/LogNotifier'
export default class LogNotifierProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    this.app.container.singleton('Omakei/LogNotifier', () => {
      return new LogNotifier()
    })
  }

  public async boot() {
    //
  }
}
