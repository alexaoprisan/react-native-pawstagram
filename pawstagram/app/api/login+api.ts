import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { getUserByUsername } from '../../database/users';

type User = {
  userName: string;
  passwordHash: string;
};

export const loginSchema = z.object({
  username: z.string(),
  passwordHash: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log('before z', body);
  const result = loginSchema.safeParse(body);
  console.log('after z', result);

  // if (!result.success) {
  //   return ExpoResponse.json(
  //     { errors: [{ message: 'test' }] },
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  // const userWithPasswordHash = await getUserByUsername(result.data.username);
  // console.log('user with password:', userWithPasswordHash);

  // if (!userWithPasswordHash) {
  //   return ExpoResponse.json(
  //     {
  //       errors: [{ message: 'username or password not valid!' }],
  //     },
  //     { status: 403 },
  //   );
  // }

  // console.log('user with password:', userWithPasswordHash);

  // return ExpoResponse.json({
  //   user: {
  //     username: userWithPasswordHash.userName,
  //   },
  // });

  return ExpoResponse.json({
    user: {
      username: 'userWithPasswordHash.userName',
    },
  });
}
