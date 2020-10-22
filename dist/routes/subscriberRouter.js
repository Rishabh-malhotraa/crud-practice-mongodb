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
const express_1 = __importDefault(require("express"));
const subscriberModel_1 = __importDefault(require("../model/subscriberModel"));
const router = express_1.default.Router();
const getSubscriber = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let subscriber;
    try {
        subscriber = yield subscriberModel_1.default.findById(req.params.id);
        if (subscriber === undefined)
            return res.status(404).json('Cannot find Subscriber');
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.subscriber = subscriber;
    next();
});
// Getting all
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriber = yield subscriberModel_1.default.find();
        res.json(subscriber);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// delete all
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriber = yield subscriberModel_1.default.remove({});
        res.json('Deleted all USERS');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Getting One
// @parames :{}
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});
// Creating one
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = new subscriberModel_1.default({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = yield subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Updating one
router.patch('/:id', getSubscriber, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // we only want to change the thing that are send by the user
    if (req.body.name !== null)
        res.subscriber.name = req.body.name;
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = yield res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Deleting One
router.delete('/:id', getSubscriber, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.subscriber.remove();
        res.json({ message: 'Deleted Subscriber' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
// creating middleware
module.exports = router;
//# sourceMappingURL=subscriberRouter.js.map