import { QAService } from './../Shared/QAService';
import { IWebHookData } from './../Shared/interfaces/IWebHookData';
import { AppSettings } from './../Shared/AppSettings';
import { PlainNodeFetchClient } from 'node-pnp-js';
import * as pnp from 'sp-pnp-js';

import { QAListManager, NodePnPRestResolver, IQuestion } from 'qa-common';
import { AuthHelper } from '../Shared/AuthHelper';

export function run(context: any, data: IWebHookData): void {
    execute(context, data)
        .catch((err: any) => {
            console.log(err);
            context.res = {
                status: 500,
                body: err.toString()
            };
            context.done();
        });
}

async function execute(context: any, data: IWebHookData): Promise<any> {
    let tenantUrl = AppSettings.get('TenantUrl');
    let auth = new AuthHelper(tenantUrl, data.tenantId);
    let accesstoken = await auth.getAppOnlyToken();

    let mngr = new QAListManager(new NodePnPRestResolver(`${tenantUrl}${data.siteRelativeUrl}`, {
        'Authorization': 'Bearer ' + accesstoken
    }));

    let service = new QAService(mngr, data.listId);
    await service.syncDb();

    context.res = {
        body: {
            message: `Hello from azure function!`
        }
    };
    context.done();
}
