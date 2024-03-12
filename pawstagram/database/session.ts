import { Session } from '../migrations/00001-createTableSession';
import { sql } from './connect';

export const getSession = async () => {
  const session = await sql<Session[]>`
    SELECT
      *
    FROM
      users
    ORDER BY
      id
  `;

  return session;
};
