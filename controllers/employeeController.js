import Employee from "../MODEL/Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, position } = req.body;

    const existingEmployee = await Employee.findOne({
      email,
      companyId: req.user.companyId,
    });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = await Employee.create({
      name,
      email,
      position,
      companyId: req.user.companyId,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ companyId: req.user.companyId });

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};