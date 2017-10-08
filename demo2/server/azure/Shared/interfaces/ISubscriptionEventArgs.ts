export interface ISubscriptionEventArgs {
    subscriptionId: string;
    clientState: string;
    expirationDateTime: Date;
    resource: string;
    tenantId: string;
    siteUrl: string;
    webId: string;
}
