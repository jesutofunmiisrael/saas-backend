import Employee from "../MODEL/Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, position } = req.body;

    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(403).json({
        message: "Access denied: company context missing",
      });
    }

    const existingEmployee = await Employee.findOne({
      email,
      companyId,
    });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const employee = await Employee.create({
      name,
      email,
      position,
      companyId,
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
    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(403).json({
        message: "Access denied: company context missing",
      });
    }

    const employees = await Employee.find({ companyId });

    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position } = req.body;

    const companyId = req.user.companyId;

    if (!companyId) {
      return res.status(403).json({
        message: "Access denied: company context missing",
      });
    }

    // Secure lookup: employee must belong to authenticated company
    const employee = await Employee.findOne({
      _id: id,
      companyId,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found or access denied",
      });
    }

    employee.name = name ?? employee.name;
    employee.email = email ?? employee.email;
    employee.position = position ?? employee.position;

    await employee.save();

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};