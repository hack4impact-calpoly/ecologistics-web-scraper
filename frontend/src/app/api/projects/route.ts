import connectDB from "@/database/db";
import Proposal from "@/database/projectSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // check if query params are passed
  const url = new URL(req.url);
  const county_file_number = url.searchParams.get("county_file_number");

  try {
    await connectDB();
    // TODO: get project by countyFileNumber
    if (county_file_number) {
      console.log(county_file_number);
    }

    // get all projects
    const projects = await Proposal.find({});
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json("Error retrieving projects.", { status: 404 });
  }
}

export async function PUT(req: Request) {
  const { county_file_number, review_status } = await req.json();

  try {
    await connectDB();
    const possibleStatus = ["Reviewed", "In Review", "Unreviewed"];
    const fieldMissing = !county_file_number || !review_status;
    const statusPossible = possibleStatus.includes(review_status);

    if (fieldMissing || !statusPossible) {
      return NextResponse.json("Missing/bad field in request", { status: 400 });
    }

    const updatedDoc = await Proposal.findOneAndUpdate(
      { county_file_number: county_file_number },
      { review_status: review_status },
      { new: true },
    );

    if (!updatedDoc) {
      return NextResponse.json("Document not found", { status: 404 });
    } else {
      return NextResponse.json("Update review status success", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(`Error`, { status: 500 });
  }
}
