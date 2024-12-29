import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY } from "@/config";
import { connectDB } from "@/config/db";
import { getDataFromToken } from "@/lib/api/getDataFromToken";
import User from "@/models/user.model";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_KEY)?.value || false;
    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          status: false,
        },
        {
          status: 403,
        }
      );
    }
    const id = getDataFromToken(token);

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          status: false,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        data: user,
        success: true,
      },
      {
        status: 403,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error as any,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
