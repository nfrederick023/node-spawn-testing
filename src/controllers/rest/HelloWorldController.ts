import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";

@Controller("/hello-world")
export class HelloWorldController {
  @Get("/")
  get() {
    let terminal: ChildProcessWithoutNullStreams | undefined;
    try {
      terminal = spawn('node', ['--help']);
    } catch (e) {
      console.log(e.stack);
      return "error occured!"
    }

    console.log('complete')
    return "hello";
  }
}
