import { useNavigate } from "react-router-dom";
import { Card } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import type { Post } from "../types";

interface GalleryPostProps extends Post {}

export default function GalleryPost({
  id,
  author,
  content,
  image,
  likes,
}: GalleryPostProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="group relative overflow-hidden aspect-square cursor-pointer transition-transform hover:scale-[1.02] p-2"
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={content}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center p-6">
            <p className="text-sm line-clamp-4 text-center">{content}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">{author.name}</span>
            </div>
            <p className="text-sm line-clamp-2">{content}</p>
            <div className="mt-2 text-sm opacity-75">❤️ {likes}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
