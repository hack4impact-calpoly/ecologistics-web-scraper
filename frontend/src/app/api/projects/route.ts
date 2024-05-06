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
