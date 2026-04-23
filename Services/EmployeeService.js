import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../MODEL/User.js";
import Employee from "../MODEL/Employee.js";
import AppError from "../Utils/AppError.js";

const validateCompanyContext = (companyId) => {
  if (!companyId) {
    throw new AppError("Company context missing", 403);
  }
};

const validateEmployeePayload = ({ name, email, password }, requirePassword = true) => {
  if (!name || !email || (requirePassword && !password)) {
    throw new AppError("Missing required fields", 400);
  }
};

const validateEmployeeId = (employeeId) => {
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new AppError("Invalid employee ID", 400);
  }
};

export const createCompanyEmployee = async (payload, companyId) => {
  const { name, email, position, password } = payload;

  validateCompanyContext(companyId);
  validateEmployeePayload({ name, email, password });

  const existingUser = await User.findOne({ email, companyId });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const existingEmployee = await Employee.findOne({ email, companyId });
  if (existingEmployee) {
    throw new AppError("Employee already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "employee",
    companyId,
  });

  const employee = await Employee.create({
    name,
    email,
    position,
    companyId,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    },
    employee,
  };
};

export const getEmployeesByCompany = async (companyId) => {
  validateCompanyContext(companyId);

  return await Employee.find({ companyId });
};

export const updateCompanyEmployee = async (employeeId, payload, companyId) => {
  const { name, email, position } = payload;

  validateCompanyContext(companyId);
  validateEmployeeId(employeeId);

  const employee = await Employee.findOne({
    _id: employeeId,
    companyId,
  });

  if (!employee) {
    throw new AppError("Employee not found or access denied", 404);
  }

  employee.name = name ?? employee.name;
  employee.email = email ?? employee.email;
  employee.position = position ?? employee.position;

  await employee.save();

  return employee;
};