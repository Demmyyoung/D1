// On-Demand Revalidation — receives Sanity webhook payloads
// Configure a webhook in Sanity Dashboard → API → Webhooks
// pointing to: https://your-domain.com/api/revalidate

import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate all relevant pages when content changes
    if (_type === "model") {
      revalidatePath("/");
      revalidatePath("/archive/[slug]", "layout");
    }

    if (_type === "post") {
      revalidatePath("/archive/[slug]", "page");
    }

    if (_type === "shoot") {
      revalidatePath("/archive/[slug]", "page");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { message: "Error revalidating", error: message },
      { status: 500 }
    );
  }
}
