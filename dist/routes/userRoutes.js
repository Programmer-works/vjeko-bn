"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_ts_1 = require("../controller/userController.ts");
const datachecker_ts_1 = require("../middleware/datachecker.ts");
const validation_ts_1 = require("../middleware/validation.ts");
const verifyAccess_ts_1 = __importDefault(require("../middleware/verifyAccess.ts"));
const router = express_1.default.Router();
router.post("/create", datachecker_ts_1.DataCheckers.userRegistIsEmpty, datachecker_ts_1.DataCheckers.emailExist, validation_ts_1.Validation.userAccountRule(), validation_ts_1.Validation.inputValidator, userController_ts_1.userController.createuser);
router.get("/get", (0, verifyAccess_ts_1.default)("admin"), userController_ts_1.userController.getusers);
router.get("/get/:id", userController_ts_1.userController.getOneUsers);
router.delete("/delete", (0, verifyAccess_ts_1.default)("admin"), userController_ts_1.userController.deleteusers);
router.delete("/delete/:id", (0, verifyAccess_ts_1.default)("admin"), userController_ts_1.userController.deleteOneUsers);
router.patch("/update/:id", (0, verifyAccess_ts_1.default)("admin"), datachecker_ts_1.DataCheckers.userRegistIsEmpty, userController_ts_1.userController.updateUsers);
router.post("/login", datachecker_ts_1.DataCheckers.userRegistIsEmpty, userController_ts_1.userController.Login);
exports.default = router;
