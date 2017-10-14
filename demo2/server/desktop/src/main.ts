import Vue from 'vue';
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueRouter from 'vue-router';

import './assets/app.css';
import App from './components/App/App.vue';
import router from './routes';

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});

router.replace('/login');
