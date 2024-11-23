import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { randomUUID } from 'node:crypto'

import { pets } from './pet-schema'
import { users } from './user-schema'

export const adoptions = pgTable('adoptions', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),

  petId: text('pet_id').references(() => pets.id, {
    onDelete: 'set null',
  }),

  userId: text('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const adoptsRelations = relations(adoptions, ({ one }) => {
  return {
    pet: one(pets, {
      fields: [adoptions.petId],
      references: [pets.id],
      relationName: 'pet_id',
    }),
    user: one(users, {
      fields: [adoptions.userId],
      references: [users.id],
      relationName: 'user_id',
    }),
  }
})
