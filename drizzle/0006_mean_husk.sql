ALTER TABLE "pets" DROP CONSTRAINT "pets_pet_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "pets" DROP COLUMN IF EXISTS "pet_owner_id";