import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Clerk user ID
  email?: string;
  organization_id?: mongoose.Types.ObjectId;
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  email: { type: String, required: false },
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: false },
  created_at: { type: Date, default: () => new Date() },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
