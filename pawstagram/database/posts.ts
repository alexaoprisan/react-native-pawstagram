import { Post } from '../migrations/00002-createTablePosts';
import { sql } from './connect';

export const getPosts = async () => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      users
    ORDER BY
      id
  `;

  return posts;
};
