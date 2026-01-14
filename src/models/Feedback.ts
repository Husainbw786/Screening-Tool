import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  interview_id: mongoose.Types.ObjectId;
  email?: string;
  feedback?: string;
  satisfaction?: number;
  created_at: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  interview_id: { type: Schema.Types.ObjectId, ref: 'Interview', required: true },
  email: { type: String, required: false },
  feedback: { type: String, required: false },
  satisfaction: { type: Number, required: false },
  created_at: { type: Date, default: () => new Date() },
});

// Add index for interview_id
FeedbackSchema.index({ interview_id: 1 });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
