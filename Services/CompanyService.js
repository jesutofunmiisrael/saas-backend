import bcrypt from "bcryptjs";
import Company from "../MODEL/Company.js";
import User from "../MODEL/User.js";
import AppError from "../Utils/AppError.js";



export const createCompanyAccount = async (payload, createdBy) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    throw new AppError("Missing required fields", 400);
  }

  if (!createdBy) {
    throw new AppError("Creator context missing", 403);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Company already exists", 409);
  }

 const company = await Company.create({
  name,
  email,
  createdBy,
});
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    companyId: company._id,
  });

  company.ownerUserId = user._id;
  await company.save();

return {
  company: {
    id: company._id,
    name: company.name,
    email: company.email,
  },
  admin: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
  },
};
};





export const updateCompanyProfile = async (payload, companyId) => {
  const { name, email, description } = payload;

  if (!companyId) {
    throw new AppError("Company context missing", 403);
  }

  if (!name || !email) {
    throw new AppError("Name and email are required", 400);
  }

  const company = await Company.findById(companyId);

  if (!company) {
    throw new AppError("Company not found", 404);
  }

  company.name = name;
  company.email = email;
  company.description = description ?? company.description;

  await company.save();

  return {
    id: company._id,
    name: company.name,
    email: company.email,
    description: company.description,
  };
};