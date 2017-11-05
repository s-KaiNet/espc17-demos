import * as pnp from 'sp-pnp-js';
import { HttpClientImpl, FetchOptions, Util } from 'sp-pnp-js';
import * as spauth from 'node-sp-auth';
import * as nodeFetch from 'node-fetch';
import { Headers } from 'node-fetch';
import fetch from 'node-fetch';
import { parse as urlParse } from 'url';

import { creds } from "./_private.creds";

declare var global: any;

global.Headers = nodeFetch.Headers;
global.Request = nodeFetch.Request;
global.Response = nodeFetch.Response;

class NodeFetchClient implements HttpClientImpl {

    constructor(private authSettngs: spauth.IAuthOptions, private siteUrl?: string) { }

    public fetch(url: string, options: FetchOptions): Promise<any> {

        return <any>spauth.getAuth(url, this.authSettngs)
            .then((data: any) => {

                /* attach headers and options received from node-sp-auth */
                const headers: Headers = new Headers();
                this.mergeHeaders(headers, options.headers);
                this.mergeHeaders(headers, data.headers);

                Util.extend(options, {
                    headers: headers
                });

                /* perform actual request with node-fetch */
                return fetch(url, <any>options);
            });
    }

    private mergeHeaders(target: Headers, source: any): void {
        if (typeof source !== 'undefined' && source !== null) {
            const temp: any = <any>new Request('', { headers: source });
            temp.headers.forEach((value: string, name: string) => {
                target.set(name, value);
            });
        }
    }
}

pnp.setup({
    sp: {
        fetchClientFactory: () => new NodeFetchClient(creds),
        baseUrl: "https://mvapps.sharepoint.com/sites/dev"
    }
});

pnp.sp.web.get().then(data => {
    console.log(data);
});