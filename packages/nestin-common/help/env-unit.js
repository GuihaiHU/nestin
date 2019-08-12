"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
function fromatValue(key, defaultValue, callback) {
    const value = process.env[key];
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    return callback(value);
}
exports.envString = (key, defaultValue = '') => fromatValue(key, defaultValue, value => value);
exports.envNumber = (key, defaultValue = 0) => fromatValue(key, defaultValue, value => Number(value));
exports.envBoolean = (key, defaultValue = false) => fromatValue(key, defaultValue, value => value === 'true');
//# sourceMappingURL=env-unit.js.map