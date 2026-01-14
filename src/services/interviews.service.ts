import dbConnect from "../lib/mongodb";
import Interview from "../models/Interview";
import mongoose from "mongoose";

const getAllInterviews = async (userId: string, organizationId: string) => {
  try {
    await dbConnect();
    
    console.log('getAllInterviews called with:', { userId, organizationId });
    
    const query: any = {
      $or: [
        { user_id: userId }
      ]
    };

    // Add organization_id to query if provided and valid
    if (organizationId && mongoose.Types.ObjectId.isValid(organizationId)) {
      query.$or.push({ organization_id: new mongoose.Types.ObjectId(organizationId) });
    }
    
    console.log('Query:', JSON.stringify(query));
    
    const data = await Interview.find(query).sort({ created_at: -1 }).lean();
    
    console.log('Found interviews:', data.length);

    // Transform _id to id for frontend compatibility
    return data.map(interview => ({
      ...interview,
      id: interview._id.toString(),
    })) || [];
  } catch (error) {
    console.log('Error in getAllInterviews:', error);
    return [];
  }
};

const getInterviewById = async (id: string) => {
  try {
    await dbConnect();
    
    // Try to find by readable_slug first, then by _id
    let data = await Interview.findOne({ readable_slug: id }).lean();
    
    if (!data) {
      data = await Interview.findById(id).lean();
    }

    if (!data) return null;

    // Transform _id to id for frontend compatibility
    return {
      ...data,
      id: data._id.toString(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateInterview = async (payload: any, id: string) => {
  try {
    await dbConnect();
    
    const data = await Interview.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true }
    );
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteInterview = async (id: string) => {
  try {
    await dbConnect();
    
    const data = await Interview.findByIdAndDelete(id);
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllRespondents = async (interviewId: string) => {
  try {
    await dbConnect();
    
    const data = await Interview.findById(interviewId).select('respondents');
    
    return data?.respondents || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createInterview = async (payload: any) => {
  try {
    await dbConnect();
   console.log('Creating interview with payload:', {
      user_id: payload.user_id,
      organization_id: payload.organization_id,
      interviewer_id: payload.interviewer_id,
      name: payload.name
    });
    
    // Convert string IDs to ObjectIds if needed
    if (payload.organization_id && typeof payload.organization_id === 'string') {
      payload.organization_id = new mongoose.Types.ObjectId(payload.organization_id);
    }
    if (payload.interviewer_id && typeof payload.interviewer_id === 'string') {
      payload.interviewer_id = new mongoose.Types.ObjectId(payload.interviewer_id);
    }
    
    const data = await Interview.create({ ...payload });
    
    console.log('Interview created successfully with _id:', data._id);
    
    return data;
  } catch (error) {
    console.log('Error creating interview:', error);
    return null;
  }
};

const deactivateInterviewsByOrgId = async (organizationId: string) => {
  try {
    await dbConnect();
    
    await Interview.updateMany(
      { 
        organization_id: new mongoose.Types.ObjectId(organizationId),
        is_active: true 
      },
      { is_active: false }
    );
  } catch (error) {
    console.error("Unexpected error disabling interviews:", error);
  }
};

export const InterviewService = {
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getAllRespondents,
  createInterview,
  deactivateInterviewsByOrgId,
};
