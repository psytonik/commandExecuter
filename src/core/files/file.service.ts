import {join, dirname, isAbsolute} from "path";
import {promises} from "fs";

export class FileService {
	public getFilePath(path: string, name: string, ext: string): string {
		if (!isAbsolute(path)) {
			path = join(__dirname + '/' + path)
		}
		return join(dirname(path) + '/' + name + '.' + ext)
	}

	async deleteFileIfExists(path: string): Promise<void> {
		if (await this.isExists(path)) {
			await promises.unlink(path);
		}
	}

	private async isExists(path: string) {
		try {
			await promises.stat(path);
			return true;
		} catch {
			return false;
		}
	}
}
