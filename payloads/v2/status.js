"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatus = void 0;
/**
 * APIApplicationStatus#status
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/status
 */
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["Exited"] = "exited";
    ApplicationStatus["Created"] = "created";
    ApplicationStatus["Starting"] = "starting";
    ApplicationStatus["Restarting"] = "restarting";
    ApplicationStatus["Deleting"] = "deleting";
    ApplicationStatus["Running"] = "running";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
//# sourceMappingURL=status.js.map