ALTER TABLE "summaries" DROP CONSTRAINT "summaries_createdBy_users_id_fk";
--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "createdBy";