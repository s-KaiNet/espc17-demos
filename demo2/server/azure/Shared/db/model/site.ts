import * as mongoose from 'mongoose';
import { IQuestionModel, Question } from './question';

export interface ISiteModel extends mongoose.Document {
    serverRelativeUrl: string;
    title: string;
    id: string;
    questions: mongoose.Types.Array<IQuestionModel>;
}

const siteSchema = new mongoose.Schema({
    serverRelativeUrl: String,
    id: String,
    title: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

export const Site: mongoose.Model<ISiteModel> = mongoose.model<ISiteModel>('Site', siteSchema) as mongoose.Model<ISiteModel>;
