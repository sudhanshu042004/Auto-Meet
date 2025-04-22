import type { Request, Response } from "express";
import { meeting, summaries, transcripts } from "../schema/schema";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { HumanMessage,SystemMessage } from "@langchain/core/messages"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const googleAPI = process.env.GOOGLE_API_KEY!

const model = new ChatGoogleGenerativeAI({
  model : "gemini-1.5-flash",
  temperature : 2,
  maxRetries : 2,
  apiKey : googleAPI
})

interface CustomRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const createPendingTranscript = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.body;
    const userId = req.user?.userId;

    if (!meetingId) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const pendingTranscript = await db.insert(meeting).values({
      meetingId: meetingId,
      createdBy: userId
    });

    res.status(201).json({
      message: "Pending transcript created successfully",
      data: pendingTranscript
    });
  } catch (error) {
    console.error("Error creating pending transcript:", error);
    res.status(500).json({ 
      message: "Failed to create pending transcript",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getMeeting = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // const { meetingId } = req.params;
    const userId = req.user?.userId;

    // if (!meetingId) {
    //   res.status(400).json({ message: "Meeting ID is required" });
    //   return;
    // }

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    
    const meetingData = await db.select().from(meeting).where(eq(meeting.createdBy, userId));

    res.status(200).json({
      message: "Meeting retrieved successfully",
      data: meetingData
    });
  } catch (error) {
    console.error("Error retrieving meeting:", error);
    res.status(500).json({ message: "Failed to retrieve meeting" });
  }
}

export const getTranscript = async (req: CustomRequest, res: Response) => {
  try {
    const body = req.body;
    // console.log(body);
    const meetingId = body.meetingId;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    if (!meetingId) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }
    
    const transcriptData = await db.select().from(transcripts).where(
      and(
        eq(transcripts.meetingId, meetingId),
        eq(transcripts.createdBy, userId)
      )
    );

    if (!transcriptData || transcriptData.length === 0) {
      res.status(404).json({ message: "Transcript not found" });
      return;
    }

    res.status(200).json(transcriptData[0]);
  } catch (error) {
    console.error("Error fetching transcript:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const getSummary = async (req: CustomRequest, res: Response) => {
  try {
    const { meetingId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    if (!meetingId) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }
    
    const summaryData = await db.select().from(summaries).where(
      and(
        eq(summaries.meetingId, meetingId),
        eq(summaries.createdBy, userId)
      )
    );

    res.status(200).json(summaryData[0])
    
  }catch (error) {
    console.error("Error fetching transcript:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const uploadTranscript = async (req: CustomRequest, res: Response) => {
  try {
    const { recording_id,transcript_text,meetingId} = req.body;
    const userId = req.user?.userId;
    console.log(transcript_text)

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    if (!meetingId) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }

    // const  meeting_link = `https:meet.google.com/${recording_id}`

    const transcriptData:{ id: string; }[] = await db.insert(transcripts).values({
      meetingId : meetingId,
      transcriptText : transcript_text as string,
      createdBy : userId
    }).returning({id : transcripts.id})

    await db.update(meeting).set({
      status : "completed"
    }).where(eq(meeting.id, meetingId))

    const transcriptId = transcriptData?.[0]?.id;
    console.log(transcriptId)

    const summary = await summarize(transcript_text as string);
    const highlights = await highlightSummary(transcript_text as string);
    const summaryData = await db.insert(summaries).values({
      meetingId : meetingId,
      summary : summary,
      highlights : highlights,
      createdBy : userId,
      transcriptId : transcriptId
    })
    console.log(summaryData);

     res.status(200).json({ message: "Transcript uploaded successfully", transcriptData });
     return
  } catch (error) {
    console.error("Error uploading transcript:", error);
     res.status(500).json({ message: "Internal Server Error", error });
     return
  }
}


// export const summarizeTranscript = async (req: Request, res: Response) => {
//   try {
//     const { transcriptId } = req.body;
//     const transcriptData = await db.select().from(transcripts).where(eq(transcripts.id, transcriptId));
    
//     if (!transcriptData || transcriptData.length === 0) {
//       return res.status(404).json({ message: "Transcript not found" });
//     }

//     const transcriptText = transcriptData[0];
//     if (!transcriptText?.transcriptText) {
//       return res.status(400).json({ message: "Transcript text is missing" });
//     }

//     const summary = await summarize(transcriptText.transcriptText);
//     const highlights = await highlightSummary(transcriptText.transcriptText);

//     if (!summary || !highlights) {
//       return res.status(500).json({ message: "Failed to generate summary or highlights" });
//     }

//     const summaryData = await db.insert(summaries).values({ 
//       meetingId: transcriptText.meetingLink,
//       summary: summary,
//       highlights: highlights,
//       transcriptId: transcriptId
//     });

//     return res.status(200).json({ summaryData });
//   } catch (error) {
//     console.error("Error summarizing transcript:", error);
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// }

async function summarize(transcriptText: string): Promise<string> {
  try {
    console.log(transcriptText);
    const response = await model.invoke([
      new SystemMessage(`You are a helpful assistant that summarizes transcripts. Provide a concise summary of the key points.`),
      new HumanMessage(transcriptText),
    ]);
    console.log(response.content);
    return response.content as string;
  } catch (error) {
    console.error("Error in summarize function:", error);
    throw error;
  }
}

async function highlightSummary(transcriptText: string): Promise<string> {
  try {
    const response = await model.invoke([
      new SystemMessage(`You are a helpful assistant that highlights the most important points in a transcript. List the key highlights in bullet points`),
      new HumanMessage(transcriptText),
    ]);
    return response.content as string;
  } catch (error) {
    console.error("Error in highlightSummary function:", error);
    throw error;
  }
}

// export const gett = async (req: CustomRequest, res: Response) => {

export const chatWithAI = async (req: CustomRequest, res: Response) => {
  try {
    const { meetingId,query } = req.body;
    const transcriptData = await db.select().from(transcripts).where(eq(transcripts.meetingId, meetingId));

    if (!transcriptData || transcriptData.length === 0) {
      return res.status(404).json({ message: "Transcript not found" });
    }

    const transcriptText = transcriptData?.[0]?.transcriptText;
    if (!transcriptText) {
      return res.status(400).json({ message: "Transcript text is missing" });
    }

    const response = await model.invoke([
      new SystemMessage(`You are a helpful assistant that answers questions about a only related to the meeting. and the transcript is ${transcriptText}`),
      new HumanMessage(query),
    ]);

    return res.status(200).json({ response: response.content });
  } catch (error) {
    console.error("Error in chatWithAI function:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
