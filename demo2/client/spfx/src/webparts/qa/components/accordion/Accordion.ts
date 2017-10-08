import * as Vue from "vue";
import { UiCollapsible } from "keen-ui";
import { Component, Prop } from "vue-property-decorator";

import { QAManager } from "qa-common/lib/QAManager";
import { IQuestion } from "qa-common/lib/interfaces/IQuestion";
import { SpfxPnPRestResolver } from "qa-common/lib/resolver/client/SpfxPnPRestResolver";
import { WebPartContext } from "@microsoft/sp-webpart-base";

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

    public created(): any {
        this.qaManager = new QAManager(new SpfxPnPRestResolver(this.ctx.pageContext.web.absoluteUrl));

        this.qaManager.getAllQandA()
            .then((data: IQuestion[]) => {
                console.log(data);
                this.questions = data;
            });
    }
}
