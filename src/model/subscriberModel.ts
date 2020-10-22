import mongoose, { Document, Schema } from 'mongoose';

const subscriberSchema: Schema = new mongoose.Schema({
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

export interface SubscriberModel extends mongoose.Document {
  name: string,
  subscribedToChannel: string,
  date: Date,
}
// model is like an entity!
const Model = mongoose.model<SubscriberModel>('Subscriber', subscriberSchema)

export default Model
// ---

