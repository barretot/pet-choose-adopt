import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { randomUUID } from 'node:crypto'

import { users } from './user-schema'

export const pets = pgTable('pets', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),

  petOwnerId: text('pet_owner_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const petsRelations = relations(pets, ({ one }) => {
  return {
    user: one(users, {
      fields: [pets.petOwnerId],
      references: [users.id],
      relationName: 'pet_owner',
    }),
  }
})
