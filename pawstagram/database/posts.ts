import { Sql } from 'postgres';
import { Post } from '../migrations/00002-createTablePosts';

export const getPostById = async (
  sql: Sql,
  postId: number,
): Promise<Post | null> => {
  const post = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${postId}
  `;

  return post[0] || null;
};
