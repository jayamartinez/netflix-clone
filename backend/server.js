import express from 'express'
import dotenv from 'dotenv'
import { authRoutes, movieRoutes, tvRoutes, searchRoutes } from './routes/index.js'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json()) // allows parse of req.body
app.use(cookieParser());

console.log("MONGO_URI: ", ENV_VARS.MONGO_URI)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)

if (ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get("*", (req, res) => {
        res.sendFile9(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}



app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT)
    connectDB();
})

