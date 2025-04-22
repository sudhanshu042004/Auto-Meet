import *  as t from "drizzle-orm/pg-core"
import { pgTable as table } from "drizzle-orm/pg-core";
import { uuid, timestamp, text } from "drizzle-orm/pg-core";
 // assuming transcript table is defined

export const status = t.pgEnum("status", ["pending", "completed"]);

export const user = table("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 256 }).notNull(),
  email: t.varchar({ length: 256 }).notNull().unique(),
  password: t.varchar({ length: 256 }).notNull(),
  createdAt: t.date().defaultNow()
});


export const summaries = table("summaries", {
  id: uuid("id").primaryKey().defaultRandom(),
  transcriptId: uuid("transcript_id").references(() => transcripts.id),
  meetingId: uuid().references(() => meeting.id),
  summary: text().notNull(),
  highlights: text("highlights").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  createdBy: t.integer().references(() => user.id),
});
export const transcripts = table("transcripts", {
  id: uuid("transcript_id").primaryKey().defaultRandom(),
  meetingId: uuid().references(() => meeting.id),
  transcriptText: text("transcript_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  createdBy: t.integer().references(() => user.id),
});

export const meeting = table("meeting", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingId: text("meeting_id").notNull(),
  status: status().notNull().default("pending"),
  createdBy: t.integer().references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

