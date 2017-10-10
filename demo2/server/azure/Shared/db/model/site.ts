import { Schema, Document, Model, model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { IQuestionModel, Question } from './question';

export interface ISiteModel extends Document {
    serverRelativeUrl: string;
    id: string;
    questions: Types.Array<IQuestionModel>;
}

const siteSchema = new Schema({
    serverRelativeUrl: String,
    id: String,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export const Site: Model<ISiteModel> = model('Site', siteSchema) as Model<ISiteModel>;
