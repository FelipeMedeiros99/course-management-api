import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from "dotenv";

dotenv.config()
const {LINK_DATABASE} = process.env

if(!LINK_DATABASE){
  throw new Error(`o link do banco está incorreto: ${LINK_DATABASE}`) 
}

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        connectionString: LINK_DATABASE,
        ssl: { rejectUnauthorized: false }
      }),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}
