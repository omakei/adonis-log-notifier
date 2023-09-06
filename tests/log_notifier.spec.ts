import { LogNotifier } from '../src/LogNotifier'
import { test } from '@japa/runner'
import sinon from 'sinon'

test.group('LogNotifier', (group) => {
  group.each.setup(() => {
    return () => sinon.restore()
  })
  test('can write logs to log drivers', ({ expect, app }) => {
    const logSpy = sinon.spy(LogNotifier.prototype, 'write')
    const notifier = new LogNotifier(app)

    notifier.write(
      '{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}'
    )

    expect(
      logSpy.withArgs(
        `{"level":30,"time":1693915157713,"pid":18184,"hostname":"Omakei","name":"test-app","username":"virk","password":"secret","msg":"omakei is grate."}`
      ).calledOnce
    ).toBe(true)
  })
})
