ALTER TABLE "transcripts" DROP CONSTRAINT "transcripts_createdBy_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transcripts" DROP COLUMN "createdBy";