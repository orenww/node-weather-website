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
const file_status_1 = __importDefault(require("../../database/upload/file-status"));
const response_status_code_1 = __importDefault(require("../../response/response-status-code"));
const configuration_data_access_1 = __importDefault(require("../../database/configuration/configuration-data-access"));
const components_1 = __importDefault(require("../../config/components"));
const audit_events_1 = __importDefault(require("../../database/audit/audit-events"));
class GetConfigurationRequestManager {
    constructor(auditChannel, logger) {
        this.auditChannel = auditChannel;
        this.logger = logger;
        this.configurationDataAccess = configuration_data_access_1.default.getInstance();
        this.responseManager = components_1.default.getInstance().getConfiguredServices().responseManager;
    }
    manageNewRequest(configurationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fuseServerConfiguration = this.configurationDataAccess.getFuseServerConfiguration();
                this.responseManager.sendResponse(configurationRequest.request_id, file_status_1.default.COMPLETED, response_status_code_1.default.OK, `${JSON.stringify(fuseServerConfiguration)}`);
                this.auditChannel.emit(audit_events_1.default.RECEIVED_GET_CONFIGURATION_REQUEST, configurationRequest);
            }
            catch (error) {
                this.logger.log.error(`GetConfigurationRequestManager: configuration request ${configurationRequest.request_id} type: ${configurationRequest.operation_type} failed: ${error.message}`);
                this.responseManager.sendResponse(configurationRequest.request_id, file_status_1.default.FAILED, response_status_code_1.default.SERVER_CONFIGURATION_ERROR, `Invalid argument: ${error.message}`);
            }
        });
    }
}
exports.default = GetConfigurationRequestManager;
//# sourceMappingURL=get-configuration-request-manager.js.map