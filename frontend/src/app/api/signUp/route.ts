import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();
    await User.create({ email, password });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering." },
      { status: 500 },
    );
  }
}
