import express from "express"
import { createCompany } from "../controllers/companyController.js"
import { protect, superAdminOnly } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/create", protect, superAdminOnly, createCompany)

export default router
