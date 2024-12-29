import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token: verifyToken } = reqBody;

    if (!verifyToken) {
      return NextResponse.json(
        {
          error: "Token is Required",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    console.log("token", verifyToken);
    const user = await User.findOne({
      verifyToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return NextResponse.json(
        {
          error: "Invalid or expired token",
          success: false,
        },
        {
          status: 404,
        }
      );

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
