import { test } from '@japa/runner'

import { LogNotifier } from '../src/LogNotifier'

test.group('LogNotifierProvider', () => {
  test('Bindings registered correctly', ({ assert, app }) => {
    assert.instanceOf(app.container.resolveBinding('Omakei/LogNotifier'), LogNotifier)
  })
})
