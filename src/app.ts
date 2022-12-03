import {FfmpegExecute} from "./commands/ffmpeg/ffmpeg.execute";
import {ConsoleLogger} from "./out/consoleLogger/console.logger";
import {DirExecute} from "./commands/dir/dir.execute";

export class App {
	async run() {

		await new DirExecute(ConsoleLogger.getInstance()).execute();
		await new FfmpegExecute(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App();
app.run().then()
