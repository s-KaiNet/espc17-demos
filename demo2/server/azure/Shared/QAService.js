"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSettings_1 = require("./AppSettings");
const ChangeType_1 = require("./common/ChangeType");
const ModerationStatus_1 = require("./common/ModerationStatus");
const site_1 = require("./db/model/site");
const question_1 = require("./db/model/question");
const mongoose = require("mongoose");
class QAService {
    constructor(listManager, data) {
        this.listManager = listManager;
        this.data = data;
        mongoose.Promise = global.Promise;
        mongoose.connect(AppSettings_1.AppSettings.get('MongoDbConnection'), {
            useMongoClient: true
        });
    }
    syncDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let web = yield this.listManager.getLastChanges(this.data.listId);
            let updatedItems = web.filter((item) => item.ChangeType === ChangeType_1.ChangeType.Add || item.ChangeType === ChangeType_1.ChangeType.Update);
            let deletedItems = web.filter((item) => item.ChangeType === ChangeType_1.ChangeType.Delete);
            yield this.processUpdatedItems(updatedItems);
        });
    }
    processUpdatedItems(items) {
        return __awaiter(this, void 0, void 0, function* () {
            items.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let listItem = yield this.listManager.getQuestionById(item.ItemId);
                    if (listItem['OData__ModerationStatus'] === ModerationStatus_1.ModerationStatus.Pending) {
                        yield this.addItemForModeration(listItem);
                    }
                }
                catch (err) {
                    if (err.status !== 404) {
                        throw err;
                    }
                }
            }));
        });
    }
    addItemForModeration(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let site = yield site_1.Site.findOne({ 'serverRelativeUrl': this.data.siteRelativeUrl }).exec();
            if (!site) {
                site = yield this.createSite();
            }
            let question = yield question_1.Question.findOne({
                'listId': item.Id,
                'site': new mongoose.Types.ObjectId(site._id)
            }).exec();
            if (question) {
                return;
            }
            question = new question_1.Question();
            question.listItemId = item.Id;
            question.site = site;
            site.questions.push(question);
            yield site.save();
            yield question.save();
        });
    }
    createSite() {
        return __awaiter(this, void 0, void 0, function* () {
            let site = new site_1.Site();
            site.serverRelativeUrl = this.data.siteRelativeUrl;
            return site.save();
        });
    }
}
exports.QAService = QAService;
//# sourceMappingURL=QAService.js.map