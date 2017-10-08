"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppSettings {
    static get(name) {
        return process.env[name];
    }
}
exports.AppSettings = AppSettings;
//# sourceMappingURL=AppSettings.js.map