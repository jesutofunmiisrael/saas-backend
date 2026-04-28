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

  // Validate company context
  if (!companyId) {
    throw new AppError("Company context missing", 403);
  }

  // Normalize inputs
  const nameNormalized = name?.trim();
  const emailNormalized = email?.trim().toLowerCase();

  
  if (!nameNormalized || !emailNormalized) {
    throw new AppError("Name and email are required", 400);
  }

  // Check if company exists
  const company = await Company.findById(companyId);
  if (!company) {
    throw new AppError("Company not found", 404);
  }

  // Check email uniqueness (excluding current company)
  const existingCompany = await Company.findOne({ email: emailNormalized });
  if (
    existingCompany &&
    existingCompany._id.toString() !== companyId.toString()
  ) {
    throw new AppError("Email already in use", 409);
  }

  // Update fields
  company.name = nameNormalized;
  company.email = emailNormalized;
  company.description =
    description?.trim() ?? company.description;

  await company.save();

  // Return clean response
  return {
    id: company._id,
    name: company.name,
    email: company.email,
    description: company.description,
  };
};