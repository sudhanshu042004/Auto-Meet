ALTER TABLE "summaries" DROP CONSTRAINT "summaries_transcript_id_transcripts_id_fk";
--> statement-breakpoint
ALTER TABLE "summaries" ADD COLUMN "transcriptId" integer;--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_transcriptId_transcripts_id_fk" FOREIGN KEY ("transcriptId") REFERENCES "public"."transcripts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "transcript_id";