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
  birthDate: number,
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
        email
    `;
  return user;
};

export const getUserByEmail = async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user;
};
