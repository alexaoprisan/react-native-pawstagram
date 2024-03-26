import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../database/users';

type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: string;
  email: string;
};

const signupSchema = z.object({
  username: z.string(),
  passwordHash: z.string().min(8),
  birthdate: z.string(),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const result = signupSchema.safeParse(body);
  console.log(result);
  // const { email, passwordHash, firstName, lastName } = body;

  if (!result.success) {
    return ExpoResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'Username is already taken' }],
      },
      { status: 403 },
    );
  }

  const newUser = await createUser(
    result.data.username,
    result.data.passwordHash,
    result.data.birthdate,
    result.data.email,
  );
  console.log(newUser);
  if (!newUser) {
    //   return ExpoResponse.json({ success: true, user: newUser });
    // } else {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 },
    );
  }

  return ExpoResponse.json({
    user: newUser,
  });
}
