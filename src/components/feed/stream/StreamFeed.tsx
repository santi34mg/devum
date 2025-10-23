import Post from "./StreamPost";
import type { Post as PostType } from "../types";

interface StreamFeedProps {
  posts: PostType[];
}

export function StreamFeed({ posts }: StreamFeedProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 py-6 px-4 ml-0 pl-0">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}
