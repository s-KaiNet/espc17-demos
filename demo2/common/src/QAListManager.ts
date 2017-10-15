import { SPRest } from 'sp-pnp-js/lib/sharepoint/rest';
import { PnPRestResolver } from './resolver/PnPRestResolver';
import * as pnp from 'sp-pnp-js';
import { List, ChangeQuery, ItemUpdateResult } from 'sp-pnp-js';

const URL: any = require('url-parse');

export class QAListManager {

    private sp: typeof pnp.sp;
    private serverRelativeUrl: string;

    constructor(resolver: PnPRestResolver) {
        this.sp = resolver.getPnPRestInstance();
        let url: any = new URL(resolver.baseUrl);
        this.serverRelativeUrl = url.pathname;
    }

    public getAllQandA(listId?: string): Promise<any> {
        return this.getQandAList(listId).items.get();
    }

    public getLastChanges(listId: string): Promise<any> {
        let epochTicks = 621355968000000000;
        let ticksPerMillisecond = 10000;
        let now = new Date();

        // sets last changed token to be time.now - 5 minutes
        now.setMinutes(now.getMinutes() - 5);
        let utcDate = this.convertDateToUTC(now);
        let ticks = epochTicks + (utcDate * ticksPerMillisecond);

        let lastChangeToken = '1;3;' + listId + ';' + ticks + ';-1';

        return this.getQandAList(listId).getChanges({
            Add: true,
            Update: true,
            DeleteObject: true,
            Item: true,
            ChangeTokenStart: {
                StringValue: lastChangeToken
            }
        });
    }

    public getQuestionById(id: number): Promise<any> {
        return this.getQandAList().items.getById(id).get();
    }

    public async getUserName(): Promise<string> {
        let result = await this.sp.web.currentUser.get();

        return result.Title;
    }

    public async getWebTitle(): Promise<string> {
        let result = await this.sp.web.get();

        return result.Title;
    }

    public async getByIds(ids: number[]): Promise<any[]> {
        let results: any[] = [];

        let batch = this.sp.createBatch();

        ids.forEach(id => {
            this.getQandAList().items.getById(id).inBatch(batch).get()
            .then(data => {
                results.push(data);
            });
        });

        await batch.execute();

        return results;
    }

    public async approveItem(id: number, approver: string): Promise<ItemUpdateResult> {
        return this.getQandAList().items.getById(id).update({
            'OData__ModerationStatus' : 0,
            'OData__ModerationComments': `Approved by ${approver}`
        });
    }

    public async rejectItem(id: number, approver: string): Promise<any> {
        return this.getQandAList().items.getById(id).update({
            'OData__ModerationStatus' : 1,
            'OData__ModerationComments': `Rejected by ${approver}`
        });
    }

    private getQandAList(listId?: string): List {
        if (listId) {
            return this.sp.web.lists.getById(listId);
        }

        return this.sp.web.getList(`${this.serverRelativeUrl}/Lists/QA`);
    }

    private convertDateToUTC(date: Date): number {
        return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
}
