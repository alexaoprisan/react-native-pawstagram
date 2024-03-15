import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';

type User = {
  id: number;
  userName: string;
  passwordHash: string;
  birthDate: number;
  email: string;
};

export const loginSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(3),
});

export async function POST(request: Request) {
  const userData: User = await request.json();
  const validatedLogin = loginSchema.safeParse(userData);

  if (!validatedLogin.success) {
    return ExpoResponse.json(
      { errors: 'Email or password is wrong' },
      {
        status: 400,
      },
    );
  }
}
