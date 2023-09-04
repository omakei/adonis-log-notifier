import { LogNotifier } from '../src/LogNotifier'
import { test } from '@japa/runner'
import sinon from 'sinon'

test.group('LogNotifier', (group) => {
  group.each.setup(() => {
    return () => sinon.restore()
  })
  test('can write logs to log drivers', ({ expect, app }) => {
    const logSpy = sinon.spy(global.console, 'log')
    const notifier = new LogNotifier(app)
    notifier.write('omakei is grate.')

    expect(logSpy.withArgs('omakei is grate.').calledOnce).toBe(true)
  })
})
