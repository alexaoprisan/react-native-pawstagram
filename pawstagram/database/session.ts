import { Sql } from 'postgres';
import { Session } from '../migrations/00001-createTableSession';

export const getSessionByUserId = async (
  sql: Sql,
  userId: number,
): Promise<Session | null> => {
  const session = await sql<Session[]>`
    SELECT
      *
    FROM
      session
    WHERE
      user_id = ${userId}
  `;

  return session[0] || null;
};
