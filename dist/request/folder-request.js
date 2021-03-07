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
const path = __importStar(require("path"));
const file_request_1 = __importDefault(require("./file-request"));
const fuse_client_1 = __importDefault(require("../fuse-client"));
const rra = require('recursive-readdir-async');
const slash = require('slash');
class FolderRequest {
    constructor(logger) {
        this.logger = logger;
        this.fuseClient = new fuse_client_1.default(this.logger);
    }
    getFileArray(folder_path) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(rra.list(folder_path));
        });
    }
    getActualDestinationPath(sourcePath, withoutFolder, destinationPath, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootFolder = path.basename(sourcePath);
            const availableDestinationPath = destinationPath.map((dest) => __awaiter(this, void 0, void 0, function* () {
                let availableDestination;
                if (withoutFolder) {
                    availableDestination = yield this.fuseClient.getActualDestinationPath(dest, metadata);
                }
                else {
                    availableDestination = yield this.fuseClient.getActualDestinationPath(slash(path.join(dest, rootFolder)), metadata);
                }
                return availableDestination;
            }));
            return Promise.all(availableDestinationPath);
        });
    }
    getDestinationFullPath(sourcePath, fileFullPath, destinationPath) {
        const rootFolder = path.basename(sourcePath);
        const fullDestinationPath = destinationPath.map((dest) => {
            const dirPath = path.dirname(fileFullPath).split(rootFolder)[1];
            return slash(path.join(dest, dirPath));
        });
        return fullDestinationPath;
    }
    convertToFileRequestArray(request, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const availableDestination = yield this.getActualDestinationPath(request.source_path, request.without_parent, request.destination_path, request.metadata);
            const fileRequests = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const size = yield file_request_1.default.getFileSize(file.fullname);
                const fullDestination = yield this.getDestinationFullPath(request.source_path, file.fullname, availableDestination);
                const metadata = yield file_request_1.default.getRequestMetadata(Object.assign({}, request.metadata), file.fullname);
                return Object.assign(Object.assign({}, request), { metadata, destination_path: fullDestination, file_id: uuid(), source_path: file.fullname, size });
            }));
            return Promise.all(fileRequests);
        });
    }
    getFileRequestArray(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.getFileArray(request.source_path);
            if (files.length === 0) {
                return Promise.resolve([]);
            }
            return this.convertToFileRequestArray(request, files);
        });
    }
    isFolder(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield file_request_1.default.getPathStat(filePath);
            return stats.isDirectory();
        });
    }
}
exports.default = FolderRequest;
//# sourceMappingURL=folder-request.js.map