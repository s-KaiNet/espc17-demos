import * as spauth from 'node-sp-auth';
import * as request from 'request-promise';

import { creds } from "./_private.creds";
let siteUrl = "https://mvapps.sharepoint.com/sites/dev";

(async () => {
    let auth = await spauth.getAuth(siteUrl, creds);

    let options: request.OptionsWithUrl = {
        json: true,
        strictSSL: false,
        resolveWithFullResponse: true,
        simple: true,
        url: `${siteUrl}/_api/web`,
        headers: {
            ...auth.headers,
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
        }
    };

    let data = await request.get(options);
    console.log(data.body.d);
})();