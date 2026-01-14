import dbConnect from "../lib/mongodb";
import Interviewer from "../models/Interviewer";

const getAllInterviewers = async (clientId: string = "") => {
  try {
    await dbConnect();
    
    const data = await Interviewer.find({}).lean();

    // Transform _id to id for frontend compatibility
    return data.map(interviewer => ({
      ...interviewer,
      id: interviewer._id.toString(),
    })) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createInterviewer = async (payload: any) => {
  try {
    await dbConnect();
    
    // Check for existing interviewer with the same name and agent_id
    const existingInterviewer = await Interviewer.findOne({
      name: payload.name,
      agent_id: payload.agent_id,
    });

    if (existingInterviewer) {
      console.error("An interviewer with this name already exists");
      return null;
    }

    const data = await Interviewer.create({ ...payload });

    return data;
  } catch (error) {
    console.error("Error creating interviewer:", error);
    return null;
  }
};

const getInterviewer = async (interviewerId: bigint | string) => {
  try {
    await dbConnect();
    
    const data = await Interviewer.findById(interviewerId.toString()).lean();

    if (!data) return null;

    // Transform _id to id for frontend compatibility
    return {
      ...data,
      id: data._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching interviewer:", error);
    return null;
  }
};

export const InterviewerService = {
  getAllInterviewers,
  createInterviewer,
  getInterviewer,
};
