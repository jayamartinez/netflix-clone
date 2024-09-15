import express from 'express'
import dotenv from 'dotenv'
import { authRoutes, movieRoutes, tvRoutes, searchRoutes } from './routes/index.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()) // allows parse of req.body
app.use(cookieParser());

console.log("MONGO_URI: ", ENV_VARS.MONGO_URI)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)


app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT)
    connectDB();
})

