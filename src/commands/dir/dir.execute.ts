import {CommandExecutor} from "../../core/executor/command.executor";
import {DirInput} from "./dir.interface";
import {PromptService} from "../../core/prompt.service";
import {CommandExecuteInterface} from "../../core/executor/command.interface";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamLoggerInterface} from "../../core/handlers/streamLogger.interface";
import {DirBuilder} from "./dir.builder";
import {StreamLogger} from "../../core/handlers/stream.logger";

export class DirExecute extends CommandExecutor<DirInput> {
	private promptService: PromptService = new PromptService();

	constructor(logger: StreamLoggerInterface) {
		super(logger);
	}

	protected async prompt(): Promise<DirInput> {
		let path = await this.promptService.inputPrompt<string>('Path', 'input');
		return {path}
	}

	protected build({path}: DirInput): CommandExecuteInterface {
		const args = (new DirBuilder()
				.detailedOutput()
				.output()
		)
		return {command: 'ls', args: args.concat(path)};
	}

	protected spawn({command, args}: CommandExecuteInterface): ChildProcessWithoutNullStreams {
		return spawn(command, args);
	}

	protected processStreams(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
		const handler = new StreamLogger(logger);
		handler.processOutput(stream);
	}
}
