import { test } from '@japa/runner'

import { DriverFactory } from '../src/DriverFactory'
import SlackDriver from '../src/drivers/SlackDriver'
import MailDriver from '../src/drivers/MailDriver'

test.group('DriverFactory', () => {
  test('Create mail driver only', ({ expect, app }) => {
    const driver = DriverFactory.create(
      'mail',
      app,
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(driver).toBeInstanceOf(MailDriver)
  })

  test('Create slack driver only', ({ expect, app }) => {
    const driver = DriverFactory.create(
      'slack',
      app,
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(driver).toBeInstanceOf(SlackDriver)
  })

  test('Create slack driver as default driver', ({ expect, app }) => {
    const driver = DriverFactory.create(
      'omakei',
      app,
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(driver).toBeInstanceOf(SlackDriver)
  })
})
