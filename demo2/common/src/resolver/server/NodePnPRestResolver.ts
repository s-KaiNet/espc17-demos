import { PnPRestResolver } from "./../PnPRestResolver";
import { SPRest } from "sp-pnp-js/lib/sharepoint/rest";
import { PlainNodeFetchClient } from "node-pnp-js";
import * as pnp from "sp-pnp-js";

export class NodePnPRestResolver extends PnPRestResolver {

    constructor(baseUrl: string, private headers: { [key: string]: string; }) {
        super(baseUrl);

        pnp.setup({
            sp: {
                fetchClientFactory: () => new PlainNodeFetchClient(),
                baseUrl: baseUrl
            }
        });
    }

    getPnPRestInstance(): SPRest {
        return pnp.sp.configure({
            headers: this.headers
        });
    }
}