"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const express_validator_1 = require("express-validator");
const errormessage_ts_1 = require("../utilies/errormessage.ts");
class Validation {
    static inputValidator(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            errors.array().forEach((error) => {
                return (0, errormessage_ts_1.errormessage)(res, 401, error.msg);
            });
        }
        else {
            return next();
        }
    }
    static userAccountRule() {
        return [
            (0, express_validator_1.check)("fullname", "please correct your name").isString(),
            (0, express_validator_1.check)("email", "please correct your user name").isEmail(),
            (0, express_validator_1.check)("password", "please correct your strong password").isStrongPassword()
        ];
    }
}
exports.Validation = Validation;
