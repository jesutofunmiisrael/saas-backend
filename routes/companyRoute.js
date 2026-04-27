import express from "express"
import { createCompany, updateCompany } from "../controllers/companyController.js"
import { adminOnly, protect, superAdminOnly } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/create", protect, superAdminOnly, createCompany)
router.put("/update", protect, adminOnly, updateCompany);
export default router
