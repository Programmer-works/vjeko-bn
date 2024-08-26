"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_ts_1 = __importDefault(require("../middleware/cloudinary.ts"));
const memberController_ts_1 = __importDefault(require("../controller/memberController.ts"));
const router = express_1.default.Router();
router.post('/', cloudinary_ts_1.default.single('memberImage'), memberController_ts_1.default.createMember);
router.get('/', memberController_ts_1.default.getAllMember);
router.get('/:id', memberController_ts_1.default.getOneMember);
router.delete('/:id', memberController_ts_1.default.deleteMember);
router.delete('/', memberController_ts_1.default.deleteMembers);
router.put('/:id', memberController_ts_1.default.updateMember);
exports.default = router;
