import { LogNotifier } from '../src/LogNotifier'
import { test } from '@japa/runner'

import sinon from 'sinon'
import SlackDriver from '../src/drivers/SlackDriver'
import MailDriver from '../src/drivers/MailDriver'

test.group('LogNotifier', (group) => {
  group.each.setup(() => {
    return () => sinon.restore()
  })
  test('can write logs to slack and mail drivers', ({ expect, app }) => {
    const slackSpy = sinon.spy(SlackDriver.prototype, 'notify')
    const mailSpy = sinon.spy(MailDriver.prototype, 'notify')

    const notifier = new LogNotifier(app)

    notifier.write(
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(slackSpy.calledOnce).toBe(true)
    expect(mailSpy.calledOnce).toBe(true)
  })

  test('can write logs to slack drive when its only enabled', ({ expect, app }) => {
    const slackSpy = sinon.spy(SlackDriver.prototype, 'notify')
    const mailSpy = sinon.spy(MailDriver.prototype, 'notify')

    app.container
      .resolveBinding('Adonis/Core/Config')
      .set('log_notifier.logNotifierConfig.allowedChannels', ['slack'])
    const notifier = new LogNotifier(app)

    notifier.write(
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(slackSpy.calledOnce).toBe(true)
    expect(mailSpy.calledOnce).toBe(false)
  })

  test('can write logs to mail drive when its only enabled', ({ expect, app }) => {
    const slackSpy = sinon.spy(SlackDriver.prototype, 'notify')
    const mailSpy = sinon.spy(MailDriver.prototype, 'notify')

    app.container
      .resolveBinding('Adonis/Core/Config')
      .set('log_notifier.logNotifierConfig.allowedChannels', ['mail'])
    const notifier = new LogNotifier(app)

    notifier.write(
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(slackSpy.calledOnce).toBe(false)
    expect(mailSpy.calledOnce).toBe(true)
  })

  test('can not write logs to log driver if configuration are empty', ({ expect, app }) => {
    const slackSpy = sinon.spy(SlackDriver.prototype, 'notify')
    const mailSpy = sinon.spy(MailDriver.prototype, 'notify')

    app.container
      .resolveBinding('Adonis/Core/Config')
      .set('log_notifier.logNotifierConfig.allowedChannels', null)

    expect(() => {
      const notifier = new LogNotifier(app)
      return notifier
    }).toThrow()

    expect(slackSpy.calledOnce).toBe(false)
    expect(mailSpy.calledOnce).toBe(false)

    app.container
      .resolveBinding('Adonis/Core/Config')
      .set('log_notifier.logNotifierConfig.allowedChannels', ['slack'])
  })

  test('can not write logs to log drives when log level is not allowed', ({ expect, app }) => {
    const slackSpy = sinon.spy(SlackDriver.prototype, 'format')
    const mailSpy = sinon.spy(MailDriver.prototype, 'format')

    app.container
      .resolveBinding('Adonis/Core/Config')
      .set('log_notifier.logNotifierConfig.allowedLogLevel', [10])
    const notifier = new LogNotifier(app)

    notifier.write(
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(slackSpy.calledOnce).toBe(false)
    expect(mailSpy.calledOnce).toBe(false)
  })
})
