import LogNotifier from '@ioc:Omakei/LogNotifier'
import { test } from '@japa/runner'

test.group('LogNotifier', () => {
  test('can write logs to log drivers', () => {
    LogNotifier.write('omakei is grate.')
  })
})
