import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // ✅ make sure to return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = decoded;
    next(); // ✅ if everything is fine, move on
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
    return; // ✅ return to ensure no undefined is returned
  }
};
