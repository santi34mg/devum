import { Heart, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostProps {
  id: number;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  content: string;
  image?: string;
  likes: number;
  timestamp: string;
}

export default function Post({
  id,
  author,
  content,
  image,
  likes,
  timestamp,
}: PostProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handlePostClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest('[role="button"]'))
    ) {
      return;
    }
    navigate(`/posts/${id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  return (
    <Card
      className="w-full transition-transform duration-200 hover:scale-[1.02] hover:cursor-pointer"
      onClick={handlePostClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.title}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{content}</p>
        {image && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            className={`gap-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            className={isSaved ? "text-blue-500" : ""}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
