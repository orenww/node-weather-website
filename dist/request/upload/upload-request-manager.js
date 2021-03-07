"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const uuid = __importStar(require("uuid/v4"));
const execute_events_1 = __importDefault(require("../../execute-events"));
const file_request_1 = __importDefault(require("../file-request"));
const file_status_1 = __importDefault(require("../../database/upload/file-status"));
const upload_data_access_1 = __importDefault(require("../../database/upload/upload-data-access"));
const upload_info_1 = __importDefault(require("../../database/upload/upload-info"));
const priority_1 = __importDefault(require("../../model/priority"));
const response_status_code_1 = __importDefault(require("../../response/response-status-code"));
const audit_events_1 = __importDefault(require("../../database/audit/audit-events"));
class UploadRequestManager {
    constructor(requestsForExecutionChannel, auditChannel, folderRequest, logger) {
        this.requestsForExecutionChannel = requestsForExecutionChannel;
        this.auditChannel = auditChannel;
        this.folderRequest = folderRequest;
        this.logger = logger;
        this.dataAccess = upload_data_access_1.default.getInstance();
    }
    getPriority(priority) {
        const lowerPriority = priority ? priority.toLowerCase() : priority;
        const prioInEnum = Object.values(priority_1.default).find(prio => prio === lowerPriority);
        return prioInEnum || lowerPriority;
    }
    createFileUploadInfo(fileRequest) {
        const fileUploadInfo = new upload_info_1.default();
        fileUploadInfo.fileId = fileRequest.file_id;
        fileUploadInfo.requestId = fileRequest.request_id;
        fileUploadInfo.operationType = fileRequest.operation_type;
        fileUploadInfo.priority = this.getPriority(fileRequest.priority);
        fileUploadInfo.requestDetails = JSON.stringify(fileRequest);
        fileUploadInfo.status = file_status_1.default.PENDING;
        fileUploadInfo.statusCode = '';
        fileUploadInfo.statusMessage = '';
        fileUploadInfo.size = fileRequest.size;
        fileUploadInfo.uploadedSize = 0;
        fileUploadInfo.serverUploadId = '';
        fileUploadInfo.responseSent = false;
        return fileUploadInfo;
    }
    insertRequestToDb(fileRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesInfo = fileRequests.map(fileRequest => this.createFileUploadInfo(fileRequest));
            return Promise.resolve(this.dataAccess.addFiles(filesInfo));
        });
    }
    getAllRequestFiles(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileRequests = [];
            const isFolder = yield this.folderRequest.isFolder(request.source_path);
            if (isFolder) {
                fileRequests = yield this.folderRequest.getFileRequestArray(request);
            }
            else {
                fileRequests.push(Object.assign(Object.assign({}, request), { file_id: uuid(), metadata: yield file_request_1.default.getRequestMetadata(request.metadata, request.source_path), size: yield file_request_1.default.getFileSize(request.source_path), destination_path: file_request_1.default.formatDestinationPath(request.destination_path) }));
            }
            return fileRequests;
        });
    }
    getFolderSize(fileRequests) {
        const folderSize = fileRequests.reduce((a, b) => {
            return a + b.size;
        }, 0);
        return folderSize;
    }
    manageNewRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log.debug(`UploadRequestManager: send request to execute manager`);
            const fileRequests = yield this.getAllRequestFiles(request);
            if (fileRequests.length === 0) {
                throw new Error(response_status_code_1.default.FOLDER_EMPTY);
            }
            this.auditChannel.emit(audit_events_1.default.RECEIVED_NEW_REQUEST, request, fileRequests.length, this.getFolderSize(fileRequests));
            yield this.insertRequestToDb(fileRequests);
            fileRequests.forEach((fileRequest) => {
                this.requestsForExecutionChannel.emit(execute_events_1.default.REQUEST, fileRequest);
            });
        });
    }
}
exports.default = UploadRequestManager;
//# sourceMappingURL=upload-request-manager.js.map