import { NextRequest, NextResponse } from "next/server";
import { savedPostsService } from "@/server/services/SavedPostsService";
import { getCurrentUser } from "@/server/auth/auth"; // adjust path if needed

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate user using your async auth function
    const user = await getCurrentUser();

    // Authorization: only students can view their saved list
    if (!user || user.role !== "student") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Parse pagination params
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(50, Number(url.searchParams.get("limit")) || 10));

    // 3. Fetch saved posts for this user
    const result = await savedPostsService.getSavedPosts(
      user.id,
      page,
      limit
    );

    // 4. Build pagination metadata
    const totalPages = Math.ceil(result.totalItems / limit);

    return NextResponse.json({
      data: result.posts,
      pagination: {
        page,
        limit,
        totalItems: result.totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch saved posts" },
      { status: 500 }
    );
  }
}