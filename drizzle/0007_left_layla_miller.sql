ALTER TABLE "adopts" RENAME TO "adoptions";--> statement-breakpoint
ALTER TABLE "adoptions" DROP CONSTRAINT "adopts_pet_id_pets_id_fk";
--> statement-breakpoint
ALTER TABLE "adoptions" DROP CONSTRAINT "adopts_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
