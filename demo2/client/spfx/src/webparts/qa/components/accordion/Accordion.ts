import * as Vue from 'vue';
import { UiCollapsible } from 'keen-ui';
import { Component, Prop } from 'vue-property-decorator';


@Component({
    components: {
      UiCollapsible
    }
})
export default class Accordion extends Vue { 
    public size: string = 'normal';

    public loopValues: number[] = [1,2,3];
}