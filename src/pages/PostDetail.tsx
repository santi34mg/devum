import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/components/feed/types";

// Temporary mock data - should be moved to a proper data store or API
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

export default function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      setIsLoading(true);
      try {
        const foundPost = mockPosts.find((p) => p.id === Number(postId));
        if (foundPost) {
          setPost(foundPost);
          setLikes(foundPost.likes);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error loading post:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId, navigate]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Post</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl py-6">
        <Card className="border-none shadow-none">
          {/* Author Info */}
          <CardHeader className="pb-3">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{post.author.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {post.author.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.timestamp}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Post Content */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{post.content}</p>
              {post.image && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>

            <Separator />

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-6">
                <span>{likes} likes</span>
                <span>0 comments</span>
              </div>
              <span>0 shares</span>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isLiked ? "text-red-500" : ""}
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={isSaved ? "text-blue-500" : ""}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark
                  className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            <Separator />

            {/* Comments Section Placeholder */}
            <div className="py-4">
              <p className="text-center text-muted-foreground">
                No comments yet
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
