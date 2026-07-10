import { NextResponse } from "next/server";

import { feedService } from "@/server/services/FeedService";

export async function GET() {
  try {
    /**
     * Stub authentication.
     * Replace later with NextAuth/Clerk.
     */
    const userId = "USER_ID";

    const posts = await feedService.getFeed(userId);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}