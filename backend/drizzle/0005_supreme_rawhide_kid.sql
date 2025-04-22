ALTER TABLE "summaries" ADD COLUMN "meetingId" uuid;--> statement-breakpoint
ALTER TABLE "transcripts" ADD COLUMN "meetingId" uuid;--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transcripts" ADD CONSTRAINT "transcripts_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "meeting_link";--> statement-breakpoint
ALTER TABLE "transcripts" DROP COLUMN "meeting_link";