import PostCard from "./Post";
import type { Post } from "./types";

interface FeedProps {
  posts?: Post[];
}

const mockPosts: FeedProps = {
  posts: [
    {
      id: 1,
      post_title: "First Post",
      project_id: 1,
      post_caption: "This is the caption of the first post.",
      created_at: "2024-01-01T12:00:00Z",
    },
    {
      id: 2,
      post_title: "Second Post",
      project_id: 1,
      post_caption: "This is the caption of the second post.",
      created_at: "2024-01-02T15:30:00Z",
    },
    {
      id: 3,
      post_title: "Third Post",
      project_id: 2,
      post_caption: "This is the caption of the third post.",
      created_at: "2024-01-03T09:45:00Z",
    },
  ],
};

export function Feed({ posts = mockPosts.posts }: FeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4 py-6 px-4 ml-0 pl-0">
        <p className="text-center text-muted-foreground">No posts available.</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 py-6 px-4 ml-0 pl-0">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
