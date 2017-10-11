import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UiCollapsible } from 'keen-ui';

@Component({
  components: {
      UiCollapsible
  }
})
export default class App extends Vue {
  public msg = 'app sdfasdf';
  public html = '<p>cool!!!</p>';
}
