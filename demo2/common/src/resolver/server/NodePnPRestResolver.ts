import { PnPRestResolver } from './../PnPRestResolver';
import { PlainNodeFetchClient } from 'node-pnp-js';
import * as pnp from 'sp-pnp-js';

export class NodePnPRestResolver extends PnPRestResolver {
    constructor(baseUrl: string, private headers: { [key: string]: string; }) {
        super(baseUrl);

        pnp.setup({
            sp: {
                fetchClientFactory: () => new PlainNodeFetchClient(),
                baseUrl: baseUrl,
                headers: this.headers
            }
        });
    }

    getPnPRestInstance(): typeof pnp.sp {
        return pnp.sp;
    }
}
