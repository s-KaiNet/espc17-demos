import { SPRest } from "sp-pnp-js/lib/sharepoint/rest";

export abstract class PnPRestResolver {
    constructor(public baseUrl: string) {}

    abstract getPnPRestInstance(): SPRest;
}