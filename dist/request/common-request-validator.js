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
const Ajv = __importStar(require("ajv"));
const path = __importStar(require("path"));
const util_1 = require("util");
const fs = __importStar(require("fs"));
const priority_1 = __importDefault(require("../model/priority"));
const upload_data_access_1 = __importDefault(require("../database/upload/upload-data-access"));
const response_status_code_1 = __importDefault(require("../response/response-status-code"));
const ajv = new Ajv();
const readFilePromise = util_1.promisify(fs.readFile);
class CommonRequestValidator {
    constructor(logger) {
        this.logger = logger;
        this.dataAccess = upload_data_access_1.default.getInstance();
    }
    isValidPriority(priority) {
        const lowerPriority = priority ? priority.toLowerCase() : priority;
        const prioInEnum = Object.values(priority_1.default).find(prio => prio === lowerPriority);
        if (!prioInEnum) {
            this.logger.log.info('The priority is not valid, use low priority instead');
        }
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateInput(request, jsonSchemaFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestSchema = yield readFilePromise(path.join(__dirname, 'schema', jsonSchemaFile), 'utf8');
                const validate = ajv.compile(JSON.parse(requestSchema));
                const valid = validate(request);
                if (!valid) {
                    throw new Error(`${response_status_code_1.default.INVALID_REQUEST_SCHEMA}:${JSON.stringify(validate.errors)}`);
                }
                return true;
            }
            catch (error) {
                this.logger.log.error(`CommonRequestValidator - ValidateInput: error when validate input: ${error}`);
                throw new Error(`${response_status_code_1.default.INVALID_REQUEST_SCHEMA}:${error.message}`);
            }
        });
    }
    isExistRequestId(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.dataAccess.getAllFiles({ requestId });
            if (records.length === 0) {
                return Promise.reject(new Error(response_status_code_1.default.INVALID_REQUESTID));
            }
            return true;
        });
    }
}
exports.default = CommonRequestValidator;
//# sourceMappingURL=common-request-validator.js.map