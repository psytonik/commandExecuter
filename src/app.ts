import {PromptService} from "./core/prompt.service";

export class App {
	async run() {
		const res = await (new PromptService()).inputPrompt<number>('numerok', 'number');
		console.log(res);
		console.log('done');
	}
}

const app = new App();
app.run().then();
