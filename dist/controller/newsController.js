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
const successmessage_ts_1 = require("../utilies/successmessage.ts");
const errormessage_ts_1 = require("../utilies/errormessage.ts");
const news_ts_1 = __importDefault(require("../model/news.ts"));
const cloud_ts_1 = __importDefault(require("../utilies/cloud.ts"));
class newsController {
    static postNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newsTitle, newsDescription } = req.body;
                if (!req.file) {
                    return (0, errormessage_ts_1.errormessage)(res, 400, `please upload image`);
                }
                const result = yield cloud_ts_1.default.uploader.upload(req.file.path, {
                    folder: 'news'
                });
                const news = yield news_ts_1.default.create({
                    newsImage: {
                        public_id: result.public_id,
                        url: result.secure_url,
                    },
                    newsTitle,
                    newsDescription,
                });
                if (!news) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, `Failed to create news`);
                }
                return (0, successmessage_ts_1.successmessage)(res, 201, `news posted successfully`, news);
            }
            catch (error) {
                console.error('Error occurred:', error);
                return (0, errormessage_ts_1.errormessage)(res, 500, `internal server error`);
            }
        });
    }
    static getAllNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield news_ts_1.default.find();
                if (news) {
                    return (0, successmessage_ts_1.successmessage)(res, 200, ` all News retrived`, news);
                }
                else {
                    return (0, errormessage_ts_1.errormessage)(res, 401, `failed to retrived`);
                }
            }
            catch (error) {
                console.log(`error is :`, error);
            }
        });
    }
    static getOneNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const news = yield news_ts_1.default.findById(id);
                if (news) {
                    return (0, successmessage_ts_1.successmessage)(res, 200, `data retrived successfully`, news);
                }
                else {
                    return (0, errormessage_ts_1.errormessage)(res, 401, `no data found`);
                }
            }
            catch (error) {
            }
        });
    }
    static deleteNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield news_ts_1.default.deleteMany();
                if (news) {
                    return (0, errormessage_ts_1.errormessage)(res, 201, `news deleted successfully`);
                }
                else {
                    return (0, errormessage_ts_1.errormessage)(res, 401, `news not deleted`);
                }
            }
            catch (error) {
            }
        });
    }
    static deleteOneNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsId = req.params.id;
                const news = yield news_ts_1.default.findByIdAndDelete(newsId);
                if (news) {
                    return (0, errormessage_ts_1.errormessage)(res, 201, `news deleted successfully`);
                }
                else {
                    return (0, errormessage_ts_1.errormessage)(res, 401, `news not deleted by ${newsId}`);
                }
            }
            catch (error) {
            }
        });
    }
    static updateNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsId = req.params.id;
                const news = yield news_ts_1.default.findByIdAndUpdate(newsId, req.body, { new: true });
                if (news) {
                    return (0, successmessage_ts_1.successmessage)(res, 200, `news successfully updated`, news);
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = newsController;
