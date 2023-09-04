import '@japa/runner'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

declare module '@japa/runner' {
  interface TestContext {
    app: ApplicationContract
  }

  interface Test<TestData> {
    // notify TypeScript about custom test properties
  }
}
