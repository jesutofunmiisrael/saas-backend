import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./Config/Database.js"
import authRoutes from "./routes/authRoute.js";
import companyRoutes from "./routes/companyRoute.js"
import employeeRoutes from "./routes/employeeRoute.js";

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())

connectDB()

app.get("/", (req, res) =>{
    res.status(200).json({
        message:"Saas API is running"
    });

});

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
    
});

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes)
app.use("/api/employee", employeeRoutes);