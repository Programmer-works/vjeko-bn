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
exports.userController = void 0;
const user_ts_1 = require("../model/user.ts");
const errormessage_ts_1 = require("../utilies/errormessage.ts");
const successmessage_ts_1 = require("../utilies/successmessage.ts");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userController {
    static createuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullname, email, password, confirmpassword, role } = req.body;
            if (req.body.password !== req.body.confirmpassword) {
                return (0, errormessage_ts_1.errormessage)(res, 401, " please password and confrim password miss macth");
            }
            else {
                const hashpassword = bcrypt_1.default.hashSync(req.body.password, 10);
                const hashconfrim = bcrypt_1.default.hashSync(req.body.password, 10);
                try {
                    const user = yield user_ts_1.User.create({ fullname, email, password: hashpassword, confirmpassword: hashconfrim, role });
                    if (!user) {
                        return (0, errormessage_ts_1.errormessage)(res, 401, "no user found");
                    }
                    else {
                        return (0, successmessage_ts_1.successmessage)(res, 201, "user successfuly created", user);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_ts_1.User.findOne({ email });
            if (!user) {
                return (0, errormessage_ts_1.errormessage)(res, 401, 'Invalid email or password');
            }
            else {
                const comparepassword = bcrypt_1.default.compareSync(password, user.password);
                if (!comparepassword) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "Invalid email or password");
                }
                else {
                    const SCRET_KY = "franklin";
                    const token = jsonwebtoken_1.default.sign({ user: user }, SCRET_KY, { expiresIn: "1d" });
                    res.status(201).json({
                        token: token,
                        data: {
                            user: user
                        }
                    });
                }
            }
        });
    }
    static getusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_ts_1.User.find();
                if (!users) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "no user found in database");
                }
                else {
                    return (0, successmessage_ts_1.successmessage)(res, 200, `all ${users.length} users retrived`, users);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_ts_1.User.deleteMany();
                if (!users) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "no user found in database");
                }
                else {
                    return (0, successmessage_ts_1.successmessage)(res, 200, `all  users deleted`, null);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getOneUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const users = yield user_ts_1.User.findById(id);
                if (!users) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "no user found in database");
                }
                else {
                    return (0, successmessage_ts_1.successmessage)(res, 200, ` users on this id ${id} retrived`, users);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static deleteOneUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const users = yield user_ts_1.User.findByIdAndDelete(id);
                if (!users) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "no user found in database");
                }
                else {
                    return (0, successmessage_ts_1.successmessage)(res, 201, ` users on this id ${id} deleted`, null);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const users = yield user_ts_1.User.findByIdAndUpdate(id, req.body, { new: true });
                if (!users) {
                    return (0, errormessage_ts_1.errormessage)(res, 401, "no user found in database");
                }
                else {
                    return (0, successmessage_ts_1.successmessage)(res, 201, ` users on this id ${id} updated`, users);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.userController = userController;
