import { sql } from './connect';

type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: number;
  email: string;
};

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

export const createUser = async (
  userName: string,
  passwordHash: string,
  birthDate: string,
  email: string,
) => {
  const [user] = await sql<User[]>`
       INSERT INTO
       users(userName, password_hash, birthDate, email)
      VALUES
        (
      ${userName},
      ${passwordHash},
      ${birthDate},
      ${email}
        )
      RETURNING
        id,
        userName
    `;
  return user;
};

export const getUserByUsername = async (userName: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      userName
    FROM
      users
    WHERE
      userName = ${userName}
  `;
  return user;
};
