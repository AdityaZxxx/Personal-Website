import { getGalleryItemBySlug } from "@/lib/sanity/queries";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ slug: string }>;
  request: Request;
}
export async function GET({ params, request }: Props) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is missing" },
        { status: 400 }
      );
    }

    const item = await getGalleryItemBySlug(slug);

    if (!item) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(`Failed to fetch gallery item:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
