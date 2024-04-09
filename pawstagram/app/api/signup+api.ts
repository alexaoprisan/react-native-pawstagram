import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../database/users';

// Define the User type
type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: string;
  email: string;
};

// Define the signupSchema using zod
const signupSchema = z.object({
  username: z.string(),
  passwordHash: z.string().min(8),
  birthdate: z.string(),
  email: z.string().email(),
});

// Handle POST requests to create a new user
export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  // Parse the request body using the signupSchema
  const result = signupSchema.safeParse(body);
  console.log(result);
  // const { email, passwordHash, firstName, lastName } = body;

  // If validation fails, return errors with status code 400
  if (!result.success) {
    return ExpoResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // Check if the username is already taken
  const user = await getUserByUsername(result.data.username);

  // If username is already taken, return error response with status code 403
  if (user) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'Username is already taken' }],
      },
      { status: 403 },
    );
  }

  // Create a new user using the validated data
  const newUser = await createUser(
    result.data.username,
    result.data.passwordHash,
    result.data.birthdate,
    result.data.email,
  );
  console.log(newUser);

  // If creation fails, return error response with status code 500
  if (!newUser) {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 },
    );
  }

  // Return success response with the created user
  return ExpoResponse.json({
    user: newUser,
  });
}
