import { ExpoResponse } from 'expo-router/server';
import { getPosts } from '../../database/posts';

export async function GET() {
  const showPosts = await getPosts();
  return ExpoResponse.json({ showPosts });
}
