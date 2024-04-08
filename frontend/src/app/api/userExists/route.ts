import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    // sending email in POST request
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
