import type { Request, Response } from "express";
import { db } from "../controllers/db"; // your drizzle db instance
import { summaries, transcripts, user } from "../schema/schema"; // your users schema
import { eq } from "drizzle-orm";



export const viewProfile = async (req: any, res: any) => {
  try {
    const allUsers = await db.select().from(user); // fetch all users
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};