import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift, LucidePopcorn } from "lucide-react";
import Link from "next/link";

interface TrakteerSupportProps {
  username: string;
  text?: string;
  className?: string;
}

export function TrakteerSupport({
  username,
  text = "If you enjoy my content, Trakteer me so we can get closer!",
  className,
}: TrakteerSupportProps) {
  return (
    <Card
      className={`overflow-hidden border-purple-100 dark:border-purple-700 rounded-md ${className}`}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center text-lg gap-2">
          <Gift className="h-5 w-5 animate-bounce" />
          Support My Work
        </CardTitle>
        <CardDescription className="text-white/90">{text}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full w-20 h-20">
            <LucidePopcorn size={24} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`https://trakteer.id/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Trakteer Me
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
