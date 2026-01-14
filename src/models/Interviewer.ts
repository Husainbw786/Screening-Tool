import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewer extends Document {
  agent_id?: string;
  name: string;
  description: string;
  image: string;
  audio?: string;
  empathy: number;
  exploration: number;
  rapport: number;
  speed: number;
  created_at: Date;
}

const InterviewerSchema = new Schema<IInterviewer>({
  agent_id: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  audio: { type: String, required: false },
  empathy: { type: Number, required: true },
  exploration: { type: Number, required: true },
  rapport: { type: Number, required: true },
  speed: { type: Number, required: true },
  created_at: { type: Date, default: () => new Date() },
});

export default mongoose.models.Interviewer || mongoose.model<IInterviewer>('Interviewer', InterviewerSchema);
