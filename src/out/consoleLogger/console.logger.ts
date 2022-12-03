import {StreamLoggerInterface} from "../../core/handlers/streamLogger.interface";

export class ConsoleLogger implements StreamLoggerInterface {
	private static logger: ConsoleLogger;

	public static getInstance(){
		if(!ConsoleLogger.logger){
			ConsoleLogger.logger = new ConsoleLogger();
		}
		return ConsoleLogger.logger;
	}
	end(): void {
		console.log('Finished');
	}

	error(...args: any[]): void {
		console.log(...args)
	}

	log(...args: any[]): void {
		console.log(...args);
	}
}
