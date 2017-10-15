import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { QAListManager } from 'qa-common/src';
import { NodePnPRestResolver } from 'qa-common/src';
import { AuthData } from '../../common/authData';
import * as spauth from 'node-sp-auth';
import * as mongoose from 'mongoose';
import { ISiteModel } from '../../db/site';
import { ISitesData } from '../../common/sitesData';
import { Site, Question } from '../../db/schema';

interface IQuestion {
    question: string;
    answer: string;
    shown: boolean;
    id: number;
}

@Component
export default class QuestionList extends Vue {

    @Prop()
    public initialQuestions: any[];

    @Prop()
    public serverRelativeUrl: string;

    public questions: IQuestion[] = [];

    private mngr: QAListManager;

    public get allQuestions() {
        return this.questions;
    }

    public async approveItem(question: IQuestion): Promise<any> {
        try {
            await this.mngr.approveItem(question.id, AuthData.User);
            await this.removeFromDb(question.id);

            let index = this.questions.indexOf(question)
            this.questions.splice(index, 1);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async rejectItem(question: IQuestion): Promise<any> {
        try {
            await this.mngr.rejectItem(question.id, AuthData.User);
            await this.removeFromDb(question.id);

            let index = this.questions.indexOf(question)
            this.questions.splice(index, 1);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async created() {

        // TODO - remove for real demo
        AuthData.User = 'Sergei Sergeev';
        let data = await spauth.getAuth(ROOT_SP_URL, { ondemand: true, force: false });
        this.mngr = new QAListManager(new NodePnPRestResolver(`${ROOT_SP_URL}${this.serverRelativeUrl}`, data.headers));
        let items = await this.mngr.getByIds(this.initialQuestions.map(q => q.id));

        items.forEach(item => {
            this.questions.push({
                id: item.Id,
                question: item.Question,
                answer: item.Answer,
                shown: false
            });
        });
    }

    private async removeFromDb(listItemId: number): Promise<any> {
        let site: ISiteModel = await Site.findOne({ 'serverRelativeUrl': this.serverRelativeUrl }).exec();

        let question = await Question.findOne({
            'listItemId': listItemId,
            'site': site._id
        }).exec();

        site.questions.pull(question._id);

        await site.save();
        await question.remove();
    }
}
