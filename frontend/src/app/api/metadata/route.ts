import connectDB from "@/database/db";
import scraperMetadata from "@/database/metadataSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();
  try {
    const metadata = await scraperMetadata.findOne().orFail();
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json("Failed to fetch run date", { status: 404 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const metadata = await scraperMetadata.findOneAndUpdate(
      {},
      { date_run: new Date() },
      { upsert: true, new: true }, // Return the updated document
    );
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json("Failed to update metadata.", { status: 500 });
  }
}
