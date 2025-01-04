import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        message: "Working",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
