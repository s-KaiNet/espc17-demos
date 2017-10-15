import * as mongoose from 'mongoose';
import { IQuestionModel } from './question';

export interface ISiteModel extends mongoose.Document {
    serverRelativeUrl: string;
    id: string;
    title: string;
    questions: mongoose.Types.Array<IQuestionModel>;
}

export const siteSchema = new mongoose.Schema({
    serverRelativeUrl: String,
    id: String,
    title: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});
