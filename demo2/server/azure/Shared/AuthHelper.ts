import { AppSettings } from './AppSettings';
import { Cpass } from 'cpass';
import * as bluebird from 'bluebird';
import * as fs from 'fs';

const adal = require('adal-node');
const cpass = new Cpass();

export class AuthHelper {

    private clientId: string;
    private clientSecret: string;
    private thumbprint: string;

    constructor(private resource: string, private tenantId: string) {
        this.clientId = AppSettings.get('ClientId');
        this.clientSecret = cpass.decode(AppSettings.get('ClientSecret'));
        this.thumbprint = AppSettings.get('Thumbprint');
    }

    public async getAppOnlyToken(): Promise<string> {
        let authorityUrl = `https://login.microsoftonline.com/${this.tenantId}`;
        let certificate = fs.readFileSync(__dirname + '/key/private.pem', { encoding: 'utf8' });
        let authContext = bluebird.promisifyAll(new adal.AuthenticationContext(authorityUrl)) as any;

        let tokenResponse = await authContext.acquireTokenWithClientCertificateAsync(this.resource, this.clientId, certificate, this.thumbprint);

        return tokenResponse.accessToken;
    }
}
