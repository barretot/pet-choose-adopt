ALTER TABLE "users" DROP CONSTRAINT "users_pet_adopted_id_pets_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "pet_adopted_id";--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_pet_owner_id_unique" UNIQUE("pet_owner_id");