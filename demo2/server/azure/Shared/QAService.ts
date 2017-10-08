import { QAListManager } from 'qa-common';

export class QAService {
    constructor(private listManager: QAListManager, private listId: string) {

    }

    public async syncDb(): Promise<any> {
        let web = await this.listManager.getLastChanges(this.listId);

        console.log(web);
    }
}
