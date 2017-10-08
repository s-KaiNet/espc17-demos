import { Schema, Document, Model, model } from 'mongoose';
import { ISiteModel } from './site';

export interface IQuestionModel extends Document {
    listItemId: number;
    site: ISiteModel;
}

const questionSchema = new Schema({
    listItemId: Number,
    site: { type: Schema.Types.ObjectId, ref: 'Site' }
});

export const Question: Model<IQuestionModel> = model('Question', questionSchema) as Model<IQuestionModel>;
