The package `@omakei/log-notifier` has been configured successfully. Before you begin please add this to your `config/app.ts` in the logger configuration section 
```ts
export const logger: LoggerConfig = {
  //Add this property
  stream: {
    write: (msg: string) => {
      Application.container.resolveBinding('Omakei/LogNotifier').write(msg)
      console.log(msg)
    },
  },
}
```

Open the `env.ts` file and define validate the environment 
variables based upon the drivers you are using

### Variables for the log notifier package

```ts

SLACK_WEBHOOK: Env.schema.string()
SLACK_CHANNEL: Env.schema.string()
SLACK_ICON_URL: Env.schema.string()
SLACK_USERNAME: Env.schema.string()
SMTP_FROM: Env.schema.string()

```