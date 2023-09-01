export interface BaseLogStructure {
  level: number
  time: number
  pid: number
  hostname: string
  name: string
  msg?: string
  request_id?: string
}

type GenericLogStructure = Record<string, unknown>

export type LogStructure = BaseLogStructure | GenericLogStructure
