import {CommandExecuteInterface} from "../../core/executor/command.interface";

export interface FfmpegInterfaceInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

export interface CommandExecFfmpegInterface extends CommandExecuteInterface {
	output: string;
}
