import { NextRequest, NextResponse } from "next/server";
import { savedPostsService } from "@/server/services/SavedPostsService";
import { getCurrentUser } from "@/server/auth/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // 👈 type as Promise
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;   // 👈 await the Promise
    console.log("User ID:", user.id);
    console.log("Post ID:", postId);

    const saved = await savedPostsService.savePost(user.id, postId);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error("POST /api/posts/[id]/save:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to save post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;   // 👈 await here too
    const result = await savedPostsService.unsavePost(user.id, postId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("DELETE /api/posts/[id]/save:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to unsave post" },
      { status: 500 }
    );
  }
}