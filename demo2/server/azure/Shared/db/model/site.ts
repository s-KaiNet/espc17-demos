import { Schema, Document, Model, model } from 'mongoose';
import { IQuestionModel } from './question';

export interface ISiteModel extends Document {
    serverRelativeUrl: string;
    id: string;
    questions: IQuestionModel[];
}

const siteSchema = new Schema({
    serverRelativeUrl: String,
    id: String,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export const Site: Model<ISiteModel> = model('Site', siteSchema) as Model<ISiteModel>;
