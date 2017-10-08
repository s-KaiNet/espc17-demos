"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    listItemId: Number,
    site: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Site' }
});
exports.Question = mongoose_1.model('Question', questionSchema);
//# sourceMappingURL=question.js.map