import { Exception } from '@poppinss/utils'

export class LogNotifierSlackException extends Exception {
  public static invoke(error: string, code: string) {
    return new this(
      `Log notifier unable to send notification through slack, make sure this "${error}" value under 'config/log_notifier.ts' configuration file is correct.`,
      500,
      'E_LOG_NOTIFIER_' + code
    )
  }
}
