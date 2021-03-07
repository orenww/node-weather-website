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
const common_request_validator_1 = __importDefault(require("../common-request-validator"));
const schema_file_names_1 = __importDefault(require("../schema/schema-file-names"));
const configuration_data_access_1 = __importDefault(require("../../database/configuration/configuration-data-access"));
const response_status_code_1 = __importDefault(require("../../response/response-status-code"));
const file_request_1 = __importDefault(require("../file-request"));
const server_type_1 = __importDefault(require("../server-type"));
class UploadRequestValidator extends common_request_validator_1.default {
    validateServerHost(serverHost) {
        if (serverHost === '') {
            throw new Error(response_status_code_1.default.BAD_SERVER_HOST);
        }
        else {
            return true;
        }
    }
    validateServerPort(serverPort) {
        if (serverPort === 0) {
            throw new Error(response_status_code_1.default.BAD_SERVER_PORT);
        }
        else {
            return true;
        }
    }
    validateServerConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverConfiguration = configuration_data_access_1.default.getInstance().getFuseServerConfiguration();
            const serverHost = serverConfiguration.getServerHost();
            const serverPort = serverConfiguration.getServerPort();
            const isServerConfigurationHostValid = this.validateServerHost(serverHost);
            const isServerConfigurationPortValid = this.validateServerPort(serverPort);
            if (!isServerConfigurationHostValid || !isServerConfigurationPortValid) {
                const error = `UploadRequestValidator:validateServerConfiguration - server configuration  is undefined, host: ${serverHost} port: ${serverPort}`;
                this.logger.log.error(error);
                return Promise.reject(new Error(error));
            }
            return Promise.resolve(isServerConfigurationHostValid && isServerConfigurationPortValid);
        });
    }
    isValidSourcePath(sourcePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExistFileToUpload = yield file_request_1.default.isValidFilePath(sourcePath);
            if (!isExistFileToUpload) {
                this.logger.log.error(`UploadRequestValidator: Source path is not valid`);
                return Promise.reject(new Error(response_status_code_1.default.SOURCE_DOES_NOT_EXIST));
            }
            return isExistFileToUpload;
        });
    }
    isValidRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log.info(`validate new folder upload request ${request.request_id}, ${request.source_path}`);
            yield this.validateServerConfiguration();
            let validateInput = false;
            if (request.server_type === server_type_1.default.SMB) {
                validateInput = yield this.validateInput(request, schema_file_names_1.default.UPLOAD_SMB);
            }
            else {
                validateInput = yield this.validateInput(request, schema_file_names_1.default.UPLOAD_NFS);
            }
            const isValidSourcePath = yield this.isValidSourcePath(request.source_path);
            return Promise.resolve(validateInput && this.isValidPriority(request.priority) && isValidSourcePath);
        });
    }
}
exports.default = UploadRequestValidator;
//# sourceMappingURL=upload-request-validator.js.map