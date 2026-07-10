import { NextResponse } from "next/server";

import { savedPostsService } from "@/server/services/SavedPostsService";

export async function GET() {
  try {
    const userId = "USER_ID";

    const posts =
      await savedPostsService.getSavedPosts(userId);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch saved posts" },
      { status: 500 }
    );
  }
}