import { PopoverContent } from "@/components/ui/popover";
import { allNavItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { PopoverIconLink, PopoverImageLink } from "./PopoverLinks";

interface MorePopoverProps {
  isPopoverOpen: boolean;
  pathname: string;
}

export default function MorePopover({
  isPopoverOpen,
  pathname,
}: MorePopoverProps) {
  const moreImageLinks = allNavItems.filter((item) => item.type === "image");
  const moreIconLinks = allNavItems.filter((item) => item.type === "icon");

  return (
    <PopoverContent
      align="center"
      sideOffset={18}
      className={cn(
        "w-[680px] p-2 md:grid grid-cols-2 gap-3 bg-background/85 backdrop-blur-sm border-neutral-800 shadow-2xl hidden ",
        isPopoverOpen ? "block" : "hidden"
      )}
    >
      <div className="grid grid-cols-1 gap-3">
        {moreImageLinks.map((link) => (
          <PopoverImageLink
            key={link.href}
            href={link.href}
            title={link.title}
            description={link.description}
            imageSrc={link.imageSrc!}
            isActive={pathname.startsWith(link.href)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {moreIconLinks.map((link) => (
          <PopoverIconLink
            key={link.href}
            href={link.href}
            title={link.title}
            description={link.description}
            icon={link.icon!}
            isActive={pathname.startsWith(link.href)}
          />
        ))}
      </div>
    </PopoverContent>
  );
}
