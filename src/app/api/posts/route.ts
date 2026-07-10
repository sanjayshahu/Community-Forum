import { NextResponse } from "next/server";

import { feedService } from "@/server/services/FeedService";

export async function GET() {
  try {
    const posts = await feedService.getAllPosts();

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}