import express from "express";
import { companyLogin, superAdminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/superadmin-login", superAdminLogin);
router.post("/company-login", companyLogin);

export default router;