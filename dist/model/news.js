"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const newsSchema = new mongoose_1.default.Schema({
    newsTitle: {
        type: String,
        required: true
    },
    newsImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    newsDescription: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: new Date(Date.now()),
    },
});
const News = mongoose_1.default.model("News", newsSchema);
exports.default = News;
