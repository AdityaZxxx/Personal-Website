import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { ShortType } from "../../types/ShortType";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

const ShortCard = ({
  short,
  onMouseEnter,
  onMouseLeave,
  isDimmed,
}: {
  short: ShortType;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  isDimmed: boolean;
}) => {
  return (
    <div
      className={`w-full h-[280px] transition-all duration-300 ${isDimmed ? "opacity-50" : "opacity-100"}`}
      onMouseEnter={() => onMouseEnter(short._id)}
      onMouseLeave={onMouseLeave}
    >
      <Card className="bg-background h-full w-full flex flex-col group hover:shadow-lg  group-hover:-translate-y-1 group-hover:rotate-1 transition-transform border">
        <CardContent className="flex-1 p-4 flex flex-col">
          <Link
            href={`/shorts/${short.slug}`}
            className="font-semibold text-lg text-primary group group-hover:underline group-hover:underline-offset-2 transition-colors duration-200 mb-2 line-clamp-3"
          >
            {short.title}
          </Link>

          <div className="flex-1 flex flex-col justify-end">
            {typeof short.viewCount === "number" && (
              <div
                className="flex items-center gap-1.5 text-xs mt-auto"
                title={`${new Intl.NumberFormat("id-ID").format(short.viewCount)} views`}
              >
                <EyeIcon className="h-4 w-4 text-sky-400" />
                <span className="text-muted-foreground">
                  {new Intl.NumberFormat("id-ID").format(short.viewCount)} views
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <Separator className="bg-border/50" />

        <CardFooter className="p-4">
          {short.tags && short.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 max-h-[60px] overflow-y-auto">
              {short.tags.map((tag: string) => (
                <Badge
                  className="text-xs text-muted-foreground hover:bg-secondary/80 transition-colors"
                  key={tag}
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="h-[24px]"></div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShortCard;
