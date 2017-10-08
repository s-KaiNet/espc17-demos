"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const siteSchema = new mongoose_1.Schema({
    serverRelativeUrl: String,
    id: String,
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' }]
});
exports.Site = mongoose_1.model('Site', siteSchema);
//# sourceMappingURL=site.js.map