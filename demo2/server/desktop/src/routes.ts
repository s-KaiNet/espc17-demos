import { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

import App from './components/App/App.vue';
import MainView from './components/MainView/MainView.vue';
import Login from './components/Login/Login.vue';
import ListManager from './components/ListManager/ListManager.vue';
import { AuthData } from './common/authData';

const routes: RouteConfig[] = [
    {
        path: '/login', component: Login
    },
    {
        path: '/app', component: MainView, children: [
            {
                path: '', component: ListManager
            }
        ]
    },
    { path: '*', redirect: '/login' }];

let router: VueRouter = new VueRouter({
    routes: routes
});

export default router;
