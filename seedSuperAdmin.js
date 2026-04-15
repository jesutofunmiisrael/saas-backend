import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./Config/Database.js";
import User from "./MODEL/User.js";

dotenv.config();



const seedSuperAdmin = async () => {
  try {
    await connectDB();

    await User.deleteOne({ email: "admin@example.com" });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Super admin created:", user.email);
    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};



seedSuperAdmin();