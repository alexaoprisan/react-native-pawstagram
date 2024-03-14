import { Sql } from 'postgres';

const testUsers = [
  {
    id: 1,
    userName: 'Tofu2023',
    passwordHash: 'password',
    birthDate: '05.03.2023'
    email: 'tofu@email.com',
  },
];

export async function up(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
    INSERT INTO users(username, password_hash, birthdate, email)
    VALUES
    (
      ${testUser.userName},
      ${testUser.passwordHash},
      ${testUser.birthDate},
    ${testUser.email}
    )
  `;
  }
}

export async function down(sql: Sql) {
  for (const testUser of testUsers) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${testUser.id}
    `;
  }
}
