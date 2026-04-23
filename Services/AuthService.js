import bcrypt from "bcryptjs";
import User from "../MODEL/User.js";
import generateToken from "../Utils/generateToken.js";
import AppError from "../Utils/AppError.js";

export const loginSuperAdmin = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email, role: "superadmin" });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginCompanyAdmin = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email, role: "admin" });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
    companyId: user.companyId,
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    },
  };
};