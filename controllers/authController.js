import {
  loginSuperAdmin,
  loginCompanyAdmin,
} from "../Services/AuthService.js";

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

export const superAdminLogin = async (req, res) => {
  try {
    const result = await loginSuperAdmin(req.body);
    return sendSuccess(res, 200, "Super admin login successful", result);
  } catch (error) {
    return sendError(res, error);
  }
};

export const companyLogin = async (req, res) => {
  try {
    const result = await loginCompanyAdmin(req.body);
    return sendSuccess(res, 200, "Company admin login successful", result);
  } catch (error) {
    return sendError(res, error);
  }
};