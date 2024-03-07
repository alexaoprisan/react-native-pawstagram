import { Sql } from 'postgres';

export type Session = {
  id: number;
  user_id: number;
  session_token: string;
  time_stamp: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE session (
      id SERIAL PRIMARY key,
      user_id INT REFERENCES users(id),
      session_token VARCHAR(255) UNIQUE NOT NULL,
      time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE session `;
}
