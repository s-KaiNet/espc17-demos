import * as pnp from 'sp-pnp-js';

export abstract class PnPRestResolver {
    constructor(public baseUrl: string) {}

    abstract getPnPRestInstance(): typeof pnp.sp;
}
