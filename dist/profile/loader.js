"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProfile = void 0;
const defaults_1 = require("./defaults");
const loadProfile = (profile) => {
    if (!profile || profile === 'enabled') {
        return defaults_1.ENABLED_PROFILE;
    }
    else if (profile === 'disabled') {
        return defaults_1.DISABLED_PROFILE;
    }
    else {
        return profile;
    }
};
exports.loadProfile = loadProfile;
