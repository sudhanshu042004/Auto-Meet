import express from "express";
import { uploadTranscript, viewProfile } from "../controllers/profileController";
import { authenticateToken } from "../controllers/midlewareController";
// import { authenticateToken } from "../middlewares/auth.middleware"; // optional

const userRoute = express.Router();

userRoute.get("/viewprofile",authenticateToken , viewProfile);
userRoute.post("/uploadtranscript" , uploadTranscript);
export default userRoute;
