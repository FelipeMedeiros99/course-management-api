import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config()
const {LINK_DATABASE} = process.env
console.log(LINK_DATABASE)

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        connectionString: LINK_DATABASE
      }),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}
