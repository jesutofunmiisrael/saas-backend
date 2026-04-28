import { createCompanyAccount } from "../Services/CompanyService.js";
import { updateCompanyProfile } from "../Services/CompanyService.js";



const sendSuccess = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const createCompany = async (req, res) => {
  try {
    const result = await createCompanyAccount(req.body, req.user._id);
    return sendSuccess(res, 201, "Company created successfully", result);
  } catch (error) {
    return sendError(res, error);
  }
};



export const updateCompany = async (req, res) => {
  try {
    const result = await updateCompanyProfile(
      req.body,
      req.user.companyId
    );

    return res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      data: result,
    });
  } catch (error) {
    // Handle MongoDB duplicate key error
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};