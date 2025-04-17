ALTER TABLE "summaries" ADD COLUMN "createdBy" integer;--> statement-breakpoint
ALTER TABLE "transcripts" ADD COLUMN "createdBy" integer;--> statement-breakpoint
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transcripts" ADD CONSTRAINT "transcripts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "created_by";--> statement-breakpoint
ALTER TABLE "transcripts" DROP COLUMN "created_by";