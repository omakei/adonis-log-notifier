import { logNotifierConfig } from './config/lognotifier'

export default class LogNotifier {
  public async write(msg: string): Promise<void> {
    logNotifierConfig.allowedChannels.map((channel) => {
      //@ts-ignore
      Reflect.apply(logNotifierConfig.channels[channel]['driverClass'], '', [msg])
    })
    console.log(msg)
  }
}
