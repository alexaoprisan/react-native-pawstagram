import { Post } from '../migrations/00002-createTablePosts';
import { sql } from './connect';

export const getPosts = async () => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
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

export const createPost = async (
  user_id: number,
  image_url: string,
  image_description: string | null,
) => {
  const [post] = await sql<Post[]>`
    INSERT INTO
      posts(user_id, image_url, image_description)
    VALUES
      (${user_id}, ${image_url}, ${image_description})
    RETURNING
      id,
      user_id,
      image_url,
      image_description,
      date
  `;
  return post;
};
