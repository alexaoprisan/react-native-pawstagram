import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createPost, getPosts } from '../../database/posts';

type Post = {
  user_id: number;
  image_url: string;
  image_description: string | null;
};

const postSchema = z.object({
  userId: z.number(),
  imageUrl: z.string(),
  imageDescription: z.string().nullable(),
});

export async function POST(request: Request) {
  const body = await request.json();
  console.log('body:', body);
  const result = postSchema.safeParse(body);
  console.log('result:', result);

  if (!result.success) {
    return ExpoResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const newUser = await createPost(
    result.data.userId,
    result.data.imageUrl,
    result.data.imageDescription,
  );
  console.log('user:', newUser);

  if (!newUser) {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 },
    );
  }

  return ExpoResponse.json({
    success: true,
    post: newUser,
  });
}

export async function GET() {
  const showPosts = await getPosts();
  return ExpoResponse.json({ showPosts });
}
