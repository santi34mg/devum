import { Card, CardContent, CardHeader } from "../ui/card";
import { useNavigate } from "react-router-dom";
import type { Post as PostType } from "./types";

export default function Post(post: PostType) {
  // Normalize incoming post to UI shape

  const navigate = useNavigate();

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

  return (
    <Card
      className="w-full transition-transform duration-200 hover:scale-[1.02] hover:cursor-pointer"
      onClick={handlePostClick}
    >
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground">{post.post_title}</p>
            <p className="text-xs text-muted-foreground">{post.created_at}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm leading-relaxed">{post.post_caption}</p>
      </CardContent>
    </Card>
  );
}
