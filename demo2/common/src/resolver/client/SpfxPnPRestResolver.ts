import { PnPRestResolver } from "./../PnPRestResolver";
import { SPRest } from "sp-pnp-js/lib/sharepoint/rest";
import * as pnp from "sp-pnp-js";

export class SpfxPnPRestResolver extends PnPRestResolver {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    getPnPRestInstance(): SPRest {
        pnp.setup({
            sp: {
                baseUrl: this.baseUrl
            }
        });

        return pnp.sp;
    }
}