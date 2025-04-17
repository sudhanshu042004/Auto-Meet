CREATE TABLE "summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transcript_id" uuid NOT NULL,
	"meeting_link" text NOT NULL,
	"summary" text NOT NULL,
	"highlights" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transcripts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meeting_link" text NOT NULL,
	"transcript_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_transcript_id_transcripts_id_fk" FOREIGN KEY ("transcript_id") REFERENCES "public"."transcripts"("id") ON DELETE no action ON UPDATE no action;