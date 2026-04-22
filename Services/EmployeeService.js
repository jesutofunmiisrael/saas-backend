
import bcrypt from "bcryptjs";
import User from "../MODEL/User.js";
import Employee from "../MODEL/Employee.js"
import mongoose from "mongoose";

export const createEmployeeService = async (data, companyId) => {
  const { name, email, position, password } = data;

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  if (!companyId) {
    throw new Error("Company context missing");
  }

  const existingUser = await User.findOne({ email, companyId });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const existingEmployee = await Employee.findOne({ email, companyId });
  if (existingEmployee) {
    throw new Error("Employee already exists");
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


export const getCompanyEmployeesService = async (companyId) => {
  if (!companyId) {
    throw new Error("Company context missing");
  }

  const employees = await Employee.find({ companyId });
  return employees;
};

export const updateEmployeeService = async (id, data, companyId) => {
  const { name, email, position } = data;

  if (!companyId) {
    throw new Error("Company context missing");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid employee ID");
  }

  const employee = await Employee.findOne({
    _id: id,
    companyId,
  });

  if (!employee) {
    throw new Error("Employee not found or access denied");
  }

  employee.name = name ?? employee.name;
  employee.email = email ?? employee.email;
  employee.position = position ?? employee.position;

  await employee.save();

  return employee;
};