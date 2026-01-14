import dbConnect from "../lib/mongodb";
import Organization from "../models/Organization";
import User from "../models/User";
import mongoose from "mongoose";

const updateOrganization = async (payload: any, id: string) => {
  try {
    await dbConnect();
    
    const data = await Organization.findByIdAndUpdate(
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

const getClientById = async (
  id: string,
  email?: string | null,
  organization_id?: string | null,
) => {
  try {
    await dbConnect();
    
    let data = await User.findById(id);

    if (!data && email) {
      // Create new user if doesn't exist
      const newUser = await User.create({
        _id: id,
        email: email,
        organization_id: organization_id ? new mongoose.Types.ObjectId(organization_id) : undefined,
      });
      
      return newUser;
    }

    if (data && organization_id && data.organization_id?.toString() !== organization_id) {
      // Update organization_id if different (only if organization_id is provided)
      data = await User.findByIdAndUpdate(
        id,
        { organization_id: new mongoose.Types.ObjectId(organization_id) },
        { new: true }
      );
    } else if (data && !organization_id && data.organization_id) {
      // Clear organization_id if null is passed
      data = await User.findByIdAndUpdate(
        id,
        { organization_id: null },
        { new: true }
      );
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrganizationById = async (
  organization_id?: string,
  organization_name?: string,
) => {
  try {
    await dbConnect();
    
    let data = await Organization.findById(organization_id);

    if (!data && organization_id) {
      // Create new organization if doesn't exist
      const newOrg = await Organization.create({
        _id: new mongoose.Types.ObjectId(organization_id),
        name: organization_name,
      });
      
      return newOrg;
    }

    if (data && organization_name && data.name !== organization_name) {
      // Update name if different
      data = await Organization.findByIdAndUpdate(
        organization_id,
        { name: organization_name },
        { new: true }
      );
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const ClientService = {
  updateOrganization,
  getClientById,
  getOrganizationById,
};
