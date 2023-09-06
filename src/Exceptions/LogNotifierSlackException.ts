import { Exception } from '@poppinss/utils'

export class LogNotifierSlackException extends Exception {
  public static invoke() {
    return new this(
      `Log notifier unable to send notification through slack, make sure all configuration under 'config/log_notifier.ts are correct.'`,
      500,
      'E_LOG_NOTIFIER_SLACK_ERROR'
    )
  }
}
