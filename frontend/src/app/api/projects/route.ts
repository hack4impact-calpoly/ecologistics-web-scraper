import connectDB from "@/database/db";
import Project from "@/database/projectSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // check if query params are passed
  const url = new URL(req.url);
  const countyFileNumber = url.searchParams.get("countyFileNumber");

  try {
    await connectDB();
    // TODO: get project by countyFileNumber
    if (countyFileNumber) {
      console.log(countyFileNumber);
    }

    // get all projects
    const projects = await Project.find({});
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json("Error retrieving projects.", { status: 404 });
  }
}

export async function PUT(req: Request) {
  const { countyFileNumber, reviewStatus, additionalNotes } = await req.json();

  try {
    await connectDB();

    const possibleStatus = ["Reviewed", "In Review", "Unreviewed"];
    const fieldMising = !countyFileNumber || !reviewStatus;
    const statusPossible = possibleStatus.includes(reviewStatus);

    if ((fieldMising || !statusPossible) && !additionalNotes) {
      return NextResponse.json("Missing or bad field in request");
    }

    if (reviewStatus) {
      await Project.findOneAndUpdate(
        { county_file_number: countyFileNumber },
        { review_status: reviewStatus },
      );
      return NextResponse.json("Update review status success", { status: 200 });
    } else if (additionalNotes) {
      await Project.findOneAndUpdate(
        { county_file_number: countyFileNumber },
        { $set: { additional_notes: additionalNotes } },
        (err: any) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
          }
        },
      );
      return NextResponse.json("Update additional notes success", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Error updating review status", { status: 500 });
  }
}
