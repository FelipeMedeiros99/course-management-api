import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UserService {
    constructor(
        @Inject('PG_CONNECTION') private readonly db: Pool,
    ) { }

    async findAll(): Promise<any[]> {
        try {
            const comando = 'SELECT * FROM usuario'
            const resultado = await this.db.query(comando);
            return resultado.rows;
        } catch (error) {

            throw new Error('Erro ao consultar usuários: ' + error.message);
        }
    }
}
