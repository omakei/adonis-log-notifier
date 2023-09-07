declare module '@ioc:Omakei/LogNotifier' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  export interface LogNotifierContract {
    write(msg: string): Promise<void>
  }

  export interface LogNotifierConfig {
    allowedChannels: Array<LogChannels>
    allowedLogLevel: Array<LogLevel>
    channels: {
      slack: {
        webHook: string
        channel: string
        iconUrl: string
        username: string
      }
      mail: {
        from: string
        to: string[]
        subject: string
      }
    }
  }

  export interface AbstractDriverContract {
    new (app: ApplicationContract, msg: string): {
      message: string
      logLevelLabel(level: number): string
      logLevelColor(level: number): string
      logJSONFormat(): LogStructureContract
      getConfig(): LogNotifierConfig
      notify(): void
      format(): string | object
    }
  }

  export type BaseLogStructureContract = {
    level: number
    time: number
    pid: number
    hostname: string
    name: string
    msg?: string
    request_id?: string
  }

  export type GenericLogStructureContract = Record<string, unknown>

  export type LogStructureContract = BaseLogStructureContract | GenericLogStructureContract

  export type LogLevel = 10 | 20 | 30 | 40 | 50 | 60

  export type LogChannels = 'slack' | 'mail'

  export const SlackDriver: AbstractDriverContract
  export const MailDriver: AbstractDriverContract

  const LogNotifier: LogNotifierContract

  export default LogNotifier
}
