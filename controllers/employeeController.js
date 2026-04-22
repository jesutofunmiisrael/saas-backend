import { createEmployeeService,   getCompanyEmployeesService,
  updateEmployeeService, } from "../Services/EmployeeService.js";

  

export const createEmployee = async (req, res) => {
  try {
    const result = await createEmployeeService(req.body, req.user.companyId);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyEmployees = async (req, res) => {
  try {
    const employees = await getCompanyEmployeesService(req.user.companyId);

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await updateEmployeeService(
      req.params.id,
      req.body,
      req.user.companyId
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};