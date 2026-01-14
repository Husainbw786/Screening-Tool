import dbConnect from "../lib/mongodb";
import Response from "../models/Response";
import Interview from "../models/Interview";
import mongoose from "mongoose";

const createResponse = async (payload: any) => {
  try {
    await dbConnect();
    
    // Convert interview_id to ObjectId if it's a string
    if (payload.interview_id && typeof payload.interview_id === 'string') {
      payload.interview_id = new mongoose.Types.ObjectId(payload.interview_id);
    }
    
    const data = await Response.create({ ...payload });
    
    return data._id.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saveResponse = async (payload: any, call_id: string) => {
  try {
    await dbConnect();
    
    const data = await Response.findOneAndUpdate(
      { call_id },
      { ...payload },
      { new: true }
    );
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllResponses = async (interviewId: string) => {
  try {
    await dbConnect();
    
    const data = await Response.find({
      interview_id: new mongoose.Types.ObjectId(interviewId),
      $or: [
        { details: null },
        { 'details.call_analysis': { $ne: null } }
      ],
      is_ended: true,
    }).sort({ created_at: -1 });

    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getResponseCountByOrganizationId = async (
  organizationId: string,
): Promise<number> => {
  try {
    await dbConnect();
    
    // First, find all interviews for this organization
    const interviews = await Interview.find({
      organization_id: new mongoose.Types.ObjectId(organizationId)
    }).select('_id');
    
    const interviewIds = interviews.map(interview => interview._id);
    
    // Then count all responses for these interviews
    const count = await Response.countDocuments({
      interview_id: { $in: interviewIds }
    });

    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getAllEmailAddressesForInterview = async (interviewId: string) => {
  try {
    await dbConnect();
    
    const data = await Response.find({
      interview_id: new mongoose.Types.ObjectId(interviewId)
    }).select('email');

    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getResponseByCallId = async (id: string) => {
  try {
    await dbConnect();
    
    const data = await Response.findOne({ call_id: id });

    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteResponse = async (id: string) => {
  try {
    await dbConnect();
    
    const data = await Response.findOneAndDelete({ call_id: id });
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateResponse = async (payload: any, call_id: string) => {
  try {
    await dbConnect();
    
    const data = await Response.findOneAndUpdate(
      { call_id },
      { ...payload },
      { new: true }
    );
    
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const ResponseService = {
  createResponse,
  saveResponse,
  updateResponse,
  getAllResponses,
  getResponseByCallId,
  deleteResponse,
  getResponseCountByOrganizationId,
  getAllEmails: getAllEmailAddressesForInterview,
};
