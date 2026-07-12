import { NextResponse } from "next/server";
import { feedService } from "@/server/services/FeedService";
import { getCurrentUser } from "@/server/auth/auth";

export async function GET(request: Request) {
  try {
    // 1. Get authenticated user
    const user = await getCurrentUser();

    // 2. Read query parameters
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const limit = Math.max(Number(searchParams.get("limit") ?? 10), 1);

    // 3. Get paginated feed
    const posts = await feedService.getFeed(user.id, page, limit);

    // 4. Return response
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/posts:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch posts" },
      { status: 500 }
    );
  }
}