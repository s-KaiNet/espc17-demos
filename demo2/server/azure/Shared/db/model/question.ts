import * as mongoose from 'mongoose';
import { ISiteModel } from './site';

export interface IQuestionModel extends mongoose.Document {
    listItemId: number;
    site: ISiteModel;
}

const questionSchema = new mongoose.Schema({
    listItemId: Number,
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }
});

export const Question: mongoose.Model<IQuestionModel> = mongoose.model('Question', questionSchema) as mongoose.Model<IQuestionModel>;
