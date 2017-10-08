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
const AppSettings_1 = require("./AppSettings");
const cpass_1 = require("cpass");
const bluebird = require("bluebird");
const fs = require("fs");
const adal = require('adal-node');
const cpass = new cpass_1.Cpass();
class AuthHelper {
    constructor(resource, tenantId) {
        this.resource = resource;
        this.tenantId = tenantId;
        this.clientId = AppSettings_1.AppSettings.get('ClientId');
        this.clientSecret = cpass.decode(AppSettings_1.AppSettings.get('ClientSecret'));
        this.thumbprint = AppSettings_1.AppSettings.get('Thumbprint');
    }
    getAppOnlyToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let authorityUrl = `https://login.microsoftonline.com/${this.tenantId}`;
            let certificate = fs.readFileSync(__dirname + '/key/private.pem', { encoding: 'utf8' });
            let authContext = bluebird.promisifyAll(new adal.AuthenticationContext(authorityUrl));
            let tokenResponse = yield authContext.acquireTokenWithClientCertificateAsync(this.resource, this.clientId, certificate, this.thumbprint);
            return tokenResponse.accessToken;
        });
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=AuthHelper.js.map