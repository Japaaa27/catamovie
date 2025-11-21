import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const partial = index < rating && index >= Math.floor(rating);
        const partialPercentage = partial ? (rating - Math.floor(rating)) * 100 : 0;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={cn(
              "relative transition-transform",
              interactive && "hover:scale-110 cursor-pointer hover-elevate active-elevate-2",
              !interactive && "cursor-default",
            )}
            data-testid={`star-${index + 1}`}
          >
            {partial ? (
              <div className="relative">
                <Star className={cn(sizeClasses[size], "text-muted-foreground/30")} />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${partialPercentage}%` }}
                >
                  <Star className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
                </div>
              </div>
            ) : (
              <Star
                className={cn(
                  sizeClasses[size],
                  filled
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30",
                )}
              />
            )}
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
