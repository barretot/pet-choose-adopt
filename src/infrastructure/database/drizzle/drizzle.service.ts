import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schemas'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool
  public readonly db: NodePgDatabase<typeof schema>

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
      max: 10,
    })

    this.db = drizzle(this.pool, { schema })
  }

  async onModuleInit() {
    try {
      await this.pool.connect()
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Error connecting to the database:', error)
      throw error
    }
  }

  async onModuleDestroy() {
    try {
      await this.pool.end()
      console.log('Database connection closed')
    } catch (error) {
      console.error('Error disconnecting from the database:', error)
    }
  }
}
