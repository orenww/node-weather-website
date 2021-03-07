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
class SetConfigurationRequestValidator extends common_request_validator_1.default {
    isValidRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log.info(`Validate input`);
            const validateInput = this.validateInput(request, schema_file_names_1.default.SET_CONFIGURATION);
            return Promise.resolve(validateInput);
        });
    }
}
exports.default = SetConfigurationRequestValidator;
//# sourceMappingURL=set-configuration-request-validator.js.map