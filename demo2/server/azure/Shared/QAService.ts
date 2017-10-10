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
        let changes = await this.listManager.getLastChanges(this.data.listId) as IChange[];

        let updatedItems = changes.filter((item) => item.ChangeType === ChangeType.Add || item.ChangeType === ChangeType.Update);
        let deletedItems = changes.filter((item) => item.ChangeType === ChangeType.Delete);

        await this.processUpdatedItems(updatedItems);
        await this.processDeletedItems(deletedItems);
    }

    private async processUpdatedItems(items: IChange[]): Promise<any> {
        let uniqueItems = this.createUniqueArray(items);

        uniqueItems.forEach(async (item) => {
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

    private async processDeletedItems(items: IChange[]): Promise<any> {
        let uniqueItems = this.createUniqueArray(items);

        uniqueItems.forEach(async (item) => {
            await this.removeItem(item);
        });
    }

    private createUniqueArray(items: IChange[]): IChange[] {
        let uniqueItems: IChange[] = [];

        items.forEach(item => {
            let exists = uniqueItems.find(i => {
                return i.ItemId === item.ItemId;
            });

            if (exists) return;
            uniqueItems.push(item);
        });

        return uniqueItems;
    }

    private async removeItem(item: IChange): Promise<any> {
        let site = await this.ensureSite();

        let question = await Question.findOne({
            'listItemId': item.ItemId,
            'site': site._id
        }).exec();

        if (!question) {
            return;
        }

        site.questions.pull(question._id);

        await site.save();
        await question.remove();
    }

    private async addItemForModeration(item: any): Promise<any> {
        let site = await this.ensureSite();

        let question = await Question.findOne({
            'listItemId': item.Id,
            'site': site._id
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

    private async ensureSite(): Promise<ISiteModel> {
        let site = await Site.findOne({ 'serverRelativeUrl': this.data.siteRelativeUrl }).exec() as ISiteModel;

        if (!site) {
            site = await this.createSite();
        }

        return site;
    }

    private async createSite(): Promise<ISiteModel> {
        let site = new Site();
        site.serverRelativeUrl = this.data.siteRelativeUrl;
        return site.save();
    }
}
