import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "../ui/button";
import { StreamFeed } from "./stream/StreamFeed";
import { GalleryFeed } from "./gallery/GalleryFeed";
import type { Post, FeedVariant } from "./types";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      title: "Software Engineer at Google",
    },
    content:
      "Excited to announce that we're hiring interns for Summer 2024! Looking for talented students passionate about machine learning and cloud computing. DM me if interested! 🚀",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    likes: 142,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: {
      name: "Michael Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      title: "Recruiting Manager at Microsoft",
    },
    content:
      "Just wrapped up an amazing career fair at UMich! Met so many brilliant students. Remember: your passion and willingness to learn matter more than having every skill on the job description. Keep applying! 💪",
    likes: 89,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: {
      name: "Emily Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      title: "Product Designer at Airbnb",
    },
    content:
      "Design tip for students building portfolios: Show your process, not just the final product. Recruiters want to see how you think and solve problems. Include sketches, iterations, and the reasoning behind your decisions.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    likes: 203,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      title: "Startup Founder",
    },
    content:
      "Our early-stage startup is looking for a founding engineer intern! You'll work directly with the founding team, ship features to production, and get real equity. Perfect opportunity for someone who wants to experience startup life. 🚀",
    likes: 67,
    timestamp: "2 days ago",
  },
];

interface FeedProps {
  variant?: FeedVariant;
  posts?: Post[];
  allowLayoutSwitch?: boolean;
}

export function Feed({
  variant: initialVariant = "stream",
  posts = mockPosts,
  allowLayoutSwitch = true,
}: FeedProps) {
  const [variant, setVariant] = useState<FeedVariant>(initialVariant);

  return (
    <div className="w-full">
      {allowLayoutSwitch && (
        <div className="flex justify-end gap-2 mb-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVariant("stream")}
            className={variant === "stream" ? "bg-accent" : ""}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVariant("gallery")}
            className={variant === "gallery" ? "bg-accent" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      )}

      {variant === "stream" ? (
        <StreamFeed posts={posts} />
      ) : (
        <GalleryFeed posts={posts} />
      )}
    </div>
  );
}
