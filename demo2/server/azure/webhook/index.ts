import { AppSettings } from './../Shared/AppSettings';
import { PlainNodeFetchClient } from 'node-pnp-js';
import * as pnp from 'sp-pnp-js';

import { QAManager, NodePnPRestResolver, IQuestion } from 'qa-common';
import { AuthHelper } from '../Shared/AuthHelper';

export function run(context: any, req: any): void {
    execute(context, req)
        .catch((err: any) => {
            console.log(err);
            context.res = {
                status: 500,
                body: err.toString()
            };
            context.done();
        });
}

async function execute(context: any, req: any): Promise<any> {
    let tenantUrl = AppSettings.get('TenantUrl');
    let auth = new AuthHelper(tenantUrl);
    let accesstoken = await auth.getAppOnlyToken();

    let mngr = new QAManager(new NodePnPRestResolver(`${tenantUrl}/sites/hr`, {
        'Authorization': 'Bearer ' + accesstoken
    }));

    let web = await mngr.getAllQandA();

    context.log(web);

    context.res = {
        body: {
            message: `Hello from azure function!`
        }
    };
    context.done();
}
