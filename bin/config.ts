//@ts-ignore
import type { MailConfig } from '@ioc:Adonis/Addons/Mail'
// import { LogChannels, LogLevel, type LogNotifierConfig } from '@ioc:Omakei/LogNotifier'
import { Filesystem } from '@poppinss/dev-utils'

const logNotifierConfig = {
  //@ts-ignore
  allowedChannels: ['slack', 'mail'],
  allowedLogLevel: [50, 30],
  channels: {
    slack: {
      webHook: 'omakei',
      channel: 'omakei',
      iconEmoji: 'omakei',
      iconUrl: 'omakei',
      username: 'omakei',
    },
    mail: {
      driver: 'smtp',
      host: 'localhost',
      port: 587,
      auth: {
        type: 'login',
        user: 'omakei',
        pass: 'omakei',
      },
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
