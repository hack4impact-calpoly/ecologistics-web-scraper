import connectDB from "@/database/db";
import scraperMetadata from "@/database/metadataSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  try {
    const metadata = await scraperMetadata.findOne().orFail();
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json("Failed to fetch metadata");
  }
}
