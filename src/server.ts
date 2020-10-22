require('dotenv').config();
import express from 'express'
const app = express();
import mongoose from "mongoose";
// the string which is our database connection
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// this lets our server accepr json as body inside get-post request
app.use(express.json());

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
