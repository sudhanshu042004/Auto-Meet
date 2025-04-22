CREATE TYPE "public"."status" AS ENUM('pending', 'completed');--> statement-breakpoint
ALTER TABLE "pending_transcripts" ADD COLUMN "status" "status" DEFAULT 'pending' NOT NULL;