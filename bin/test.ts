import { assert } from '@japa/assert'
import { specReporter } from '@japa/spec-reporter'
import { runFailedTests } from '@japa/run-failed-tests'
import { processCliArgs, configure, run, TestContext } from '@japa/runner'
import { Application } from '@adonisjs/core/build/standalone'
// import 'reflect-metadata'
import { Filesystem } from '@poppinss/dev-utils'
import { resolve } from 'node:path'

/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCliArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/

const fs = new Filesystem(resolve(__dirname, '__app'))

configure({
  ...processCliArgs(process.argv.slice(2)),
  ...{
    files: ['tests/**/*.spec.ts'],
    plugins: [assert(), runFailedTests()],
    reporters: [specReporter()],
    importer: (filePath) => import(filePath),
    forceExit: true,
    setup: [
      async () => {
        await fs.add('.env', '')
        await fs.add(
          'config/app.ts',
          `
            export const profiler = { enabled: true }
            export const appKey = 'averylong32charsrandomsecretkey',
            export const http = {
              cookie: {},
              trustProxy: () => true,
            }
          `
        )
        const app = new Application(fs.basePath, 'test', {
          providers: ['@adonisjs/core', '../../providers/LogNotifierProvider'],
        })

        await app.setup()
        await app.registerProviders()
        await app.bootProviders()

        return async () => {
          await app.shutdown()
          await fs.cleanup()
        }
      },
    ],
  },
})

TestContext.getter('app', () => require('@adonisjs/core/build/services/app.js').default)

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
run()
