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
const fs = __importStar(require("mz/fs"));
const util = __importStar(require("util"));
const crc_calculator_1 = __importDefault(require("../crc-calculator"));
const slash = require('slash');
class FileRequest {
    constructor(logger) {
        this.logger = logger;
    }
    static getFileSize(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileInfo = yield this.getPathStat(filePath);
            return fileInfo.size;
        });
    }
    static getPathStat(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(fs.lstat(filePath));
        });
    }
    static formatDestinationPath(destinationPath) {
        return destinationPath.map(destination => slash(destination));
    }
    static getRequestMetadata(metadata, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === metadata) {
                return {};
            }
            const crc = yield crc_calculator_1.default.calculate(filePath);
            return Object.assign(Object.assign({}, metadata), { crc });
        });
    }
    static isValidFilePath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = util.promisify(fs.exists);
            const isExist = yield exists(filePath);
            return Promise.resolve(!!isExist);
        });
    }
}
exports.default = FileRequest;
//# sourceMappingURL=file-request.js.map