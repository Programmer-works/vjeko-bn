"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_ts_1 = __importDefault(require("../routes/userRoutes.ts"));
const newsRoutes_ts_1 = __importDefault(require("../routes/newsRoutes.ts"));
const memberRoutes_ts_1 = __importDefault(require("../routes/memberRoutes.ts"));
const router = express_1.default.Router();
router.use("/user", userRoutes_ts_1.default);
router.use("/news", newsRoutes_ts_1.default);
router.use("/member", memberRoutes_ts_1.default);
exports.default = router;
