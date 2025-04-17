import *  as t from "drizzle-orm/pg-core"
import { pgTable as table } from "drizzle-orm/pg-core";
import { uuid, timestamp, text } from "drizzle-orm/pg-core";
 // assuming transcript table is defined


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
  meetingLink: text("meeting_link").notNull(),
  summary: text("summary").notNull(),
  highlights: text("highlights").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  // createdBy: t.integer().references(() => user.id),
});
export const transcripts = table("transcripts", {
  id: uuid("id").primaryKey().defaultRandom(),
  meetingLink: text("meeting_link").notNull(),
  transcriptText: text("transcript_text").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  // createdBy: t.integer().references(() => user.id),
});
