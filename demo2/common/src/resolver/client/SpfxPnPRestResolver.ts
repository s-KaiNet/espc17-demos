import { PnPRestResolver } from './../PnPRestResolver';
import * as pnp from 'sp-pnp-js';

export class SpfxPnPRestResolver extends PnPRestResolver {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    getPnPRestInstance(): typeof pnp.sp {
        pnp.setup({
            sp: {
                baseUrl: this.baseUrl
            }
        });

        return pnp.sp;
    }
}
