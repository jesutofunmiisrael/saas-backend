import Company from "../MODEL/Company.js";
import User from "../MODEL/User.js";
import bcrypt from "bcryptjs";

export const createCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if company user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // create company
    const company = await Company.create({
      name,
      createdBy: req.user._id,
    });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create company user (login account)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      companyId: company._id,
    });

    // link company to user
    company.ownerUserId = user._id;
    await company.save();

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};