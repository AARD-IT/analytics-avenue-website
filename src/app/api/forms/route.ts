import { NextResponse } from "next/server";

function getGoogleScriptUrl(): string {
  const url =
    process.env.GOOGLE_SCRIPT_URL ?? process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url) {
    throw new Error("Google Script URL is not configured.");
  }
  return url;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const upstreamResponse = await fetch(getGoogleScriptUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: "Upstream Google Script request failed." },
        { status: upstreamResponse.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit form." },
      { status: 500 },
    );
  }
}
