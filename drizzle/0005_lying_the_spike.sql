CREATE TABLE IF NOT EXISTS "adopts" (
	"id" text PRIMARY KEY NOT NULL,
	"pet_id" text,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_pet_adopted_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_pet_adopted_id_pets_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adopts" ADD CONSTRAINT "adopts_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adopts" ADD CONSTRAINT "adopts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "pet_adopted_id";