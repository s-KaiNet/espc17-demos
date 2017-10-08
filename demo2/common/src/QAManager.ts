import { SPRest } from 'sp-pnp-js/lib/sharepoint/rest';
import { PnPRestResolver } from './resolver/PnPRestResolver';
import * as pnp from 'sp-pnp-js';
const URL: any = require('url-parse');

export class QAManager {

    private sp: typeof pnp.sp;
    private serverRelativeUrl: string;

    constructor(resolver: PnPRestResolver) {
        this.sp = resolver.getPnPRestInstance();
        let url: any = new URL(resolver.baseUrl);
        this.serverRelativeUrl = url.pathname;
    }

    public getAllQandA(): Promise<any> {
        return this.sp.web.getList(`${this.serverRelativeUrl}/Lists/QA`).items.get();
    }
}
