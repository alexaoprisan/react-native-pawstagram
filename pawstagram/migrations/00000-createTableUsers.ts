import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: number;
  email: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY key generated always AS identity,
      userName varchar(30) NOT NULL,
      password_hash varchar(60) NOT NULL,
      birthDate DATE NOT NULL,
      email varchar(40) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
