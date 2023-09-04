declare module '@ioc:Adonis/Core/Application' {
  import { LogNotifierContract } from '@ioc:Omakei/LogNotifier'
  export interface ContainerBindings {
    'Omakei/LogNotifier': LogNotifierContract
  }
}
