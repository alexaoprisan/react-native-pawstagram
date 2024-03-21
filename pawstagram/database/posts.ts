import { Post } from '../migrations/00002-createTablePosts';
import { sql } from './connect';

export const getPosts = async () => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id
        `;

  return posts;
};

export const gePostsById = async (id: string) => {
  const [post] = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${id}
  `;

  return post;
};
