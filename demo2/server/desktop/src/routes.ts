import { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

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
    { path: '/', redirect: '/login' }];

let router: VueRouter = new VueRouter({
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !AuthData.User) {
        // next('/login');
        // return;
    }

    next();
});

export default router;
