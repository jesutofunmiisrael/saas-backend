import {
  createCompanyEmployee,
  getEmployeesByCompany,
  updateCompanyEmployee,
} from "../Services/EmployeeService.js";

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

export const createEmployee = async (req, res) => {
  try {
    const result = await createCompanyEmployee(req.body, req.user.companyId);
    return sendSuccess(res, 201, "Employee created successfully", result);
  } catch (error) {
    return sendError(res, error);
  }
};

export const getCompanyEmployees = async (req, res) => {
  try {
    const employees = await getEmployeesByCompany(req.user.companyId);
    return sendSuccess(res, 200, "Employees fetched successfully", employees);
  } catch (error) {
    return sendError(res, error);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await updateCompanyEmployee(
      req.params.id,
      req.body,
      req.user.companyId
    );

    return sendSuccess(res, 200, "Employee updated successfully", employee);
  } catch (error) {
    return sendError(res, error);
  }
};