import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface PlaceholderPageProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
}

export function PlaceholderPage({
  title = "Coming Soon!",
  description = "We're working hard to bring you this content. Please check back later!",
  icon = <Frown className="w-24 h-24 text-muted-foreground" />,
  showBackButton = true,
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4">
      <div className="mb-8">{icon}</div>
      <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        {description}
      </p>
      {showBackButton && (
        <Link href="/">
          <Button variant="outline">Go Back Home</Button>
        </Link>
      )}
    </div>
  );
}
