"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Invalid email",
            },
        ];
    }
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Username must be greater than 2 characthers",
            },
        ];
    }
    if (options.username.includes("@")) {
        return [{ field: "username", message: "Cannot include an @ symbol" }];
    }
    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "Password must be greater than 2 characthers",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map