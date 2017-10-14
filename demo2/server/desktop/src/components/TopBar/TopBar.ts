import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { AuthData } from '../../common/authData';

@Component
export default class TopBar extends Vue {
    public userName = AuthData.User;

    public created() {
        this.userName = AuthData.User;
    }
}
