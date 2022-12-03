import {FfmpegExecute} from "./commands/ffmpeg/ffmpeg.execute";
import {ConsoleLogger} from "./out/consoleLogger/console.logger";

export class App {
	async run() {
		await new FfmpegExecute(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App();
app.run().then()
