"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSettings_1 = require("./../Shared/AppSettings");
const qa_common_1 = require("qa-common");
const AuthHelper_1 = require("../Shared/AuthHelper");
function run(context, req) {
    execute(context, req)
        .catch((err) => {
        console.log(err);
        context.res = {
            status: 500,
            body: err.toString()
        };
        context.done();
    });
}
exports.run = run;
function execute(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let tenantUrl = AppSettings_1.AppSettings.get('TenantUrl');
        let auth = new AuthHelper_1.AuthHelper(tenantUrl);
        let accesstoken = yield auth.getAppOnlyToken();
        let mngr = new qa_common_1.QAManager(new qa_common_1.NodePnPRestResolver(`${tenantUrl}/sites/hr`, {
            'Authorization': 'Bearer ' + accesstoken
        }));
        let web = yield mngr.getAllQandA();
        context.log(web);
        context.res = {
            body: {
                message: `Hello from azure function!`
            }
        };
        context.done();
    });
}
//# sourceMappingURL=index.js.map