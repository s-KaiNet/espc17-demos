import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class SideBar extends Vue {
    public navigate(location: string): void {
        this.$router.push(location);
    }
}
