import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()) // allows parse of req.body

console.log("MONGO_URI: ", ENV_VARS.MONGO_URI)

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT)
    connectDB();
})
