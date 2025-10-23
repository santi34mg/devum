export interface Author {
  name: string;
  avatar: string;
  title: string;
}

export interface Post {
  id: number;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  timestamp: string;
}

export type FeedVariant = "stream" | "gallery";
