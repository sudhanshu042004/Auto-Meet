ALTER TABLE "summaries" DROP CONSTRAINT "summaries_id_transcripts_id_fk";
--> statement-breakpoint
ALTER TABLE "summaries" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "summaries" ADD COLUMN "transcript_id" uuid;--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_transcript_id_transcripts_id_fk" FOREIGN KEY ("transcript_id") REFERENCES "public"."transcripts"("id") ON DELETE no action ON UPDATE no action;