import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const iconUrl = new URL("/icon", request.url);
  return NextResponse.redirect(iconUrl, 307);
}
