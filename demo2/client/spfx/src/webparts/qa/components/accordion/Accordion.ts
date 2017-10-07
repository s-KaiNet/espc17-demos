import * as Vue from 'vue';
import { UiCollapsible } from 'keen-ui';
import { Component, Prop } from 'vue-property-decorator';

import { QAManager, SpfxPnPRestResolver, IQuestion } from "qa-common";
import { WebPartContext } from '@microsoft/sp-webpart-base';

@Component({
    components: {
        UiCollapsible
    }
})
export default class Accordion extends Vue {

    @Prop()
    public ctx: WebPartContext;

    public questions: IQuestion[] = [];
    public qaManager: QAManager;

    constructor() {
        super();

        this.qaManager = new QAManager(new SpfxPnPRestResolver(this.ctx.pageContext.web.absoluteUrl));
    }

    public created(): any {
        this.qaManager.getAllQandA()
            .then((data: IQuestion[]) => {
                console.log(data);
                this.questions = data;
            });
    }
}
