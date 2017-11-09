import * as spauth from 'node-sp-auth';
import * as request from 'request-promise';

import { creds } from "./_private.creds";
let siteUrl = "https://mvapps.sharepoint.com/sites/dev";

spauth.getAuth(siteUrl, creds)
    .then(response => {
        let options: request.OptionsWithUrl = {
            json: true,
            strictSSL: false,
            resolveWithFullResponse: true,
            simple: true,
            url: `${siteUrl}/_api/web`,
            headers: {
                ...response.headers,
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose'
            }
        };

        return request.get(options);
    })
    .then((data: any) => {
        console.log(data.body.d);
    });