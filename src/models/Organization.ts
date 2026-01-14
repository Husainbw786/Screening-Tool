import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name?: string;
  image_url?: string;
  allowed_responses_count?: number;
  plan?: 'free' | 'pro' | 'free_trial_over';
  created_at: Date;
}

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, required: false },
  image_url: { type: String, required: false },
  allowed_responses_count: { type: Number, required: false },
  plan: {
    type: String,
    enum: ['free', 'pro', 'free_trial_over'],
    required: false,
  },
  created_at: { type: Date, default: () => new Date() },
});

export default mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);
