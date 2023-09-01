declare module '@ioc:Omakei/LogNotifier' {
  export interface LogNotifierContract {
    write(msg: string): Promise<void>
  }

  const LogNotifier: LogNotifierContract

  export default LogNotifier
}
