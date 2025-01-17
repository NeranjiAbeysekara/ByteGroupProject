import profilemodel from "../models/userProfileModel.js";
import usermodel from "../models/usermodel.js";
import paymentmodel from "../models/paymentModel.js";
import studentProfileModel from "../models/studentProfileModel.js";

const userProfileController = async (req, res) => {
  const { medium ,scheme ,subject, degree, experience, aboutme, email, id  } =
    req.body;

  if (!medium || !scheme ||!subject || !experience || !aboutme || !email ) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }

  const olduser = await profilemodel.findOne({ email ,subject , medium });

  if (olduser) {
    return res
      .status(403)
      .json({ success: false, msg: "Already filled the Fields " });
  }

  try {
    const newprofile = new profilemodel({
      medium,
      scheme,
      subject,
      degree,
      experience,
      aboutme,
      email,
      id,
    });

    await newprofile.save();
    return res
      .status(200)
      .json({ success: true, msg: "Profile details uploaded successfully" });
  } catch (error) {
    console.error("An error has occured !", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Sever Error" });
  }
};

const userDetailsController = async (req, res) => {
  try {
    const fetchID = req.params.userID;
    const user = await usermodel.findById(fetchID);
    return res.json(user);
  } catch (error) {
    return res.json("An error occurred");
  }
};

const userOtherDetailsController = async (req, res) => {
  try {
    const id = req.params.userID;
    const details = await profilemodel.findOne({ id });
    if(details){
      return res.json(details);
    };
    
  } catch (error) {
    return res.json("Error getting user details");
  }
};

const paymentDetailsController = async (req,res) => {
  const { bank, accountNo, id } = req.body;
  if( !bank || !accountNo){
    return res
         .json({success: false, msg:"Missing something"});
  }
  try{
    const paymentDetails = new paymentmodel({
      id,
      bank,
      accountNo,
    });
    await paymentDetails.save();
    return res
       .json({success: true, msg: "Saved successfully"});
  } catch (error) {
    return res
      .json({ success: false, msg: "Internal Sever Error" });
  }
}

const fetchPaymentDetailsController = async (req, res) => {
  try {
    const id = req.params.userID;
    const details = await paymentmodel.findOne({ id });
    if(details){
      return res.json(details);
    };
    
  } catch (error) {
    return res.json("Error getting user details");
  }
};

const studentParentDetailsController = async (req,res) => {
  const {name, email, mobileNo, uEmail, id } = req.body;

  if(!name||!email||!mobileNo){
    return res .status(400).json({ success: false, msg: "Please fill all the fields" });
  }

  try{
    const parentDetails = new studentProfileModel({
      name,
      email, 
      mobileNo,
      uEmail,
      id
    });
    await parentDetails.save();
    return res
      .status(200)
      .json({ success: true, msg: "Guardian details uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Sever Error" });
  }
  
}


export {
  userProfileController,
  userDetailsController,
  userOtherDetailsController,
  paymentDetailsController,
  fetchPaymentDetailsController,
  studentParentDetailsController
};
