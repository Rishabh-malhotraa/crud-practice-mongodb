"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const mongoose_1 = __importDefault(require("mongoose"));
// the string which is our database connection
console.log(process.env.DATABASE_URL);
mongoose_1.default.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
// this lets our server accepr json as body inside get-post request
app.use(express_1.default.json());
// routing the app
const subscribersRouter = require('./routes/subscriberRouter');
app.use('/subscribers', subscribersRouter);
app.listen(3000, () => {
    console.log('Listenting to port 3000!');
});
// ---- lets make your own thingy
/**
 * 1. Require mongoose
 * 2. connect mongoose to the URI, to take care of errors in console pass the required params
 * 3. db = mongoose.connection instabce
 */
//# sourceMappingURL=server.js.map