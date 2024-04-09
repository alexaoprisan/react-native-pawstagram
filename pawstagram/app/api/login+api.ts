import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { getUserByUsername } from '../../database/users';

// Define the User type
type User = {
  userName: string;
  passwordHash: string;
};

// Define the loginSchema using zod
export const loginSchema = z.object({
  username: z.string(),
  passwordHash: z.string().min(8),
});

// Define the POST function to handle login requests
export async function POST(request: Request) {
  const body = await request.json();
  console.log('before z', body);

  // Parse the request body using the loginSchema
  const result = loginSchema.safeParse(body);
  console.log('after z', result);

  // Example commented out code for handling authentication and response
  /*
  if (!result.success) {
    return ExpoResponse.json(
      { errors: [{ message: 'test' }] },
      {
        status: 400,
      },
    );
  }

  const userWithPasswordHash = await getUserByUsername(result.data.username);
  console.log('user with password:', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'username or password not valid!' }],
      },
      { status: 403 },
    );
  }

  console.log('user with password:', userWithPasswordHash);

  return ExpoResponse.json({
    user: {
      username: userWithPasswordHash.userName,
    },
  });
  */

  // Example response without authentication
  return ExpoResponse.json({
    user: {
      username: 'userWithPasswordHash.userName',
    },
  });
}
