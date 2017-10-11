import Vue from 'vue';
import KeenUI from 'keen-ui';
import './assets/app.css';
import 'keen-ui/dist/keen-ui.css';
import App from './components/App.vue';

Vue.use(KeenUI);

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  render: h => h(App)
});
