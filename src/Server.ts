import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/rest": [
      ...Object.values(rest)
    ]
  },
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {

  @Inject()
  protected app: PlatformApplication;

  $afterRoutesInit() {
    let terminal: ChildProcessWithoutNullStreams | undefined;

    // error DOES NOT occur here
    try {
      terminal = spawn('node', ['--help']);
    } catch (e) {
      console.log('error');
      console.log(e.stack);
    }

    console.log('app startup complete')
  }

  @Configuration()
  protected settings: Configuration;
}
