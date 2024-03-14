import { Sql } from 'postgres';

const testSessions = [
  {
    users_id: 1,
    session_token: 'abc123', // Example session token
    time_stamp: new Date(),
  },
  // Add more test session objects as needed
];

export async function up(sql: Sql) {
  for (const testSession of testSessions) {
    await sql`
      INSERT INTO sessions (users_id, session_token, time_stamp)
      VALUES
       (
        ${testSession.users_id},
        ${testSession.session_token},
        ${testSession.time_stamp})
    `;
  }
}

export async function down(sql: Sql) {
  for (const testSession of testSessions) {
    await sql`
      DELETE FROM sessions
      WHERE id IN (SELECT id FROM sessions WHERE users_id = ${testSession.users_id} LIMIT 1)
    `;
  }
}
