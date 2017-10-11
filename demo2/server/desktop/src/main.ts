import Vue from 'vue';
import './assets/app.css';
import 'keen-ui/dist/keen-ui.css';
import App from './components/app/App.vue';

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  render: h => h(App)
});
