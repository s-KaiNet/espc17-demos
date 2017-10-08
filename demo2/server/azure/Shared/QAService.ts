import { AppSettings } from './AppSettings';
import { IChange } from './interfaces/IChange';
import { QAListManager } from 'qa-common';
import { IWebHookData } from './interfaces/IWebHookData';
import { ChangeType } from './common/ChangeType';
import { ModerationStatus } from './common/ModerationStatus';
import { ISiteModel, Site } from './db/model/site';
import { Question, IQuestionModel } from './db/model/question';
import * as mongoose from 'mongoose';

export class QAService {
    constructor(private listManager: QAListManager, private data: IWebHookData) {
        (mongoose as any).Promise = global.Promise;
        mongoose.connect(AppSettings.get('MongoDbConnection'), {
            useMongoClient: true
        });
    }

    public async syncDb(): Promise<any> {
        let web = await this.listManager.getLastChanges(this.data.listId) as IChange[];
        let updatedItems = web.filter((item) => item.ChangeType === ChangeType.Add || item.ChangeType === ChangeType.Update);
        let deletedItems = web.filter((item) => item.ChangeType === ChangeType.Delete);

        await this.processUpdatedItems(updatedItems);
    }

    private async processUpdatedItems(items: IChange[]): Promise<any> {
        items.forEach(async (item) => {
            try {
                let listItem = await this.listManager.getQuestionById(item.ItemId);

                if (listItem['OData__ModerationStatus'] === ModerationStatus.Pending) {
                    await this.addItemForModeration(listItem);
                }
            } catch (err) {
                if (err.status !== 404) {
                    throw err;
                }
            }
        });
    }

    private async addItemForModeration(item: any): Promise<any> {
        let site = await Site.findOne({ 'serverRelativeUrl': this.data.siteRelativeUrl }).exec() as ISiteModel;

        if (!site) {
            site = await this.createSite();
        }

        let question = await Question.findOne({
            'listId': item.Id,
            'site': new mongoose.Types.ObjectId(site._id)
        }).exec();

        if (question) {
            return;
        }

        question = new Question();
        question.listItemId = item.Id;
        question.site = site;
        site.questions.push(question);

        await site.save();
        await question.save();
    }

    private async createSite(): Promise<ISiteModel> {
        let site = new Site();
        site.serverRelativeUrl = this.data.siteRelativeUrl;
        return site.save();
    }
}
