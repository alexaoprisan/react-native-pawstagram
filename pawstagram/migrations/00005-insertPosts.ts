import { Sql } from 'postgres';

const testPosts = [
  {
    user_id: 1,
    image_url:
      'https://image.petmd.com/files/styles/978x550/public/2023-09/black-cat-breeds.jpg?w=2048&q=75',
    image_description: 'Cutiepie.',
    date: new Date(), // Assuming current date and time for simplicity
  },
  {
    user_id: 1,
    image_url:
      'https://image.petmd.com/files/inline-images/black-cat-breeds-american-shorthair.jpeg?VersionId=FHXiYOmOykNtIdlZ.V5LQC_E8wXzlgyG',
    image_description: 'Enjoying a treat',
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
