import { ISubscriptionEventArgs } from './../Shared/interfaces/ISubscriptionEventArgs';
export function run(context: any, req: any): void {
    if (context.req.query.validationtoken) {
        context.res = {
            body: context.req.query.validationtoken,
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        context.done();
        return;
    }

    if (!req.value || !(req.value instanceof Array)) {
        throw new Error('Unable to parse incoming request');
    }
    context.bindings.queueRequest = [];

    req.value.forEach((item: ISubscriptionEventArgs) => {
        context.bindings.queueRequest.push({
            tenantId: item.tenantId,
            siteRelativeUrl: item.siteUrl,
            listId: item.resource
        });
    });

    context.done();
}
