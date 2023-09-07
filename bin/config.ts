//@ts-ignore
import type { MailConfig } from '@ioc:Adonis/Addons/Mail'
import { Filesystem } from '@poppinss/dev-utils'

const logNotifierConfig = {
  allowedChannels: ['slack', 'mail'],
  allowedLogLevel: [50, 30],
  channels: {
    slack: {
      webHook: 'https://hooks.slack.com/services/T06GZ/B0PT2/1pAxR',
      channel: 'omakei',
      iconUrl: 'omakei',
      username: 'omakei',
    },
    mail: {
      from: 'hello@dukaspace.com',
      to: ['omakei96@gmail.com', 'forumsme6@gmail.com'],
      subject: 'Error Notification',
    },
  },
}

const mail: MailConfig = {
  mailer: 'smtp',
  mailers: {
    smtp: {
      driver: 'smtp',
      host: 'localhost',
      port: 587,
      auth: undefined,
    },
  },
}

export async function createAppConfig(fs: Filesystem) {
  await fs.add(
    'config/app.ts',
    `
		export const appKey = 'averylong32charsrandomsecretkey',
		export const http = {
			cookie: {},
			trustProxy: () => true,
		}
	`
  )
}

export async function createLogNotifierConfig(fs: Filesystem) {
  await fs.add(
    'config/log_notifier.ts',
    `
   export const logNotifierConfig = ${JSON.stringify(logNotifierConfig, null, 2)}
  `
  )
}

export async function createMailConfig(fs: Filesystem) {
  await fs.add(
    'config/mail.ts',
    `
    const mailConfig = ${JSON.stringify(mail, null, 2)}
    export default mailConfig
  `
  )
}
