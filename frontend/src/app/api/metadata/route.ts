import connectDB from "@/database/db";
import ScraperMetadata from "@/database/metadataSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // DUMMY CODE — meant to handle dynamic rendering
  const url = new URL(req.url);
  const dummy = url.searchParams.get("dummy");

  try {
    await connectDB();

    if (dummy) {
      console.log(dummy);
    }

    const metadata = await ScraperMetadata.findOne().orFail();
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json("Failed to fetch metadata", { status: 404 });
  }
}
