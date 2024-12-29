import { TOKEN_KEY } from "@/config";
import { connectDB } from "@/config/db";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Success",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set(TOKEN_KEY, "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as any).message,
      },
      {
        status: 500,
      }
    );
  }
}
