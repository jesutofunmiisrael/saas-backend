import { createCompanyAccount } from "../Services/CompanyService.js";

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