import express from "express";
import { summarizeTranscript, viewProfile } from "../controllers/profileController";
import { authenticateToken } from "../controllers/midlewareController";
// import { authenticateToken } from "../middlewares/auth.middleware"; // optional

const userRoute = express.Router();

// userRoute.get('/getTranscript', getTranscript);
userRoute.get("/viewprofile", authenticateToken , viewProfile);
// userRoute.post("/uploadtranscript", uploadTranscript);  
// userRoute.post("/summarizetranscript", summarizeTranscript);  

export default userRoute;
