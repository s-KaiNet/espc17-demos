import * as mongoose from 'mongoose';
import { IQuestionModel, questionSchema } from './question';
import { ISiteModel, siteSchema } from './site';

export const Question: mongoose.Model<IQuestionModel> = mongoose.model('Question', questionSchema) as mongoose.Model<IQuestionModel>;
export const Site: mongoose.Model<ISiteModel> = mongoose.model<ISiteModel>('Site', siteSchema) as mongoose.Model<ISiteModel>;
