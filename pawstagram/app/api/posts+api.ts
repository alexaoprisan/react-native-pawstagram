import { ExpoResponse } from 'expo-router/server';
import { z } from 'zod';
import { createPost, getPosts } from '../../database/posts';

// Define the Post type
type Post = {
  user_id: number;
  image_url: string;
  image_description: string | null;
};

// Define the postSchema using zod
const postSchema = z.object({
  userId: z.number(),
  imageUrl: z.string(),
  imageDescription: z.string().nullable(),
});

// Handle POST requests to create a new post
export async function POST(request: Request) {
  const body = await request.json();
  console.log('body:', body);

  // Parse the request body using the postSchema
  const result = postSchema.safeParse(body);
  console.log('result:', result);

  // If validation fails, return errors with status code 400
  if (!result.success) {
    return ExpoResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // Create a new post using the validated data
  const newPost = await createPost(
    result.data.userId,
    result.data.imageUrl,
    result.data.imageDescription,
  );
  console.log('post:', newPost);

  // If creation fails, return error response with status code 500
  if (!newPost) {
    return ExpoResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 },
    );
  }

  // Return success response with the created post
  return ExpoResponse.json({
    success: true,
    post: newPost,
  });
}

// Handle GET requests to fetch all posts
export async function GET() {
  const showPosts = await getPosts();
  return ExpoResponse.json({ showPosts });
}
