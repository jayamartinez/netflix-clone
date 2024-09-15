import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "14d"});

    res.cookie("netflix-jwt",token, {
        maxAge: 14 * 24 * 60 * 60 * 1000, //  14 days in ms
        httpOnly:true, // prevents XXSS attacks not acccessible by JS
        sameSite:"strict",
        secure: ENV_VARS.NODE_ENV !== "development"
    })

    return token;
}