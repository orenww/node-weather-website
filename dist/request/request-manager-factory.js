"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_type_1 = __importDefault(require("./request-type"));
const upload_request_manager_1 = __importDefault(require("./upload/upload-request-manager"));
const set_configuration_request_manager_1 = __importDefault(require("./configuration/set-configuration-request-manager"));
const get_configuration_request_manager_1 = __importDefault(require("./configuration/get-configuration-request-manager"));
const abort_request_manager_1 = __importDefault(require("./abort/abort-request-manager"));
const response_status_code_1 = __importDefault(require("../response/response-status-code"));
const components_1 = __importDefault(require("../config/components"));
class RequestManagerFactory {
    constructor(logger) {
        this.logger = logger;
    }
    create(requestType, requestManagerEvents, auditChannel) {
        this.logger.log.debug(`RequestManagerFactory: create request manager, requestType: ${requestType} `);
        const { folderRequest } = components_1.default.getInstance().getConfiguredServices();
        switch (requestType) {
            case request_type_1.default.UPLOAD: {
                return new upload_request_manager_1.default(requestManagerEvents, auditChannel, folderRequest, this.logger);
            }
            case request_type_1.default.SET_CONFIGURATION: {
                return new set_configuration_request_manager_1.default(auditChannel, this.logger);
            }
            case request_type_1.default.GET_CONFIGURATION: {
                return new get_configuration_request_manager_1.default(auditChannel, this.logger);
            }
            case request_type_1.default.ABORT_UPLOAD: {
                return new abort_request_manager_1.default(requestManagerEvents, auditChannel, this.logger);
            }
            default: {
                throw new Error(response_status_code_1.default.INVALID_OPERATION_TYPE);
            }
        }
    }
}
exports.default = RequestManagerFactory;
//# sourceMappingURL=request-manager-factory.js.map