import { NextResponse } from "next/server";

import { savePostService } from "@/server/services/SavePostService";
import { getCurrentUser } from "@/server/auth/auth";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  { params }: Params
) {
  try {
    // Get logged-in user (temporary fake auth)
    const user = await getCurrentUser();

    const { id } = await params;

    const result = await savePostService.save(
      user.id,
      id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST Save Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to save post",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    // Get logged-in user (temporary fake auth)
    const user = await getCurrentUser();

    const { id } = await params;

    const result = await savePostService.unsave(
      user.id,
      id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("DELETE Save Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to unsave post",
      },
      { status: 500 }
    );
  }
}