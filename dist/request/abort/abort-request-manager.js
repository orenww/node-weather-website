"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execute_events_1 = __importDefault(require("../../execute-events"));
const upload_data_access_1 = __importDefault(require("../../database/upload/upload-data-access"));
const audit_events_1 = __importDefault(require("../../database/audit/audit-events"));
class AbortRequestManager {
    constructor(requestsForExecutionChannel, auditChannel, logger) {
        this.requestsForExecutionChannel = requestsForExecutionChannel;
        this.auditChannel = auditChannel;
        this.logger = logger;
        this.dataAccess = upload_data_access_1.default.getInstance();
    }
    abortFiles(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.dataAccess.getAllFilesNotCompleted(requestId);
            records.forEach((record) => {
                this.requestsForExecutionChannel.emit(execute_events_1.default.ABORT, record.requestId, record.fileId);
            });
        });
    }
    manageNewRequest(request) {
        this.logger.log.debug(`UploadRequestManager: send request to execute manager`);
        this.auditChannel.emit(audit_events_1.default.RECEIVED_ABORT_REQUEST, request);
        this.abortFiles(request.request_id);
    }
}
exports.default = AbortRequestManager;
//# sourceMappingURL=abort-request-manager.js.map