import { Button } from "@/components/ui/button";

export default function ShareButtonsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 w-48 bg-muted-foreground rounded"></div>
      <div className="flex flex-wrap gap-2">
        {/* Simulate share buttons */}
        {[...Array(5)].map((_, i) => (
          <Button
            key={i}
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-muted-foreground rounded-md"
          ></Button>
        ))}
        {/* Simulate copy link button */}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 bg-muted-foreground rounded-md"
        ></Button>
      </div>
    </div>
  );
}
