ALTER TABLE "pending_transcripts" RENAME TO "meeting";--> statement-breakpoint
ALTER TABLE "meeting" DROP CONSTRAINT "pending_transcripts_createdBy_users_id_fk";
--> statement-breakpoint
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;