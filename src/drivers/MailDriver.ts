import AbstractDriver from '../AbstractDriver'
import { logNotifierConfig } from '../config/log-notifier'
//@ts-ignore
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class MailDriver extends AbstractDriver {
  public async notify(): Promise<void> {
    await Mail.send((message: any) => {
      message
        .from(logNotifierConfig.channels.mail.from)
        .to(logNotifierConfig.channels.mail.to)
        .subject(logNotifierConfig.channels.mail.subject)
        .html(this.format())
    })
  }
  public format(): string | object {
    return `
    <table class="column" style="border-spacing:0;width:100%;max-width:300px;vertical-align:top;display:inline-block;">
  <tr>
    <td style="padding:10px;">
      APPLICATION NAME
    </td>
    <td style="padding:10px;">
     ${Env.get('APP_NAME')}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
      STATUS
    </td>
    <td style="padding:10px;">
     ${this.logLevelLabel(this.logJSONFormat().level as number)}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
      REQUEST ID
    </td>
    <td style="padding:10px;">
     ${this.logJSONFormat().request_id ?? '--'}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
    HOST NAME
    </td>
    <td style="padding:10px;">
     ${this.logJSONFormat().hostname}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
      TIMESTAMP
    </td>
    <td style="padding:10px;">
     ${new Date((this.logJSONFormat().time as number) * 1000).toISOString()}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
      ${this.logLevelLabel(this.logJSONFormat().level as number)} MESSAGE
    </td>
    <td style="padding:10px;">
     ${this.logJSONFormat().msg}
    </td>
  </tr>
  <tr>
    <td style="padding:10px;">
      RAW ERROR
    </td>
    <td style="padding:10px;">
     ${this.message}
    </td>
  </tr>
</table>
    `
  }
}
