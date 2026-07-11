import { NextResponse } from "next/server";

import { feedService } from "@/server/services/FeedService";
import { getCurrentUser } from "@/server/auth/auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);

    const limit = Number(searchParams.get("limit") ?? 10);

    const posts = await feedService.getFeed(
      user.id,
      page,
      limit
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}