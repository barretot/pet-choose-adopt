import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
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
      connectionString: this.configService.get<string>('DATABASE_URL', {
        infer: true,
      }),
      max: 10,
    })

    this.db = drizzle(this.pool, { schema })
  }

  async onModuleInit() {
    await this.pool.connect()
    Logger.log('Database connected successfully')
  }

  async onModuleDestroy() {
    await this.pool.end()

    Logger.log('Database connection closed')
  }
}
