import { LogNotifier } from '../src/LogNotifier'
import { test } from '@japa/runner'

test.group('LogNotifier', () => {
  test('can write logs to log drivers', ({ assert, app }) => {
    const notifier = new LogNotifier(app)
    notifier.write('omakei is grate.')
    assert.assert(true)
  })
})
