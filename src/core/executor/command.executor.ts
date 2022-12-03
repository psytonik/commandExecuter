import { StreamLoggerInterface } from "../handlers/streamLogger.interface";
import { ChildProcessWithoutNullStreams } from 'child_process';
import { CommandExecuteInterface } from "./command.interface";
export abstract class CommandExecutor<Input> {
	protected constructor(public logger: StreamLoggerInterface) {
	}

	public async execute() {
		const input = await this.prompt();
		const command = await this.build(input);
		const stream = await this.spawn(command);
		this.processStreams(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;

	protected abstract build(input: Input): CommandExecuteInterface;

	protected abstract spawn(command: any): ChildProcessWithoutNullStreams;

	protected abstract processStreams(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void;
}
