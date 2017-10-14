import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as spauth from 'node-sp-auth';
import { AuthData } from '../../common/authData';
import { PlainNodeFetchClient } from 'node-pnp-js';
import * as pnp from 'sp-pnp-js';
import { QAListManager, NodePnPRestResolver } from 'qa-common';

@Component
export default class Login extends Vue {
    public loading = false;

    public async login() {
        this.loading = true;
        let data = await spauth.getAuth(ROOT_SP_URL, { ondemand: true, force: false });
        AuthData.auth = data.headers;
        console.log(AuthData.auth);

        let mngr = new QAListManager(new NodePnPRestResolver(ROOT_SP_URL, AuthData.auth));
        let user = await mngr.getCurrentUser();
        AuthData.User = user.Title;
        console.log(user);
        this.$router.push('/app');
    }
}
