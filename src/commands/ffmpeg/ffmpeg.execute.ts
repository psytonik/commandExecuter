import {CommandExecutor} from "../../core/executor/command.executor";
import {CommandExecFfmpegInterface, FfmpegInterfaceInput} from "./ffmpeg.interface";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamLoggerInterface} from "../../core/handlers/streamLogger.interface";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt.service";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamLogger} from "../../core/handlers/stream.logger";

export class FfmpegExecute extends CommandExecutor<FfmpegInterfaceInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(public logger: StreamLoggerInterface) {
		super(logger);
	}

	protected async prompt(): Promise<FfmpegInterfaceInput> {
		const width = await this.promptService.inputPrompt<number>('Width', 'number');
		const height = await this.promptService.inputPrompt<number>('Height', 'number');
		const path = await this.promptService.inputPrompt<string>('Path to file', 'input');
		const name = await this.promptService.inputPrompt<string>('File Name', 'input')
		return {width, height, path, name}
	}

	protected build(input: FfmpegInterfaceInput): CommandExecFfmpegInterface {
		const output = this.fileService.getFilePath(input.path, input.name, 'mp4');
		const args = new FfmpegBuilder()
			.input(input.path)
			.setVideoSize(input.width, input.height)
			.output(output);
		return {command: 'ffmpeg', args, output};
	}

	protected spawn({output, command, args}: CommandExecFfmpegInterface): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output).then();
		return spawn(command, args);
	}

	protected processStreams(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
		const handler = new StreamLogger(logger);
		handler.processOutput(stream);
	}


}
