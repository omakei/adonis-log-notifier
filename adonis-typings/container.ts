import { LogNotifierContract } from '@ioc:Omakei/LogNotifier'

declare module '@ioc:Adonis/Core/Application' {
  export interface ContainerBindings {
    'Omakei/LogNotifier': LogNotifierContract
  }
}
