ALTER TABLE "summaries" DROP CONSTRAINT "summaries_transcriptId_transcripts_id_fk";
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'summaries'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "summaries" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_id_transcripts_id_fk" FOREIGN KEY ("id") REFERENCES "public"."transcripts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "transcriptId";