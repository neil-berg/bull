import * as mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  name: string;
}

const userSchema = new mongoose.Schema({
  name: String,
});

export const User = mongoose.model<UserDoc>('User', userSchema);
