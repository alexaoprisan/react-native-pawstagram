import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  birthdate: Date | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id SERIAL PRIMARY key,
      username VARCHAR(50) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      birthdate DATE
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
