"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run(context, req) {
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
    req.value.forEach((item) => {
        context.bindings.queueRequest.push({
            tenantId: item.tenantId,
            siteRelativeUrl: item.siteUrl,
            listId: item.resource
        });
    });
    context.done();
}
exports.run = run;
//# sourceMappingURL=index.js.map