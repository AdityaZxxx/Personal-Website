import { writeClient } from "@/lib/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const newSubscriber = await writeClient.create({
      _type: "subscriber",
      email: email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Subscription successful!",
      subscriber: newSubscriber,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      (error as { statusCode: number }).statusCode === 409
    ) {
      return NextResponse.json(
        { message: "This email is already subscribed." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
