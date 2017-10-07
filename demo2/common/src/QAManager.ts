import { SPRest } from "sp-pnp-js/lib/sharepoint/rest";
import { PnPRestResolver } from "./resolver/PnPRestResolver";
import * as URL from "url-parse";

export class QAManager {

    private sp: SPRest;
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
