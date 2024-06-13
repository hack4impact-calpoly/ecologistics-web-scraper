import connectDB from "@/database/db";
import Project from "@/database/projectSchema";
import { NextResponse } from "next/server";
import { getProjectModel } from "@/database/projectSchema";

export async function GET(req: Request) {
  // check if query params are passed
  const url = new URL(req.url);
  const county_file_number = url.searchParams.get("county_file_number");

  try {
    await connectDB();
    // TODO: get county from query params and use getProjectModel to get the correct model
    // const Project = getProjectModel(county);
    if (county_file_number) {
      console.log(county_file_number);
    }

    // get all projects
    const projects = await Project.find({});
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

    const updatedDoc = await Project.findOneAndUpdate(
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

export async function PATCH(req: Request) {
  const { county_file_number, additional_notes } = await req.json();
  console.log("PATCH request received:", {
    county_file_number,
    additional_notes,
  });
  try {
    await connectDB();

    if (!county_file_number || !additional_notes) {
      return NextResponse.json("Missing field in request", { status: 400 });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { county_file_number: county_file_number },
      { additional_notes: additional_notes },
      { new: true },
    );

    return NextResponse.json(
      { message: "Update additional notes success", updatedProject },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json("Error updating additional notes", {
      status: 500,
    });
  }
}
