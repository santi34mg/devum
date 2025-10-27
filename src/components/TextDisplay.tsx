import { cn } from "@/lib/utils";

interface TextDisplayProps {
  title?: string;
  content: string | string[];
  variant?: "default" | "highlight" | "minimal" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TextDisplay({
  title,
  content,
  variant = "default",
  size = "md",
  className,
}: TextDisplayProps) {
  const contentArray = Array.isArray(content) ? content : [content];

  const variantStyles = {
    default: "bg-card border border-border shadow-sm",
    highlight:
      "bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20",
    minimal: "bg-transparent",
    gradient:
      "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/20",
  };

  const sizeStyles = {
    sm: {
      container: "p-4 gap-2",
      title: "text-lg font-semibold",
      text: "text-sm",
    },
    md: {
      container: "p-6 gap-3",
      title: "text-xl font-semibold",
      text: "text-base",
    },
    lg: {
      container: "p-8 gap-4",
      title: "text-2xl font-bold",
      text: "text-lg",
    },
  };

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-300",
        variantStyles[variant],
        sizeStyles[size].container,
        "flex flex-col",
        className
      )}
    >
      {title && (
        <h2 className={cn("text-foreground mb-2", sizeStyles[size].title)}>
          {title}
        </h2>
      )}
      <div className="space-y-3">
        {contentArray.map((paragraph, index) => (
          <p
            key={index}
            className={cn(
              "text-muted-foreground leading-relaxed",
              sizeStyles[size].text
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
