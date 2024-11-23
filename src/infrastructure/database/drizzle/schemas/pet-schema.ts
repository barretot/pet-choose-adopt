import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { randomUUID } from 'node:crypto'

export const pets = pgTable('pets', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
})
