import profileSchema from "../models/userProfileModel.js";

const getregisterdesubject = async(req,res) => {
  try{
    const registedsubjects = await profileSchema.find();
    return res.status(200).json({success:true, data:registedsubjects});
  }catch(error){
    return res.status(500).json({success:false,msg:"Internal Server Error"});
  }
   
};

export {getregisterdesubject};