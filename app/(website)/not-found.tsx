import { PlaceholderPage } from "@/components/common/PlaceholderPage";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <PlaceholderPage
        title="404 - Page Not Found"
        description="Lost in thought? So am I. Let’s get you back to something real."
        icon={<Frown className="w-24 h-24 text-red-500" />}
        showBackButton={true}
      />
    </div>
  );
}
