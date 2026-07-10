import { NextResponse } from "next/server";

import { savePostService } from "@/server/services/SavePostService";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(
  request: Request,
  { params }: Params
) {
  try {
    const userId = "USER_ID";

    const result = await savePostService.save(
      userId,
      params.id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to save post" },
      { status: 500 }
    );
  }

}
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const userId = "USER_ID";

    const result = await savePostService.unsave(
      userId,
      params.id
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to unsave post" },
      { status: 500 }
    );
  }
}