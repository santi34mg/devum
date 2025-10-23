import GalleryPost from "./GalleryPost";
import type { Post } from "../types";

interface GalleryFeedProps {
  posts: Post[];
}

export function GalleryFeed({ posts }: GalleryFeedProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {posts.map((post) => (
        <GalleryPost key={post.id} {...post} />
      ))}
    </div>
  );
}
