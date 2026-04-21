import express from "express";
import {
  createEmployee,
  getCompanyEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { protect, companyOnly, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createEmployee);
router.get("/all", protect, companyOnly, getCompanyEmployees);
router.put("/update/:id", protect, adminOnly, updateEmployee);

export default router;