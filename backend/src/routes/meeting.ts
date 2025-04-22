import express from "express";
import { chatWithAI, createPendingTranscript, getMeeting, getSummary, getTranscript, uploadTranscript } from "../controllers/meetingController";
import { authenticateToken } from "../controllers/midlewareController";

const meetingRoute = express.Router();

// meetingRoute.post("/createMeeting", createMeeting);

meetingRoute.post("/create-pending", authenticateToken, createPendingTranscript);
meetingRoute.get("/getMeeting", authenticateToken, getMeeting);
meetingRoute.post("/getTranscript", authenticateToken, getTranscript);
meetingRoute.post("/uploadTranscript", authenticateToken, uploadTranscript);
meetingRoute.post("/getSummary", authenticateToken, getSummary);
meetingRoute.post("/chatWithAI", authenticateToken, chatWithAI);

export default meetingRoute;