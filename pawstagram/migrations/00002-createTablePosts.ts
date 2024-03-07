import { Sql } from 'postgres';

export type Post = {
  id: number;
  user_id: number;
  image_url: string;
  image_description: string | null;
  date: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE posts (
      id SERIAL PRIMARY key,
      user_id INT REFERENCES users(id),
      image_url VARCHAR(255) NOT NULL,
      image_description TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE posts `;
}
