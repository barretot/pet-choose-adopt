ALTER TABLE "users" ADD COLUMN "pet_adopted_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_pet_adopted_id_pets_id_fk" FOREIGN KEY ("pet_adopted_id") REFERENCES "public"."pets"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
