"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_type_1 = __importDefault(require("./request-type"));
const upload_request_validator_1 = __importDefault(require("./upload/upload-request-validator"));
const set_configuration_request_validator_1 = __importDefault(require("./configuration/set-configuration-request-validator"));
const get_configuration_request_validator_1 = __importDefault(require("./configuration/get-configuration-request-validator"));
const abort_request_validator_1 = __importDefault(require("./abort/abort-request-validator"));
const response_status_code_1 = __importDefault(require("../response/response-status-code"));
class RequestValidatorFactory {
    constructor(logger) {
        this.logger = logger;
    }
    create(requestType) {
        this.logger.log.debug(`RequestValidatorFactory: create request validator, requestType: ${requestType} `);
        switch (requestType) {
            case request_type_1.default.UPLOAD: {
                return new upload_request_validator_1.default(this.logger);
            }
            case request_type_1.default.SET_CONFIGURATION: {
                return new set_configuration_request_validator_1.default(this.logger);
            }
            case request_type_1.default.GET_CONFIGURATION: {
                return new get_configuration_request_validator_1.default(this.logger);
            }
            case request_type_1.default.ABORT_UPLOAD: {
                return new abort_request_validator_1.default(this.logger);
            }
            default: {
                throw new Error(response_status_code_1.default.INVALID_OPERATION_TYPE);
            }
        }
    }
}
exports.default = RequestValidatorFactory;
//# sourceMappingURL=request-validator-factory.js.map