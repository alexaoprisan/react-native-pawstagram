import { Sql } from 'postgres';
import { User } from '../migrations/00000-createTableUsers';

export const getUsers = async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
    ORDER BY
      id
  `;

  return users;
};
