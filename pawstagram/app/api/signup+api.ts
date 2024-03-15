import { ExpoResponse } from 'expo-router/server';
import { createUser, getUserByEmail } from '../../database/users';

type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: number;
  email: string;
};

export async function POST(request: Request) {
  const userData: User = await request.json();
  const { userName, passwordHash, email, birthDate } = userData;

  const newUser = await createUser(userName, passwordHash, email, birthDate);
  console.log(newUser);
  if (!newUser) {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 },
    );
  }

  const user = await getUserByEmail(newUser.email);

  if (user) {
    return ExpoResponse.json(
      {
        errors: [{ message: 'username is already taken' }],
      },
      { status: 403 },
    );
  }
}
