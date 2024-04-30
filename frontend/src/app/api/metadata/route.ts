import connectDB from "@/database/db";
import ScraperMetadata from "@/database/metadataSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const metadata = await ScraperMetadata.findOne().orFail();
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json("Failed to fetch metadata");
  }
}
