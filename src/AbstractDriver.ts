import { LogStructure } from './Interfaces/LogStructureInterface'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export abstract class AbstractDriver {
  constructor(public app: ApplicationContract, public msg: string) {}

  public logLevelLabel(level: number): string {
    return (
      {
        10: 'DEBUG',
        20: 'DEBUG',
        30: 'INFO',
        40: 'WARNING',
        50: 'ERROR',
      }[level] ?? 'FATAL'
    )
  }

  public logLevelColor(level: number): string {
    return (
      {
        10: '#4b5563',
        20: '#2563EB',
        30: '#16A34A',
        40: '#CA8A04',
        50: '#FF0000',
      }[level] ?? '#B91C1C'
    )
  }

  public logJSONFormat(): LogStructure {
    return JSON.parse(this.msg)
  }

  public abstract notify(): void
  public abstract format(): string | object
}
