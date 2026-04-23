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
    company,
    admin: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    },
  };
};