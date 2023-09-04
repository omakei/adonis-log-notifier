declare module '@ioc:Omakei/LogNotifier' {
  export interface LogNotifierContract {
    write(msg: string): Promise<void>
  }

  export interface LogNotifierConfig {
    allowedChannels: string[]
    allowedLogLevel: Array<LogLevel[keyof LogLevel]>
    channels: {
      slack: {
        webHook: string
        channel: string
        iconEmoji: string
        iconUrl: string
        username: string
        driverClass: (msg: string) => AbstractDriverContract
      }
      mail: {
        driver: string
        host: string
        port: string
        auth: {
          type: string
          user: string
          pass: string
        }
        from: string
        to: string[]
        subject: string
        driverClass: (msg: string) => AbstractDriverContract
      }
    }
  }

  export interface AbstractDriverContract {
    message: string
    logLevelLabel(level: number): string
    logLevelColor(level: number): string
    logJSONFormat(): LogStructureContract
    notify(): void
    format(): string | object
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

  const LogNotifier: LogNotifierContract

  export default LogNotifier
}
