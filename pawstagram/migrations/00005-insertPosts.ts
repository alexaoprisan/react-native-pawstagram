import { Sql } from 'postgres';

const testPosts = [
  {
    user_id: 1,
    image_url: 'https://example.com/image1.jpg',
    image_description: 'This is the first image description.',
    date: new Date(), // Assuming current date and time for simplicity
  },
  {
    user_id: 1,
    image_url: 'https://example.com/image2.jpg',
    image_description: 'This is the second image description.',
    date: new Date(), // Assuming current date and time for simplicity
  },
];

export async function up(sql: Sql) {
  for (const testPost of testPosts) {
    await sql`
      INSERT INTO posts (user_id, image_url, image_description, date)
      VALUES
       (
        ${testPost.user_id},
        ${testPost.image_url},
        ${testPost.image_description},
        ${testPost.date})
    `;
  }
}

export async function down(sql: Sql) {
  for (const testPost of testPosts) {
    await sql`
      DELETE FROM posts
      WHERE id IN (SELECT id FROM posts WHERE user_id = ${testPost.user_id} LIMIT 1)
    `;
  }
}
