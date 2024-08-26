"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_ts_1 = __importDefault(require("../controller/newsController.ts"));
const cloudinary_ts_1 = __importDefault(require("../middleware/cloudinary.ts"));
const router = express_1.default.Router();
router.post('/', cloudinary_ts_1.default.single('newsImage'), newsController_ts_1.default.postNews);
router.get('/', newsController_ts_1.default.getAllNews);
router.get('/:id', newsController_ts_1.default.getOneNews);
router.delete('/:id', newsController_ts_1.default.deleteOneNews);
router.delete('/', newsController_ts_1.default.deleteNews);
router.put('/:id', newsController_ts_1.default.updateNews);
exports.default = router;
