import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import SideBar from './../SideBar/SideBar.vue';
import TopBar from './../TopBar/TopBar.vue';

@Component({
    components: {
        'side-bar': SideBar,
        'top-bar': TopBar
    }
})
export default class MainView extends Vue {

}
