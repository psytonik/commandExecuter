import {StreamLoggerInterface} from "./streamLogger.interface";
import {ChildProcessWithoutNullStreams} from "child_process";

export class StreamLogger {
	constructor(private logger: StreamLoggerInterface) {
	}

	processOutput(stream: ChildProcessWithoutNullStreams) {
		stream.stdout.on('data', (data: any) => {
			this.logger.log(data);
		})
		stream.stderr.on('data', (data: any) => {
			this.logger.error(data);
		})
		stream.on('close', () => {
			this.logger.end();
		})
	}
}
