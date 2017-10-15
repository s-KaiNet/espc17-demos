import * as mongoose from 'mongoose';
import { ISiteModel } from './site';

export interface IQuestionModel extends mongoose.Document {
    listItemId: number;
    site: ISiteModel;
}

export const questionSchema = new mongoose.Schema({
    listItemId: Number,
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }
});

