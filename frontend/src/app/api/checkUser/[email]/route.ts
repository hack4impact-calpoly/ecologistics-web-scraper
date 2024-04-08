import connectDB from "@/database/db";
import User from "@/database/userSchema";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    email: string;
  };
};

export async function GET(req: Request, { params }: IParams) {
  await connectDB();
  const { email } = params;
  try {
    const user = await User.findOne({ email }).orFail();
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("Error retrieving user.", { status: 404 });
  }
}
