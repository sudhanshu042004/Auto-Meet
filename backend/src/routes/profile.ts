import express from "express";
import { viewProfile } from "../controllers/profileController";
import { authenticateToken } from "../controllers/midlewareController";
// import { authenticateToken } from "../middlewares/auth.middleware"; // optional

const userRoute = express.Router();

userRoute.get("/viewprofile",authenticateToken , viewProfile);

export default userRoute;
