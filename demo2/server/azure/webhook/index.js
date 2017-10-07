"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const bluebird = require("bluebird");
const cpass_1 = require("cpass");
const qa_common_1 = require("qa-common");
const cpass = new cpass_1.Cpass();
const adal = require("adal-node");
function run(context, req) {
    execute(context, req)
        .catch((err) => {
        console.log(err);
        context.res = {
            status: 500,
            body: err.toString()
        };
        context.done();
    });
}
exports.run = run;
function execute(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let clientId = getAppSetting("ClientId");
        let clientSecret = cpass.decode(getAppSetting("ClientSecret"));
        let thumbprint = getAppSetting("Thumbprint");
        let certificate = fs.readFileSync(__dirname + "/private.pem", { encoding: "utf8" });
        let authorityHostUrl = "https://login.microsoftonline.com";
        let tenant = "948fd9cc-9adc-40d8-851e-acefa17ab66c";
        let authorityUrl = authorityHostUrl + "/" + tenant;
        let authContext = bluebird.promisifyAll(new adal.AuthenticationContext(authorityUrl));
        var resource = "https://mvapps.sharepoint.com";
        let tokenResponse = yield authContext.acquireTokenWithClientCertificateAsync(resource, clientId, certificate, thumbprint);
        console.log(tokenResponse);
        var accesstoken = tokenResponse.accessToken;
        let mngr = new qa_common_1.QAManager(new qa_common_1.NodePnPRestResolver('https://mvapps.sharepoint.com/sites/hr', {
            'Authorization': 'Bearer ' + accesstoken
        }));
        let web = yield mngr.getAllQandA();
        context.log(web);
        context.res = {
            body: {
                message: `Hello from azure function!`
            }
        };
        context.done();
    });
}
function getAppSetting(name) {
    return process.env[name];
}
//# sourceMappingURL=index.js.map