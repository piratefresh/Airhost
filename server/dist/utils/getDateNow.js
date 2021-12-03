"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISOToDBDate = void 0;
const date_fns_1 = require("date-fns");
function ISOToDBDate(isoDate) {
    return date_fns_1.format(new Date(isoDate), "yyyy-MM-dd kk:mm:ss.SSS");
}
exports.ISOToDBDate = ISOToDBDate;
//# sourceMappingURL=getDateNow.js.map