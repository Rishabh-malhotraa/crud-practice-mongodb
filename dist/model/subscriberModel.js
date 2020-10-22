"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subscriberSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedToChannel: {
        type: String,
        required: true,
    },
    subscribeDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});
// model is like an entity!
const Model = mongoose_1.default.model('Subscriber', subscriberSchema);
exports.default = Model;
// ---
//# sourceMappingURL=subscriberModel.js.map