import express from "express";
import {
  createEmployee,
  getCompanyEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { protect, companyOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, companyOnly, createEmployee);
router.get("/all", protect, companyOnly, getCompanyEmployees);
router.put("/update/:id", protect, companyOnly, updateEmployee)

export default router;