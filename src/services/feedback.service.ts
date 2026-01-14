import dbConnect from "../lib/mongodb";
import Feedback from "../models/Feedback";
import mongoose from "mongoose";
import { FeedbackData } from "@/types/response";

const submitFeedback = async (feedbackData: FeedbackData) => {
  try {
    await dbConnect();
    
    // Convert interview_id to ObjectId if it's a string
    const payload: any = { ...feedbackData };
    if (payload.interview_id && typeof payload.interview_id === 'string') {
      payload.interview_id = new mongoose.Types.ObjectId(payload.interview_id);
    }
    
    const data = await Feedback.create(payload);
    
    return data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

export const FeedbackService = {
  submitFeedback,
};
