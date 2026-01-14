import mongoose, { Schema, Document } from 'mongoose';

export interface IResponse extends Document {
  interview_id: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
  call_id?: string;
  candidate_status?: string;
  duration?: number;
  details?: any;
  analytics?: any;
  is_analysed: boolean;
  is_ended: boolean;
  is_viewed: boolean;
  tab_switch_count?: number;
  created_at: Date;
}

const ResponseSchema = new Schema<IResponse>({
  interview_id: { type: Schema.Types.ObjectId, ref: 'Interview', required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  call_id: { type: String, required: false },
  candidate_status: { type: String, required: false },
  duration: { type: Number, required: false },
  details: { type: Schema.Types.Mixed, required: false },
  analytics: { type: Schema.Types.Mixed, required: false },
  is_analysed: { type: Boolean, default: false },
  is_ended: { type: Boolean, default: false },
  is_viewed: { type: Boolean, default: false },
  tab_switch_count: { type: Number, required: false },
  created_at: { type: Date, default: () => new Date() },
});

// Add index for call_id which is frequently used for lookups
ResponseSchema.index({ call_id: 1 });
ResponseSchema.index({ interview_id: 1 });

export default mongoose.models.Response || mongoose.model<IResponse>('Response', ResponseSchema);
