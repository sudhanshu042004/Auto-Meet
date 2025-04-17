import type { Request, Response } from "express";
import { db } from "../controllers/db"; // your drizzle db instance
import { summaries, transcripts, user } from "../schema/schema"; // your users schema
import { eq } from "drizzle-orm";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import { HumanMessage,SystemMessage } from "@langchain/core/messages"

const googleAPI = process.env.GOOGLE_API_KEY!

const model = new ChatGoogleGenerativeAI({
  model : "gemini-1.5-flash",
  temperature : 0,
  maxRetries : 2,
  apiKey : googleAPI
})

export const viewProfile = async (req: any, res: any) => {
  try {
    const allUsers = await db.select().from(user); // fetch all users
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const uploadTranscript = async (req: Request, res: Response) => {
  try {
    const { recording_id,transcript_text} = req.body;
    const  meeting_link = `https:meet.google.com/${recording_id}`

    const transcriptData = await db.insert(transcripts).values({
      meetingLink : meeting_link as string,
      transcriptText : transcript_text as string,
      
    })
     res.status(200).json({ message: "Transcript uploaded successfully", transcriptData });
     return
  } catch (error) {
    console.error("Error uploading transcript:", error);
     res.status(500).json({ message: "Internal Server Error", error });
     return
  }
}

export const getTranscript = async (req: Request, res: Response) => {
  try {
    
    const transcriptData = await db.select().from(transcripts);
    return res.status(200).json(transcriptData);
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}


export const summarizeTranscript = async (req: Request, res: Response) => {
  try {
    const { transcriptId } = req.body;
    const transcriptData = await db.select().from(transcripts).where(eq(transcripts.id, transcriptId));
    const transcriptText = transcriptData[0]! ;
    const summary = await summarize(transcriptText.transcriptText);
    const highlights = await highlightSummary(transcriptText.transcriptText);
    const summaryData = await db.insert(summaries).values({ 
      transcriptId : transcriptId,
      meetingLink : transcriptText.meetingLink,
      summary : summary,
      highlights : highlights
    })
    return res.status(200).json({ summaryData});
  } catch (error) {
    console.error("Error summarizing transcript:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

async function summarize(transcriptText: string) {
  const response = await model.invoke([
    new SystemMessage(`You are a helpful assistant that summarizes transcripts.`),
    new HumanMessage(transcriptText),
  ]);
  return response.content;
}

async function highlightSummary (transcriptText: string) {
  const response = await model.invoke([
    new SystemMessage(`You are a helpful assistant that highlights the most important points in a transcript.`),
    new HumanMessage(transcriptText),
  ]);
  return response.content;
}