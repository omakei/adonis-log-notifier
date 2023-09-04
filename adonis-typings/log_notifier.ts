declare module '@ioc:Omakei/LogNotifier' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application'
  export interface LogNotifierContract {
    write(msg: string): Promise<void>
  }

  export interface LogNotifierConfig {
    allowedChannels: Array<(typeof LogChannels)[keyof typeof LogChannels]>
    allowedLogLevel: Array<(typeof LogLevel)[keyof typeof LogLevel]>
    channels: {
      slack: {
        webHook: string
        channel: string
        iconEmoji: string
        iconUrl: string
        username: string
      }
      mail: {
        driver: string
        host: string
        port: number
        auth: {
          type: string
          user: string
          pass: string
        }
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

  export enum LogLevel {
    TRACE = 10,
    DEBUG = 20,
    INFO = 30,
    WARNING = 40,
    ERROR = 50,
    FATAL = 60,
  }

  export enum LogChannels {
    SLACK = 'slack',
    MAIL = 'mail',
  }

  export const SlackDriver: AbstractDriverContract
  export const MailDriver: AbstractDriverContract

  const LogNotifier: LogNotifierContract

  export default LogNotifier
}
