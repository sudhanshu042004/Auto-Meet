import express from 'express';
import {  login, signup } from '../controllers/authController';
// routes/protectedRoute.ts


import { authenticateToken } from "../controllers/midlewareController";

const router = express.Router();

router.get("/profile", authenticateToken, (req, res) => {
  // @ts-ignore
  res.json({ message: "Welcome to your profile!", user: req.user });
});


// POST routes for form submission
router.post('/login', login);
router.post('/signup', signup);

export default router;