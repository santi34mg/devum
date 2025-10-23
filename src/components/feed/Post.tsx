import { Heart, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post as PostType } from "./types";
import { supabase } from "@/config/supabase";

export default function Post(post: PostType) {
  // Normalize incoming post to UI shape

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch like count from StudentLikesPost table
  useEffect(() => {
    const fetchLikeCount = async () => {
      const { count } = await supabase
        .from("StudentLikesPost")
        .select("*", { count: "exact", head: true })
        .eq("post_id", post.id);

      if (count !== null) {
        setLikeCount(count);
      }
    };

    fetchLikeCount();
  }, [post.id]);

  const handlePostClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest("button") || e.target.closest('[role="button"]'))
    ) {
      return;
    }
    navigate(`posts/${post.id}`);
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
            <p className="text-xs text-muted-foreground">{post.post_title}</p>
            <p className="text-xs text-muted-foreground">{post.created_at}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{post.post_caption}</p>
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
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
