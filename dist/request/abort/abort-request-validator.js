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
class AbortRequestValidator extends common_request_validator_1.default {
    isValidRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log.info(`Validate input`);
            const validateInput = yield this.validateInput(request, 'abortSchema.json');
            const isExistRequestId = yield this.isExistRequestId(request.request_id);
            return validateInput && isExistRequestId;
        });
    }
}
exports.default = AbortRequestValidator;
//# sourceMappingURL=abort-request-validator.js.map