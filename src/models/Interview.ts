import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  name?: string;
  description?: string;
  objective?: string;
  organization_id?: mongoose.Types.ObjectId;
  user_id?: string;
  interviewer_id?: mongoose.Types.ObjectId;
  is_active: boolean;
  is_anonymous: boolean;
  is_archived: boolean;
  logo_url?: string;
  theme_color?: string;
  url?: string;
  readable_slug?: string;
  questions?: any; // JSONB equivalent
  quotes?: any[]; // Array of JSONB
  insights?: string[];
  respondents?: string[];
  question_count?: number;
  response_count?: number;
  time_duration?: string;
  created_at: Date;
}

const InterviewSchema = new Schema<IInterview>({
  name: { type: String, required: false },
  description: { type: String, required: false },
  objective: { type: String, required: false },
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: false },
  user_id: { type: String, ref: 'User', required: false },
  interviewer_id: { type: Schema.Types.ObjectId, ref: 'Interviewer', required: false },
  is_active: { type: Boolean, default: true },
  is_anonymous: { type: Boolean, default: false },
  is_archived: { type: Boolean, default: false },
  logo_url: { type: String, required: false },
  theme_color: { type: String, required: false },
  url: { type: String, required: false },
  readable_slug: { type: String, required: false },
  questions: { type: Schema.Types.Mixed, required: false },
  quotes: [{ type: Schema.Types.Mixed, required: false }],
  insights: [{ type: String, required: false }],
  respondents: [{ type: String, required: false }],
  question_count: { type: Number, required: false },
  response_count: { type: Number, required: false },
  time_duration: { type: String, required: false },
  created_at: { type: Date, default: () => new Date() },
});

// Add indexes for frequently queried fields
InterviewSchema.index({ organization_id: 1, user_id: 1 });
InterviewSchema.index({ readable_slug: 1 });

export default mongoose.models.Interview || mongoose.model<IInterview>('Interview', InterviewSchema);
