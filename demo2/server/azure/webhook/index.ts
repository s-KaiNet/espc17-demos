import * as fs from "fs";
import * as bluebird from "bluebird";
import * as request from "request-promise";
import { PlainNodeFetchClient } from "node-pnp-js";
import { Cpass } from 'cpass';
import * as pnp from "sp-pnp-js";
import { QAManager, NodePnPRestResolver, IQuestion } from "qa-common";
const cpass = new Cpass();
const adal = require("adal-node");

export function run(context: any, req: any): void {
    execute(context, req)
        .catch((err: any) => {
            console.log(err);
            context.res = {
                status: 500,
                body: err.toString()
            };
            context.done();
        });
}

async function execute(context: any, req: any): Promise<any> {
    let clientId = getAppSetting("ClientId");
    let clientSecret = cpass.decode(getAppSetting("ClientSecret"));
    let thumbprint = getAppSetting("Thumbprint");
    let certificate = fs.readFileSync(__dirname + "/private.pem", { encoding: "utf8" });
    let authorityHostUrl = "https://login.microsoftonline.com";
    let tenant = "948fd9cc-9adc-40d8-851e-acefa17ab66c";
    let authorityUrl = authorityHostUrl + "/" + tenant;
    let authContext = bluebird.promisifyAll(new adal.AuthenticationContext(authorityUrl)) as any;
    var resource = "https://mvapps.sharepoint.com";

    let tokenResponse = await authContext.acquireTokenWithClientCertificateAsync(resource, clientId, certificate, thumbprint);

    console.log(tokenResponse);
    
    var accesstoken = tokenResponse.accessToken;

    let mngr = new QAManager(new NodePnPRestResolver('https://mvapps.sharepoint.com/sites/hr', {
        'Authorization': 'Bearer ' + accesstoken
    }));
    
    let web = await mngr.getAllQandA();

    context.log(web);

    context.res = {
        body: {
            message: `Hello from azure function!`
        }
    };
    context.done();
}

function getAppSetting(name: string): string {
    return process.env[name] as string;
}