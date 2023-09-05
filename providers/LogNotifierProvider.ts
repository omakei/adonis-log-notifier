import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { LogNotifier } from '../src/LogNotifier'
export default class LogNotifierProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Omakei/LogNotifier', () => {
      return new LogNotifier(this.app)
    })
  }

  public async boot() {
    const logNotifier = this.app.container.resolveBinding('Omakei/LogNotifier')
    this.app.container.resolveBinding('Adonis/Core/Config').set('app.logger.stream', logNotifier)
  }
}
