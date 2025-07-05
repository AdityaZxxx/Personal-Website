import { getAllShort } from "@/lib/sanity/queries";
import { ShortType } from "../../types/ShortType";
import { ShortList } from "./ShortList";

interface ShortListServerProps {
  category?: string;
  searchQuery?: string;
  tag?: string;
  allTags: string[];
}

export async function ShortListServer({
  category,
  searchQuery,
  tag,
  allTags,
}: ShortListServerProps) {
  const shorts: ShortType[] = await getAllShort(category, searchQuery, tag);
  return <ShortList shorts={shorts} allTags={allTags} activeTag={tag} />;
}
